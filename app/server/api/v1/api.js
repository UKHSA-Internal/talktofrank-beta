import { config } from 'config'
import axios from 'axios'
import { format } from 'date-fns'
import {
  imageMap,
  removeMarkdown,
  removeTags,
  haversineDistance,
  nl2br
} from '../../../shared/utilities'

/**
 * Express routes
 */
import searchRoutes from './apisearch.js'
import { contentFulFactory } from '../../../shared/contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
const express = require('express')
const yaml = require('js-yaml')
const fs = require('fs')
const marked = require('marked')
const router = express.Router()
const sortBy = require('lodash.sortby')
const groupBy = require('lodash.groupby')
const truncate = require('lodash.truncate')
const Sentry = require('@sentry/node')
const resolveResponse = require('contentful-resolve-response')
const customResolveResponse = require('../../../shared/contentFulCustomResolve.jsx')
const contentful = require('contentful')

const contentfulClientConf = {
  space: config.contentful.contentSpace,
  accessToken: config.contentful.contentAccessToken,
  host: config.contentful.contentHost
}

if (config.contentful.environment && config.contentful.environment !== 'master') {
  console.log(`Using contentful environment: ${config.contentful.environment}`)
  contentfulClientConf.environment = config.contentful.environment
} else {
  console.log(`Using contentful environment: master`)
}
const contentfulClient = contentful.createClient(contentfulClientConf)

/**
 * Axios global config
 */
axios.defaults.headers.common['Authorization'] = `Bearer ${config.contentful.contentAccessToken}`

/**
 * Get page data
 */
router.use('/search', searchRoutes)

router.get('/entries/:slug', (req, res, next) => {
  if (!req.params.slug) {
    let error = new Error()
    error.message = 'Page id not set'
    error.status = 404
    return next(error)
  }

  if (req.params.slug === 'no-match') {
    try {
      return res.send(yaml.safeLoad(fs.readFileSync('./static/' + req.params.slug + '.yml', 'utf8')))
    } catch (error) {
      next(error)
    }
  }

  const slug = decodeURIComponent(req.params.slug)

  // If the slug value exists in the config contentful 'entries' list use that
  // to fetch a single content item, fallback to slug value
  if (config.contentful.entries[slug]) {
    contentfulClient.getEntries({
      'sys.id': config.contentful.entries[slug],
      include: 10
    })
      .then((contentfulResponse) => {
        if (contentfulResponse.total === 0) {
          let error = new Error()
          error.message = `'${slug}': Page not found`
          error.status = 404
          return next(error)
        }
        // merge contentful assets and includes
        let response = resolveResponse(contentfulResponse)[0]
        dateFormat(response)

        if (response.fields.featuredNewsItem) {
          dateFormat(response.fields.featuredNewsItem)
        }

        if (response.fields.featuredContentItems) {
          response.fields.featuredContentItems
            .filter(item => item.fields)
            .map(item => {
              return dateFormat(item)
            })
        }

        if (response.fields.featuredContentBlock && response.fields.featuredContentBlock.fields.featuredContentItems) {
          response.fields.featuredContentBlock.fields.featuredContentItems
            .filter(item => item.fields)
            .map(item => {
              return dateFormat(item)
            })
        }

        if (response.fields.callout) {
          if (response.fields.callout.fields.content) {
            response.fields.callout.fields.content = marked(response.fields.callout.fields.content)
          }
        }

        if (response.fields.intro) {
          response.fields.intro = marked(response.fields.intro)
        }

        if (response.fields.body) {
          response.fields.body = documentToHtmlString(response.fields.body, contentFulFactory())
        }

        if (response.fields.contentExtra) {
          response.fields.contentExtra
            .filter(item => item.fields)
            .map((fieldName, i) => {
              fieldName.fields.content = marked(fieldName.fields.content)
              return fieldName
            })
        }

        // Set meta info
        response.head = {
          title: getPageTitle(response.fields, 'title'),
          description: getMetaDescription(response.fields, 'body')
        }

        res.send(response)
      })
      .catch(error => next(error.response))
  } else {
    const contentfulRequest = {
      content_type: config.contentful.contentTypes.page,
      'fields.slug': slug.toLowerCase()
    }
    try {
      contentfulClient.getEntries(contentfulRequest)
        .then((contentfulResponse) => {
          if (contentfulResponse.total === 0) {
            let error = new Error()
            error.message = `'${slug.toLowerCase()}': Page not found`
            error.status = 404
            return next(error)
          }

          // merge contentful assets and includes
          let response = customResolveResponse.resolveResponse(contentfulResponse, {parentSysId: contentfulResponse.items[0].sys.id})[0]
          dateFormat(response)

          if (response.fields.callout) {
            if (response.fields.callout.fields.content) {
              response.fields.callout.fields.content = marked(response.fields.callout.fields.content)
            }
          }

          if (response.fields.intro) {
            response.fields.intro = marked(response.fields.intro)
          }

          if (response.fields.body) {
            response.fields.body = documentToHtmlString(response.fields.body, contentFulFactory())
          }

          if (response.fields.contentExtra) {
            response.fields.contentExtra
              .filter(item => item.fields)
              .map((fieldName, i) => {
                fieldName.fields.content = marked(fieldName.fields.content)
                return fieldName
              })
          }

          // Set meta info
          response.head = {
            title: getPageTitle(response.fields, 'title'),
            description: getMetaDescription(response.fields, 'body')
          }

          res.send(response)
        })
        .catch(error => next(error))
    } catch (error) {
      next(error)
    }
  }
})

router.get('/drugs/:slug', (req, res, next) => {
  if (!req.params.slug) {
    let error = new Error()
    error.message = 'Page id not set'
    error.status = 404
    return next(error)
  }

  const slug = decodeURIComponent(req.params.slug.toLowerCase())
  const contentfulRequest = {
    content_type: config.contentful.contentTypes.drug,
    'fields.slug': slug
  }

  contentfulClient.getEntries(contentfulRequest)
    .then((contentfulResponse) => {
      if (contentfulResponse.total === 0) {
        let error = new Error()
        error.message = `'${slug}': Page not found`
        error.status = 404
        return next(error)
      }

      let response = resolveResponse(contentfulResponse)[0]

      // Add contentful field ids here to transform the contents
      // from markdown to HTML
      const markDownFields = {
        'description': [],
        'qualitiesAppearance': [],
        'qualitiesTaste': [],
        'qualitiesAdministered': [],
        'effectsFeeling': [],
        'effectsBehaviour': [],
        'durationDefault': [
          'text'
        ],
        'durationDetail': [],
        'durationDetectableDefault': [
          'text'
        ],
        'durationDetectable': [],
        'durationMethodOfTaking': [
          'methodAfterEffects',
          'methodEffectsDuration',
          'methodEffectsStart'
        ],
        'risksPhysicalHealth': [],
        'risksHealthMental': [],
        'risksCutWith': [],
        'mixingDangers': [],
        'lawCaught': [
          'text'
        ],
        'lawDetail': [],
        'lawClass': [
          'description',
          'possesion',
          'supplying',
          'dealersSupplying',
          'driving'
        ],
        'addiction': [],
        'additional': []
      }

      Object.keys(response.fields)
        .filter(fieldName => markDownFields.hasOwnProperty(fieldName))
        .map(fieldName => {
          if (markDownFields[fieldName].length > 0) {
            if (Array.isArray(response.fields[fieldName])) {
              for (let i = 0; i <= response.fields[fieldName].length - 1; i++) {
                return contentfulFieldToMarkdown(markDownFields, fieldName, response.fields[fieldName][i].fields)
              }
            } else if (response.fields[fieldName].fields) {
              return contentfulFieldToMarkdown(markDownFields, fieldName, response.fields[fieldName].fields)
            }
          } else {
            response.fields[fieldName] = marked(response.fields[fieldName])
          }
        })

      // Set meta info
      response.head = {
        title: getPageTitle(response.fields, 'drugName'),
        description: getMetaDescription(response.fields, 'description')
      }

      res.send(response)
    })
    .catch(error => next(error.response))
})

/**
 * Get drugs list data (A-Z)
 */
router.get('/drugs', (req, res, next) => {
  const contentfulRequest = {
    content_type: config.contentful.contentTypes.drug
  }

  let response = {
    list: []
  }

  contentfulClient.getEntries(contentfulRequest)
    .then((contentfulResponse) => {
      if (contentfulResponse.total === 0) {
        let error = new Error()
        error.message = `'drugs-a-z': Page not found`
        error.status = 404
        return next(error)
      }

      contentfulResponse.items
        .filter(item => item.fields.synonyms && item.fields.drugName)
        .map((item) => {
          response.list.push({
            name: item.fields.drugName,
            slug: item.fields.slug,
            synonyms: item.fields.synonyms,
            description: marked(item.fields.description)
          })

          item.fields.synonyms
            .map(synonym => {
              response.list.push({
                name: synonym.trim(),
                slug: item.fields.slug,
                parent: item.fields.drugName
              })
            })
        })

      let grouped = groupBy(response.list, val => {
        return val.name.toUpperCase().charAt(0)
      })

      let groupedArray = []
      for (var i in grouped) {
        let sortedValues = sortBy(grouped[i], (item) => {
          return item.name.toLowerCase()
        })
        groupedArray.push({
          group: i,
          values: sortedValues
        })
      }

      let numbers = []
      response.list = sortBy(groupedArray, (item) => (item.group))
        .filter(v => {
          if (!isNaN(parseFloat(v.group))) {
            numbers.push(v)
            return false
          }
          return isNaN(parseFloat(v.group)) && v.group !== ''
        })

      response.list = response.list.concat(numbers)
      res.send(response)
    })
    .catch(error => next(error.response))
})

/**
 * Get news
 */
router.get('/news', (req, res, next) => {
  if (!req.query.page || !req.query.pageSize) {
    let error = new Error()
    error.message = 'No pagination options provided'
    error.status = 500
    return next(error)
  }

  const contentfulRequest = {
    content_type: config.contentful.contentTypes.news,
    order: '-fields.originalPublishDate,-sys.createdAt',
    limit: req.query.pageSize,
    skip: req.query.pageSize * req.query.page
  }

  let response = {
    list: []
  }

  contentfulClient.getEntries(contentfulRequest)
    .then((contentfulResponse) => {
      let imageCount = 1
      if (contentfulResponse.total === 0) {
        let error = new Error()
        error.message = `'news': Page not found`
        error.status = 404
        return next(error)
      }
      // merge contentful assets and includes
      response.total = contentfulResponse.total
      response.list = resolveResponse(contentfulResponse)
      response.list = response.list.map(v => {
        if (v.fields.originalPublishDate) {
          v['date'] = v.fields.originalPublishDate
          v['dateFormatted'] = format(Date.parse(v.fields.originalPublishDate), 'Do MMM YYYY')
        } else {
          v['date'] = v.sys.createdAt
          v['dateFormatted'] = format(Date.parse(v.sys.createdAt), 'Do MMM YYYY')
        }

        if (!v.fields.summary) {
          if (v.fields.body) {
            v.fields.summary = truncate(removeTags(documentToHtmlString(v.fields.body, contentFulFactory())), {
              'length': 120
            })
          } else if (v.fields.bodyLegacy) {
            v.fields.summary = truncate(removeMarkdown(v.fields.bodyLegacy), {
              'length': 120
            })
          }
        }

        if (v.fields.image) {
          v.fields.image = imageMap(v.fields.image)
          imageCount++
          v.fields['imagepos'] = imageCount
        }

        return v
      })
      response.title = 'News'

      res.send(response)
    })
    .catch(error => next(error.response))
})

router.get('/news/:slug', (req, res, next) => {
  if (!req.params.slug) {
    let error = new Error()
    error.message = 'Page id not set'
    error.status = 404
    return next(error)
  }

  const slug = decodeURIComponent(req.params.slug.toLowerCase())
  const contentfulRequest = {
    content_type: config.contentful.contentTypes.news,
    'fields.slug': slug
  }

  contentfulClient.getEntries(contentfulRequest)
    .then((contentfulResponse) => {
      if (contentfulResponse.total === 0) {
        let error = new Error()
        error.message = `'${slug}': Page not found`
        error.status = 404
        return next(error)
      }
      // merge contentful assets and includes
      let response = resolveResponse(contentfulResponse)[0]

      dateFormat(response)

      if (!response.fields.summary) {
        if (response.fields.body) {
          response.fields.summary = truncate(removeTags(documentToHtmlString(response.fields.body, contentFulFactory())), {
            'length': 120
          })
        } else if (response.fields.bodyLegacy) {
          response.fields.summary = truncate(removeMarkdown(response.fields.bodyLegacy), {
            'length': 120
          })
        }
      }

      if (response.fields.image) {
        response.fields.image = imageMap(response.fields.image)
      }

      if (response.fields.slug) {
        delete response.fields.slug
      }

      response.fields['type'] = 'h1'
      // Set meta info
      response.head = {
        title: getPageTitle(response.fields, 'title'),
        description: getMetaDescription(response.fields, 'summary')
      }

      res.send(response)
    })
    .catch(error => next(error.response))
})

/**
 * treatment centres
 */

const treatmentCentresMarkedFields = [
  'serviceInfo',
  'timesSessions',
  'catchmentArea',
  'referralMethod',
  'notes'
]

router.get('/treatment-centres', async (req, res, next) => {
  if (!req.query.page ||
    !req.query.pageSize ||
    !req.query.location) {
    let error = new Error()
    error.message = 'No pagination options or geopoint provided'
    error.status = 500
    return next(error)
  }

  const locationValue = removeTags(req.query.location)

  let response = {
    location: locationValue,
    serviceType: req.query.serviceType ? req.query.serviceType : '',
    results: [],
    total: 0
  }

  const geocodeLocation = await axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=` +
    `${encodeURIComponent(response.location)},united%20kingdom&key=${config.googleAPI.places}`)

  if ((geocodeLocation.data !== 'OK' || geocodeLocation.data !== 'ZERO_RESULTS') &&
    geocodeLocation.data.error_message) {
    let error = new Error()
    error.message = geocodeLocation.data.error_message
    error.status = 500
    return next(error)
  }

  if (!geocodeLocation.data ||
    geocodeLocation.data.results.length < 1 ||
    geocodeLocation.data.results[0].address_components.length < 2
  ) {
    // Set meta info
    response.head = {
      title: `No results found`
    }

    return res.send(response)
  }

  const location = geocodeLocation.data.results[0].geometry.location

  const contentfulRequest = {
    content_type: config.contentful.contentTypes.treatmentCentre,
    limit: req.query.pageSize,
    skip: req.query.pageSize * req.query.page,
    'fields.location[near]': `${location.lat},${location.lng}`,
    'fields.addressStatus': true
  }

  if (req.query.serviceType &&
    req.query.serviceType !== 'All Services' &&
    req.query.serviceType !== '') {
    contentfulRequest['fields.serviceType'] = req.query.serviceType
  }

  contentfulClient.getEntries(contentfulRequest)
    .then((contentfulResponse) => {
      response.results = resolveResponse(contentfulResponse)
      response.total = contentfulResponse.total
      response.results
        .map(responseItem => {
          responseItem.distance = haversineDistance(
            location.lng,
            location.lat,
            responseItem.fields.location.lon,
            responseItem.fields.location.lat,
            true
          )
          responseItem.fields.summary = truncate(removeMarkdown(responseItem.fields.serviceInfo), {
            'length': 100
          })
          Object.keys(responseItem.fields)
            .filter(fieldKey => treatmentCentresMarkedFields.indexOf(fieldKey) !== -1)
            .map(fieldKey => {
              responseItem.fields[fieldKey] = marked(responseItem.fields[fieldKey])
            })
          response.results.sort((a, b) => parseFloat(a.distance) > parseFloat(b.distance))
        })

      // Set meta info
      response.head = {
        title: `Results ordered by nearest to "${locationValue}"`
      }

      res.send(response)
    })
    .catch(error => next(error))
})

router.get('/treatment-centres/:slug', (req, res, next) => {
  if (!req.params.slug) {
    let error = new Error()
    error.message = 'Page id not set'
    error.status = 404
    return next(error)
  }

  const slug = decodeURIComponent(req.params.slug.toLowerCase())

  const contentfulRequest = {
    content_type: config.contentful.contentTypes.treatmentCentre,
    'fields.slug': slug,
    'fields.addressStatus': true
  }

  contentfulClient.getEntries(contentfulRequest)
    .then((contentfulResponse) => {
      if (contentfulResponse.total === 0) {
        let error = new Error()
        error.message = `'${slug}': Page not found`
        error.status = 404
        return next(error)
      }

      // merge contentful assets and includes
      let response = resolveResponse(contentfulResponse)[0]
      Object.keys(response.fields)
        .filter(fieldKey => treatmentCentresMarkedFields.indexOf(fieldKey) !== -1)
        .map(fieldKey => {
          response.fields[fieldKey] = marked(response.fields[fieldKey])
        })

      response.fields.timesSessions = nl2br(response.fields.timesSessions)

      // Set meta info
      response.head = {
        title: getPageTitle(response.fields, 'name'),
        description: getMetaDescription(response.fields, 'serviceInfo')
      }

      res.send(response)
    })
    .catch(error => next(error))
})

/**
 * Error handler
 */
router.use(function (err, req, res, next) {
  let status = err.status || 500

  /* eslint-disable */
  console.log(err)
  /* eslint-enable */

  let msg = err.message || err.stack || err.name || 'General error'

  if (config.sentry.logErrors) {
    Sentry.captureException(err)
  }

  res.status(status)
    .json({
      error: msg
    })
})

/**
 * @todo: refactor this into utilities file
 */
const contentfulFieldToMarkdown = (markDownFields, fieldName, responseFields) => (
  markDownFields[fieldName]
    .filter(fieldChildName => responseFields.hasOwnProperty(fieldChildName))
    .map(fieldChildName => {
      responseFields[fieldChildName] = marked(responseFields[fieldChildName])
    })
)

const dateFormat = (response) => {
  if (response.fields.originalPublishDate) {
    response['date'] = response.sys.updatedAt
    response['dateFormatted'] = format(Date.parse(response.sys.updatedAt), 'Do MMM YYYY')
  } else {
    response['date'] = response.fields.originalPublishDate
    response['dateFormatted'] = format(Date.parse(response.fields.originalPublishDate), 'Do MMM YYYY')
  }

  return response
}

const getPageTitle = (item, fallback) => {
  if (item.pageTitle) {
    return item.pageTitle
  } else if (item[fallback]) {
    return item[fallback]
  }
  return false
}

const getMetaDescription = (item, fallback) => {
  if (item.metaDescription) {
    return item.metaDescription
  } else if (item[fallback]) {
    return truncate(removeMarkdown(removeTags(item[fallback])), {
      'length': 120
    })
  }
  return false
}

export default router

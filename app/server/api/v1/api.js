import { config } from 'config'
import axios from 'axios'
import { format } from 'date-fns'
import { imageMap, removeMarkdown } from '../../../shared/utilities'

/**
 * Express routes
 */
import searchRoutes from './apisearch.js'

const express = require('express')
const yaml = require('js-yaml')
const fs = require('fs')
const util = require('util')
const marked = require('marked')
const router = express.Router()
const sortBy = require('lodash.sortby')
const groupBy = require('lodash.groupby')
const truncate = require('lodash.truncate')
const Sentry = require('@sentry/node')
const resolveResponse = require('contentful-resolve-response')
const contentful = require('contentful')
const contentfulClient = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: config.contentful.contentSpace,
  environment: config.contentful.environment,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: config.contentful.contentAccessToken,
  host: config.contentful.contentHost
})

/**
 * Axios global config
 */
axios.defaults.headers.common['Authorization'] = `Bearer ${config.contentful.contentAccessToken}`

/**
 * Get page data
 */
router.use('/search', searchRoutes)

router.get('/pages/:slug', (req, res, next) => {
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

  // If the slug value exists in the config contentful 'entries' list use that
  // to fetch a single content item, fallback to slug value
  if (config.contentful.entries[req.params.slug]) {
    contentfulClient.getEntry(config.contentful.entries[req.params.slug])
      .then((entry) => {
        // merge contentful assets and includes
        let response = entry
        response.title = response.fields.title
        res.send(response)
      })
      .catch(error => next(error.response))
  } else {
    contentfulClient.getEntries({
      content_type: config.contentful.contentTypes.page,
      'fields.slug': decodeURIComponent(req.params.slug)
    })
      .then((contentfulResponse) => {
        if (contentfulResponse.total === 0) {
          let error = new Error()
          error.message = `Page not found`
          error.status = 404
          return next(error)
        }

        // merge contentful assets and includes
        let response = resolveResponse(contentfulResponse)[0]
        response.title = response.fields.title
        res.send(response)
      })
      .catch(error => next(error.response))
  }
})

router.get('/drug/:slug', (req, res, next) => {
  if (!req.params.slug) {
    let error = new Error()
    error.message = 'Page id not set'
    error.status = 404
    return next(error)
  }

  contentfulClient.getEntries({
    content_type: config.contentful.contentTypes.drug,
    'fields.slug': decodeURIComponent(req.params.slug)
  })
    .then((contentfulResponse) => {
      if (contentfulResponse.total === 0) {
        let error = new Error()
        error.message = `Page not found`
        error.status = 404
        return next(error)
      }

      let response = resolveResponse(contentfulResponse)[0]
      response.title = response.fields.drugName
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
      res.send(response)
    })
    .catch(error => next(error.response))
})

/**
 * Get drugs list data (A-Z)
 */
router.get('/drugs', (req, res, next) => {
  let response = {
    list: []
  }

  contentfulClient.getEntries({
    content_type: config.contentful.contentTypes.drug
  })
    .then((contentfulResponse) => {
      if (contentfulResponse.total === 0) {
        let error = new Error()
        error.message = `Page not found ${pageUrl}`
        error.status = 404
        return next(error)
      }

      contentfulResponse.items
        .filter(item => item.fields.synonyms && item.fields.drugName)
        .map((item) => {
          response.list.push({
            // name: item.fields.name.toLowerCase(),
            name: item.fields.drugName,
            slug: `/drug/${item.fields.slug}`,
            synonyms: item.fields.synonyms,
            description: item.fields.description
          })

          item.fields.synonyms
            .map(synonym => {
              response.list.push({
                name: synonym.trim(),
                slug: `/drug/${item.fields.slug}`,
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

  let response = {
    list: []
  }

  contentfulClient.getEntries({
    content_type: config.contentful.contentTypes.news,
    order: '-sys.createdAt,sys.id',
    limit: req.query.pageSize,
    skip: req.query.pageSize * req.query.page
  })
    .then((contentfulResponse) => {
      let imageCount = 1
      if (contentfulResponse.total === 0) {
        let error = new Error()
        error.message = `Page not found ${pageUrl}`
        error.status = 404
        return next(error)
      }
      // merge contentful assets and includes
      response.title = 'Latest news'
      response.total = contentfulResponse.total
      response.list = resolveResponse(contentfulResponse)
      response.list = response.list.map(v => {
        if (v.fields.originalPublishDate) {
          v['date'] = v.fields.originalPublishDate
          v['dateFormatted'] = format(Date.parse(v.fields.originalPublishDate), 'Do MMM YYYY')
        } else {
          // @andy - this needs a bit more nuance - there is a created and an updated date for each
          // so going to use the updated for now as that is the latest
          v['date'] = v.sys.updatedAt
          v['dateFormatted'] = format(Date.parse(v.sys.updatedAt), 'Do MMM YYYY')
          // v['createdAt'] = v.sys.createdAt
          // v['createdAtFormatted'] = format(Date.parse(v.sys.createdAt), 'Do MMM YYYY')
        }

        if (!v.fields.summary && v.fields.bodyLegacy) {
          v.fields.summary = _.truncate(removeMarkdown(v.fields.bodyLegacy), {
            'length': 100
          })
        }

        if (v.fields.image) {
          v.fields.image = imageMap(v.fields.image)
          imageCount++
          v.fields['imagepos'] = imageCount
        }

        return v
      })
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

  const slug = decodeURIComponent(req.params.slug)

  contentfulClient.getEntries({
    content_type: config.contentful.contentTypes.news,
    'fields.slug': slug
  })
    .then((contentfulResponse) => {
      if (contentfulResponse.total === 0) {
        let error = new Error()
        error.message = `Page not found`
        error.status = 404
        return next(error)
      }
      // merge contentful assets and includes
      let response = resolveResponse(contentfulResponse)[0]
      response.title = response.fields.title
      res.send(response)
    })
    .catch(error => next(error.response))
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

export default router

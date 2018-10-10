import { config } from 'config'
import axios from 'axios'
import { getContentfulHost } from '../../../shared/utilities'

/**
 * Express routes
 */
import searchRoutes from './apisearch.js'

const express = require('express')
const yaml = require('js-yaml')
const fs = require('fs')
const bodyParser = require('body-parser')
const util = require('util')
const marked = require('marked')
const router = express.Router()
const sortBy = require('lodash.sortby')
const groupBy = require('lodash.groupby')
const Sentry = require('@sentry/node')
const resolveResponse = require('contentful-resolve-response')

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

  if (req.params.slug === 'no-match' ||
    req.params.slug === 'typography') {
    try {
      return res.send(yaml.safeLoad(fs.readFileSync('./static/' + req.params.slug + '.yml', 'utf8')))
    } catch (error) {
      next(error)
    }
  }

  let response = {}
  let lookupUrl = getContentfulHost()
  let pageUrl = ''

  // If the slug value exists in the config contentful 'entries' list use that
  // to fetch a single content item, fallback to slug value
  if (config.contentful.entries[req.params.slug]) {
    lookupUrl += `/entries?sys.id=%s&include=5`
    pageUrl = util.format(lookupUrl, config.contentful.entries[req.params.slug])
  } else {
    lookupUrl += `/entries?content_type=%s&include=5&fields.slug[match]=%s`
    pageUrl = util.format(lookupUrl, config.contentful.contentTypes.page, req.params.slug)
  }

  axios.get(pageUrl)
    .then(json => {
      if (json.data.total === 0) {
        let error = new Error()
        error.message = `Page not found ${pageUrl}`
        error.status = 404
        return next(error)
      }
      // merge contentful assets and includes
      response = resolveResponse(json.data)[0]
      res.send(response)
    })
    .catch(error => {
      return next(error.response)
    })
})

router.get('/drugs/:slug', (req, res, next) => {
  if (!req.params.slug) {
    let error = new Error()
    error.message = 'Page id not set'
    error.status = 404
    return next(error)
  }

  let response = {}
  let lookupUrl = `${getContentfulHost()}/entries?content_type=%s&include=5&fields.slug[match]=%s`
  let pageUrl = util.format(lookupUrl, config.contentful.contentTypes.drug, req.params.slug)

  axios.get(pageUrl)
    .then(json => {
      if (json.data.total === 0) {
        let error = new Error()
        error.message = `Page not found ${pageUrl}`
        error.status = 404
        return next(error)
      }

      // merge contentful assets and includes
      response = resolveResponse(json.data)[0]

      // Add contentful field ids here to tranform the contents
      // from markdown to HTML
      const markDownFields = {
        'description': [],
        'qualitiesAppearance': [],
        'qualitiesTaste': [],
        'qualitiesAdministered': [],
        'effectsFeeling': [],
        'effectsBehaviour': [],
        'durationDetail': [],
        'durationDetectable': [],
        'risksPhysicalHealth': [],
        'risksHealthMental': [],
        'risksCutWith': [],
        'mixingDangers': [],
        'lawClass': [
          'possesion',
          'supplying',
          'dealersSupplying',
          'driving'
        ],
        'addiction': [],
        'additional': [],
        'durationMethodOfTaking': [
          'methodAfterEffects',
          'methodEffectsDuration',
          'methodEffectsStart'
        ]
      }

      Object.keys(response.fields)
        .filter(fieldName => markDownFields.hasOwnProperty(fieldName))
        .map(fieldName => {
          if (markDownFields[fieldName].length > 0) {
            if (Array.isArray(response.fields[fieldName])) {
              for (let i = 0; i <= response.fields[fieldName].length - 1; i++) {
                contentfulFieldToMarkdown(markDownFields, fieldName, response.fields[fieldName][i].fields)
              }
            } else if (response.fields[fieldName].fields) {
              contentfulFieldToMarkdown(markDownFields, fieldName, response.fields[fieldName].fields)
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
 * @todo: refactor this into utilities file
 */
const contentfulFieldToMarkdown = (markDownFields, fieldName, responseFields) => (
  markDownFields[fieldName]
    .filter(fieldChildName => responseFields.hasOwnProperty(fieldChildName))
    .map(fieldChildName => {
      responseFields[fieldChildName] = marked(responseFields[fieldChildName])
    })
)

/**
 * Get page data
 */
router.get('/drugs', (req, res, next) => {
  let response = {
    list: []
  }
  let lookupUrl = `${getContentfulHost()}/entries?content_type=%s`
  let pageUrl = util.format(lookupUrl, config.contentful.contentTypes.drug)

  axios.get(pageUrl)
    .then(json => {
      if (json.data.total === 0) {
        let error = new Error()
        error.message = `Page not found ${pageUrl}`
        error.status = 404
        return next(error)
      }

      json.data.items
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
        return val.name.charAt(0)
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

export default router

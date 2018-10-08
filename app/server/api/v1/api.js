import { config } from 'config'
import axios from 'axios'
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

  if (req.params.slug === 'index' ||
    req.params.slug === 'no-match' ||
    req.params.slug === 'typography') {
    try {
      return res.send(yaml.safeLoad(fs.readFileSync('./static/' + req.params.slug + '.yml', 'utf8')))
    } catch (e) {
      reject(err)
      next(e)
    }
  }
})

router.get('/drugs/:slug', async (req, res, next) => {
  if (!req.params.slug) {
    let error = new Error()
    error.message = 'Page id not set'
    error.status = 404
    return next(error)
  }

  let json = null
  let response = {}
  let lookupUrl = `${config.contentful.contentHost}/spaces/${config.contentful.contentSpace}/environments/${config.contentful.environment}/entries?content_type=%s&include=5&fields.slug[match]=%s`
  let pageUrl = util.format(lookupUrl, config.contentful.contentTypes.drug, req.params.slug)

  try {
    json = await axios.get(pageUrl)

    if (json.data.total === 0) {
      let error = new Error()
      error.message = `Page not found ${pageUrl}`
      error.status = 404
      return next(error)
    }

    // merge contentful assets and includes
    response = resolveResponse(json.data)[0]

    // Add contentful field ids to this list to tranform the contents
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
      'addiction': [],
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
          for (let i = 0; i <= response.fields[fieldName].length - 1; i++) {
            markDownFields[fieldName]
              .filter(fieldChildName => response.fields[fieldName][i].fields.hasOwnProperty(fieldChildName))
              .map(fieldChildName => {
                response.fields[fieldName][i].fields[fieldChildName] = marked(response.fields[fieldName][i].fields[fieldChildName])
              })
          }
        } else {
          response.fields[fieldName] = marked(response.fields[fieldName])
        }
      })
  } catch (error) {
    return next(error.response)
  } finally {
    res.send(response)
  }
})

/**
 * Get page data
 */
router.get('/drugList', (req, res, next) => {
  try {
    let lookupUrl = `${config.contentful.contentHost}/spaces/%s/entries?content_type=%s`
    let pageUrl = util.format(lookupUrl, config.contentful.contentSpace, config.contentful.contentTypes.drug)
    axios.get(pageUrl).then(json => {
      if (json.data.total === 0) {
        let error = new Error()
        error.message = `Page not found ${pageUrl}`
        error.status = 404
        return next(error)
      }

      let response = {
        list: []
      }

      json.data.items.map((item) => {
        // skip item if any key fields are missing (for preview)
        if (!item.fields.synonyms ||
          !item.fields.name) {
          return
        }

        response.list[response.list.length] = {
          // name: item.fields.name.toLowerCase(),
          name: item.fields.name,
          slug: `/drug/${item.fields.slug}`,
          synonyms: item.fields.synonyms,
          description: item.fields.description
        }

        item.fields.synonyms.split(',').map(synonym => {
          response.list[response.list.length] = {
            name: synonym.trim(),
            slug: `/drug/${item.fields.slug}`,
            parent: item.fields.name
          }
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
      response.list = sortBy(groupedArray, (item) => (item.group)).filter(v => {
        if (!isNaN(parseFloat(v.group))) {
          numbers.push(v)
          return false
        }

        return isNaN(parseFloat(v.group)) && v.group !== ''
      })

      response.list = response.list.concat(numbers)

      res.send(response)
    }).catch(error => {
      error.status = 500
      return next(error)
    })
  } catch (error) {
    error.status = 500
    return next(error)
  }
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

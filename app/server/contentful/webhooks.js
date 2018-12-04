import { config } from 'config'
import {
  formatGeneralContentEntryForSearch,
  formatDrugEntryForSearch,
  formatDrugNameEntryForSearch,
  formatNewsEntryForSearch,
  buildBulkDeleteAction,
  buildBulkUpdateAction
} from '../../shared/elasticSearch'
import { getApiHost } from '../../shared/utilities'
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const Sentry = require('@sentry/node')
const bodybuilder = require('bodybuilder')
const resolveResponse = require('contentful-resolve-response')
const contentful = require('contentful')
const contentfulClientConf = {
  space: config.contentful.contentSpace,
  accessToken: config.contentful.contentAccessToken,
  host: config.contentful.contentHost
}
console.log(`Setting up webhook at ${getApiHost()}/contentful/webhook`)

if (config.contentful.environment && config.contentful.environment !== 'master') {
  console.log(`Webhook using contentful environment: ${config.contentful.environment}`)
  contentfulClientConf.environment = config.contentful.environment
} else {
  console.log(`Webhook using contentful environment: master`)
}
const contentfulClient = contentful.createClient(contentfulClientConf)

/**
 * Add middleware to parse json
 */
router.use(bodyParser.json({type: 'application/*'}))

/**
 * Get page data
 * @todo: refactor this into smaller dry-er functions
 */
router.use('/', async (req, res, next) => {
  try {
    const search = res.search
    const webhookName = req.headers['x-contentful-topic']
    const secretKey = req.headers['x-ttf-search-key']
    if (!secretKey || secretKey !== config.contentful.webhookSecretKey) {
      console.log('Webhook called without security request headers', req.headers)
      res.status(401)
      return res.send({status: 'UNAUTHORISED'})
    }

    console.log(`\nWebhook called ${webhookName}`)
    switch (webhookName) {
      case 'ContentManagement.Entry.publish' :

        if (req.body.sys.contentType.sys.id === config.contentful.contentTypes.drug) {
          console.log(
            `\nPublishing ${req.body.sys.contentType.sys.id}` +
            ` entry id: ${req.body.sys.id}`
          )

          // Contentful webhook doesn't contain full entry payload so reloading
          // using lib here
          const contentfulResponse = await contentfulClient.getEntries({
            'sys.id': req.body.sys.id,
            include: 10
          })

          if (contentfulResponse.total === 0) {
            console.log(`Error updating sys id ${req.body.sys.id}, not found in contentful`)
            return
          }

          const entry = resolveResponse(contentfulResponse)[0]

          // Remove any entries in the 'drug name' index that no longer exist
          // in the list of drug synonyms
          const query = bodybuilder()
            .orFilter('term', 'entryId', entry.sys.id)
            .build()

          const drugNameResults = await search.search({
            index: config.elasticsearch.indices.drugNames,
            body: query
          })
          let itemsToDeleteFromSearch = []
          drugNameResults.hits.hits
            .map(drugItem => {
              itemsToDeleteFromSearch.push({id: drugItem._id, name: drugItem._source.name})
            })

          if (itemsToDeleteFromSearch.length > 0) {
            buildBulkDeleteAction(
              config.elasticsearch.indices.drugNames,
              '_doc',
              itemsToDeleteFromSearch,
              search,
              'name'
            )
          }

          // Create new entries in the 'drug name' & 'drug text' indices
          let formattedDrugsText = []
          let formattedDrugsNames = []
          const name = entry.fields.hasOwnProperty('drugName') ? entry.fields.drugName : null
          formattedDrugsText.push(formatDrugEntryForSearch(name, entry))
          formattedDrugsNames.push(formatDrugNameEntryForSearch(name, name, entry))

          if (entry.fields.synonyms) {
            entry.fields.synonyms
              .map(synonymName => {
                formattedDrugsNames.push(formatDrugNameEntryForSearch(synonymName, name, entry))
              })
          }

          // Create bulk actions for ES
          await buildBulkUpdateAction(
            config.elasticsearch.indices.drug,
            '_doc',
            formattedDrugsText,
            search,
            'drugName'
          )

          await buildBulkUpdateAction(
            config.elasticsearch.indices.drugNames,
            '_doc',
            formattedDrugsNames,
            search,
            'name'
          )
        }

        // News && General content
        if (req.body.sys.contentType.sys.id === config.contentful.contentTypes.page ||
          req.body.sys.contentType.sys.id === config.contentful.contentTypes.news) {
          console.log(
            `Publishing ${req.body.sys.contentType.sys.id}` +
            `entry id: ${req.body.sys.id}`
          )
          // exclude 'includeInSearch = false' values
          // Contentful webhook doesn't contain full entry payload so reloading
          // using lib here
          const contentfulResponse = await contentfulClient.getEntries({
            'sys.id': req.body.sys.id,
            include: 10
          })

          if (contentfulResponse.total === 0) {
            console.log(`Error updating sys id ${req.body.sys.id}, not found in contentful`)
            return
          }

          let formattedContent = []
          const entry = resolveResponse(contentfulResponse)[0]
          if (entry.fields.hasOwnProperty('includeInSearch') && entry.fields.includeInSearch === false) {
            console.log(`Skipping update of content sys id ${req.body.sys.id}, includeInSearch is false`)
            res.status(200)
            res.send({status: 'NO CHANGE'})
            return
          }

          const item = req.body.sys.contentType.sys.id === config.contentful.contentTypes.news
            ? formatNewsEntryForSearch(entry) : formatGeneralContentEntryForSearch(entry)
          formattedContent.push(item)

          await buildBulkUpdateAction(
            config.elasticsearch.indices.content,
            '_doc',
            formattedContent,
            search,
            'title'
          )
        }
        break

      case 'ContentManagement.Entry.unpublish' :
      case 'ContentManagement.Entry.delete' :

        if (req.body.sys.contentType.sys.id === config.contentful.contentTypes.drug) {
          console.log(
            `Publishing ${req.body.sys.contentType.sys.id}` +
            ` entry id: ${req.body.sys.id}`
          )

          // Find existing entries in the 'drug name' index & remove
          const query = bodybuilder()
            .orFilter('term', 'entryId', req.body.sys.id)
            .build()

          const drugNameResults = await search.search({
            index: config.elasticsearch.indices.drugNames,
            body: query
          })
          let itemsToDeleteFromSearch = []
          drugNameResults.hits.hits
            .map(item => itemsToDeleteFromSearch.push({id: item._id, name: item._source.name}))

          if (itemsToDeleteFromSearch.length > 0) {
            buildBulkDeleteAction(
              config.elasticsearch.indices.drugNames,
              '_doc',
              itemsToDeleteFromSearch,
              search,
              'name'
            )
          }

          buildBulkDeleteAction(
            config.elasticsearch.indices.drug,
            '_doc',
            [{id: req.body.sys.id}],
            search
          )
        }

        // News && General content
        if (req.body.sys.contentType.sys.id === config.contentful.contentTypes.page ||
        req.body.sys.contentType.sys.id === config.contentful.contentTypes.news) {
          buildBulkDeleteAction(
            config.elasticsearch.indices.content,
            '_doc',
            [{id: req.body.sys.id}],
            search
          )
        }
        break
    }

    res.status(202)
    res.send({status: 'ACCEPTED'})
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

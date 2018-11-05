import { config } from 'config'
import { removeMarkdown } from '../../../shared/utilities'
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodybuilder = require('bodybuilder')

/**
 * Add middleware to parse json
 */
const jsonParser = bodyParser.json()

router.get('/page/:term', jsonParser, (req, res, next) => {
  try {
    if (!req.params.term ||
      !req.query.page ||
      !req.query.pageSize) {
      let error = new Error()
      error.message = 'No search term'
      error.status = 500
      return next(error)
    }

    const search = res.search
    const searchTerm = req.params.term.toLowerCase().trim()
    const query = buildMatchQuery(
      searchTerm,
      true,
      req.query.page,
      req.query.pageSize
    )
    const indices = `${config.elasticsearch.indices.drug},` +
    `${config.elasticsearch.indices.content}`

    search.search({
      index: indices,
      body: query
    }).then(results => {
      results.hits.hits
        .filter(hit => hit._source.description)
        .map(hit => {
          hit._source.description = removeMarkdown(hit._source.description)
        })
      results.hits.searchTerm = decodeURIComponent(req.params.term.trim())
      return res.status(200).json(results.hits)
    })
  } catch (err) {
    return next(err.response)
  }
})

router.get('/autocomplete/:term', jsonParser, (req, res, next) => {
  try {
    if (!req.params.term ||
      !req.query.page ||
      !req.query.pageSize) {
      let error = new Error()
      error.message = 'No search term'
      error.status = 500
      return next(error)
    }

    const search = res.search
    const searchTerm = req.params.term.toLowerCase().trim()
    const multiWordSearch = searchTerm.split(' ').length > 1
    const query = multiWordSearch
      ? buildMatchQuery(searchTerm, false, req.query.page, req.query.pageSize)
      : buildPrefixQuery(searchTerm, req.query.page, req.query.pageSize)
    const indices = multiWordSearch
      ? `${config.elasticsearch.indices.drug},${config.elasticsearch.indices.content}`
      : `${config.elasticsearch.indices.drugNames},${config.elasticsearch.indices.content}`

    search.search({
      index: indices,
      body: query
    }).then(results => {
      if (!multiWordSearch) {
        results.hits.hits.sort((a, b) => {
          return a._source.name > b._source.name
        })
      }
      results.hits.searchTerm = decodeURIComponent(req.params.term.trim())
      return res.status(200).json(results.hits)
    })
  } catch (err) {
    return next(err.response)
  }
})

const buildMatchQuery = (searchTerm, fuzzy, page, pageSize) => {
  // Add a prefix query
  let nameFields = [
    'drugName^10',
    'synonyms^5'
  ]

  let nameConf = {
    fields: nameFields,
    query: searchTerm,
    type: 'phrase_prefix'
  }

  // Add a fuzzy search query on drug name fields
  const titleFields = [
    'name^5',
    'tags^2',
    'synonyms^5',
    'relatedDrugs.drugName',
    'relatedDrugs.synonyms'
  ]

  let titleConf = {
    fields: titleFields,
    query: searchTerm,
    type: 'best_fields'
  }

  if (fuzzy) {
    titleConf.fuzziness = 'auto'
  }

  // Add a full text search on all other text fields
  const textFields = [
    'title',
    'body',
    'addiction',
    'additional',
    'description',
    'durationDetail',
    'durationDetectable',
    'effectsBehaviour',
    'effectsFeeling',
    'mixingDangers',
    'qualitiesAdministered',
    'qualitiesAppearance',
    'qualitiesTaste',
    'risksCutWith',
    'risksHealthMental',
    'risksPhysicalHealth',
    'durationMethodOfTaking.methodAfterEffects',
    'durationMethodOfTaking.methodEffectsDuration',
    'durationMethodOfTaking.methodEffectsStart',
    'durationMethodOfTaking.methodName'
  ]

  let textConf = {
    fields: textFields,
    query: searchTerm,
    type: 'best_fields',
    minimum_should_match: '100%'
  }

  let query = bodybuilder()
    .from(page * pageSize)
    .size(pageSize)
    .orQuery('multi_match', nameConf)
    .orQuery('multi_match', titleConf)
    .orQuery('multi_match', textConf)
    .sort([
      {'_score': 'desc'}
    ])
    .rawOption('highlight', {
      'order': 'score',
      'number_of_fragments': 2,
      'pre_tags': [''],
      'post_tags': [''],
      'fragment_size': 150,
      'fields': {
        'title': {},
        'name': {},
        'drugName': {},
        'tags': {},
        'relatedDrugs.drugName': {},
        'relatedDrugs.synonyms': {},
        'body': {},
        'addiction': {},
        'additional': {},
        'description': {},
        'durationDetail': {},
        'durationDetectable': {},
        'effectsBehaviour': {},
        'effectsFeeling': {},
        'mixingDangers': {},
        'qualitiesAdministered': {},
        'qualitiesAppearance': {},
        'qualitiesTaste': {},
        'risksCutWith': {},
        'risksHealthMental': {},
        'risksPhysicalHealth': {},
        'durationMethodOfTaking.methodAfterEffects': {},
        'durationMethodOfTaking.methodEffectsDuration': {},
        'durationMethodOfTaking.methodEffectsStart': {},
        'durationMethodOfTaking.methodName': {},
        'realName': {},
        'synonyms': {}
      }
    })
  return query.build()
}

const buildPrefixQuery = (searchTerm, page, pageSize) => {
  let fields = [
    'name.completion^10'
  ]

  if (searchTerm.length > 2) {
    fields.push(
      'title.completion',
      'relatedDrugs.drugName.completion',
      'relatedDrugs.synonyms.completion',
      'tags')
  }

  let conf = {
    fields: fields,
    query: searchTerm,
    type: 'phrase_prefix'
  }

  let query = bodybuilder()
    .from(page * pageSize)
    .size(pageSize)
    .sort([
      {'_score': 'desc'}
    ])
    .query('multi_match', conf)
    .rawOption('highlight', {
      'order': 'score',
      'number_of_fragments': 2,
      'pre_tags': [''],
      'post_tags': [''],
      'fragment_size': 150,
      'fields': {
        'title.completion': {},
        'tags': {},
        'name.completion^10': {},
        'relatedDrugs.drugName.completion': {},
        'relatedDrugs.synonyms.completion': {}
      }
    })
  return query.build()
}

export default router

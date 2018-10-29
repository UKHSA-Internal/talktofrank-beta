import { config } from 'config'
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
    if (!req.params.term) {
      let error = new Error()
      error.message = 'No search term'
      error.status = 500
      return next(error)
    }

    const search = res.search
    const searchTerm = req.params.term.toLowerCase()
    const query = buildMatchQuery(searchTerm, true)
    const indices = `${config.elasticsearch.indices.drug},${config.elasticsearch.indices.content}`

    search.search({
      index: indices,
      body: query
    }).then(results => res.status(200).json(results.hits))
  } catch (err) {
    return next(err.response)
  }
})

router.get('/autocomplete/:term', jsonParser, (req, res, next) => {
  try {
    if (!req.params.term) {
      let error = new Error()
      error.message = 'No search term'
      error.status = 500
      return next(error)
    }

    const search = res.search
    const searchTerm = req.params.term.toLowerCase()
    const multiWordSearch = searchTerm.split(' ').length > 1
    const query = multiWordSearch
      ? buildMatchQuery(searchTerm, false)
      : buildPrefixQuery(searchTerm)
    const indices = multiWordSearch
      ? `${config.elasticsearch.indices.drug},${config.elasticsearch.indices.content}`
      : `${config.elasticsearch.indices.drugNames},${config.elasticsearch.indices.content}`

    search.search({
      index: indices,
      body: query
    }).then(results => res.status(200).json(results.hits))
  } catch (err) {
    return next(err.response)
  }
})

const buildMatchQuery = (searchTerm, fuzzy) => {
  const titleFields = [
    'title',
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

  const textFields = [
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

  if (fuzzy) {
    titleConf.fuzziness = 'auto'
  }

  let query = bodybuilder()
    .orQuery('multi_match', titleConf)
    .orQuery('multi_match', textConf)
    .rawOption('highlight', {
      'order': 'score',
      'number_of_fragments': 2,
      'pre_tags': ['<strong>'],
      'post_tags': ['</strong>'],
      'fragment_size': 150,
      'fields': {
        'title': {},
        'name': {},
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

const buildPrefixQuery = (searchTerm) => {
  let fields = [
    'name.completion^10'
  ]

  if (searchTerm.length > 3) {
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
    .query('multi_match', conf)
    .rawOption('highlight', {
      'order': 'score',
      'number_of_fragments': 2,
      'pre_tags': ['<strong>'],
      'post_tags': ['</strong>'],
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

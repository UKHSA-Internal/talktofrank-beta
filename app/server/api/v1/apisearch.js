import { config } from 'config'
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodybuilder = require('bodybuilder')
const util = require('util')
/**
 * Add middleware to parse json
 */

const jsonParser = bodyParser.json()

router.get('/:term', jsonParser, (req, res, next) => {
  try {
    if (!req.params.term) {
      let error = new Error()
      error.message = 'Page search tern not set'
      error.status = 404
      return next(error)
    }

    const search = res.search
    const searchTerm = req.params.term.toLowerCase()
    const multiWordSearch = searchTerm.split(' ').length > 1
    const query = multiWordSearch
      ? buildMatchQuery(searchTerm)
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

const buildMatchQuery = (searchTerm) => {
  let query = bodybuilder()
    .orQuery('multi_match', {fields: [
      'title',
      'name^5',
      'tags^2',
      'synonyms^5',
      'relatedDrugs.drugName',
      'relatedDrugs.synonyms'
    ],
      query: searchTerm,
      type: 'best_fields'
    })
    .orQuery('multi_match', { 'fields': [
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
    ],
      query: searchTerm,
      type: 'best_fields',
      minimum_should_match: '100%'
    })
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
    'title.completion',
    'tags.completion',
    'name.completion^10'
  ]

  if (searchTerm.length > 2) {
    fields.push('relatedDrugs.drugName.completion', 'relatedDrugs.synonyms.completion')
  }

  let query = bodybuilder()
    .query('multi_match', {
      fields: fields,
      query: searchTerm,
      type: 'phrase_prefix'
    })

  return query.build()
}

export default router

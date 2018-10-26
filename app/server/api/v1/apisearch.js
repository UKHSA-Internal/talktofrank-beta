import { config } from 'config'
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodybuilder = require('bodybuilder')
/**
 * Add middleware to parse json
 */

var jsonParser = bodyParser.json()

router.get('/page/:term', jsonParser, (req, res, next) => {
  try {
    if (!req.params.term) {
      const error = new Error()
      error.status = 404
      return next(error)
    }
    const search = res.search
    const searchTerm = req.params.term.toLowerCase()
    search.search({
      index: `${config.elasticsearch.indices.drug},${config.elasticsearch.indices.drug}`,
      body: buildMatchQuery(searchTerm)
    }).then(results => res.status(200).json(formatResults(results, searchTerm, true)))
  } catch (err) {
    err.status = 500
    return next(err)
  }
})

router.get('/autocomplete/:term', jsonParser, (req, res, next) => {
  try {
    if (!req.params.term) {
      const error = new Error()
      error.status = 404
      return next(error)
    }
    const search = res.search
    const searchTerm = req.params.term.toLowerCase()

    search.search({
      index: `${config.elasticsearch.indices.drugNames},${config.elasticsearch.indices.drug}`,
      body: buildPrefixQuery(searchTerm)
    }).then(results => res.status(200).json(results))
  } catch (err) {
    err.status = 500
    return next(err)
  }
})

const buildMatchQuery = (searchTerm) => {

  let query = bodybuilder()
    .orQuery('multi_match', {'fields': [
        'title',
        'name^5',
        'tags^2',
        'synonyms^5',
        'relatedDrugs.drugName',
        'relatedDrugs.synonyms'
      ], value: searchTerm, type: 'best_fields'})

  query.orQuery('multi_match', { 'fields':[
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
      'durationMethodOfTaking.methodName',
    ],
      'query': '{{searchTerm}} how long does it last',
      'type': 'best_fields',
      'minimum_should_match': '100%'
    })

  return query.build()

}
const buildPrefixQuery = (searchTerm) => {

  let query = bodybuilder()
    .orQuery('prefix', 'title', searchTerm)
    .orQuery('prefix', 'tags', searchTerm)
    .orQuery('prefix', 'name', {value: searchTerm, boost: 5})

  if (searchTerm.length > 2) {
    query.orQuery('prefix', 'relatedDrugs.drugName', searchTerm)
    query.orQuery('prefix', 'relatedDrugs.synonyms', searchTerm)
  }

  return query.build()

}


export default router

import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { config } from 'config'
import { removeTags } from './utilities'
const util = require('util')

export const formatNewsEntryForSearch = (newsItem) => {
  let formattedNewsItem = {
    id: newsItem.sys.id,
    relatedDrugs: [],
    title: newsItem.fields.title,
    slug: newsItem.fields.slug,
    tags: [],
    type: 'news'
  }

  if (newsItem.fields.body) {
    formattedNewsItem['body'] = removeTags(documentToHtmlString(newsItem.fields.body))
  }

  if (newsItem.fields.relatedDrugs) {
    newsItem.fields.relatedDrugs
      .filter(relatedDrug => relatedDrug.fields && relatedDrug.fields.drugName && relatedDrug.fields.slug && relatedDrug.fields.synonyms)
      .map(relatedDrug => {
        formattedNewsItem.relatedDrugs.push({
          drugName: relatedDrug.fields.drugName,
          slug: relatedDrug.fields.slug,
          synonyms: relatedDrug.fields.synonyms
        })
      })
  }

  if (newsItem.fields.tags) {
    newsItem.fields.tags
      .filter(tag => tag.fields)
      .map(tag => {
        formattedNewsItem.tags.push(tag.fields.tagName)
      })
  }
  return formattedNewsItem
}

export const formatDrugEntryForSearch = (name, drugItem) => {
  let formattedDrugItem = {
    id: drugItem.sys.id,
    name: name,
    synonyms: drugItem.fields.hasOwnProperty('synonyms') ? drugItem.fields.synonyms : '',
    slug: drugItem.fields.hasOwnProperty('slug') ? drugItem.fields.slug : null,
    addiction: drugItem.fields.hasOwnProperty('addiction') ? removeTags(drugItem.fields.addiction) : null,
    additional: drugItem.fields.hasOwnProperty('additional') ? removeTags(drugItem.fields.additional) : null,
    category: drugItem.fields.hasOwnProperty('category') ? removeTags(drugItem.fields.category) : 'None',
    description: drugItem.fields.hasOwnProperty('description') ? removeTags(drugItem.fields.description) : null,
    drugName: drugItem.fields.hasOwnProperty('drugName') ? removeTags(drugItem.fields.drugName) : null,
    durationDetail: drugItem.fields.hasOwnProperty('durationDetail') ? removeTags(drugItem.fields.durationDetail) : null,
    durationDetectable: drugItem.fields.hasOwnProperty('durationDetectable') ? removeTags(drugItem.fields.durationDetectable) : null,
    effectsBehaviour: drugItem.fields.hasOwnProperty('effectsBehaviour') ? removeTags(drugItem.fields.effectsBehaviour) : null,
    effectsFeeling: drugItem.fields.hasOwnProperty('effectsFeeling') ? removeTags(drugItem.fields.effectsFeeling) : null,
    mixingDangers: drugItem.fields.hasOwnProperty('mixingDangers') ? removeTags(drugItem.fields.mixingDangers) : null,
    qualitiesAdministered: drugItem.fields.hasOwnProperty('qualitiesAdministered') ? removeTags(drugItem.fields.qualitiesAdministered) : null,
    qualitiesAppearance: drugItem.fields.hasOwnProperty('qualitiesAppearance') ? removeTags(drugItem.fields.qualitiesAppearance) : null,
    qualitiesTaste: drugItem.fields.hasOwnProperty('qualitiesTaste') ? removeTags(drugItem.fields.qualitiesTaste) : null,
    risksCutWith: drugItem.fields.hasOwnProperty('risksCutWith') ? removeTags(drugItem.fields.risksCutWith) : null,
    risksHealthMental: drugItem.fields.hasOwnProperty('risksHealthMental') ? removeTags(drugItem.fields.risksHealthMental) : null,
    risksPhysicalHealth: drugItem.fields.hasOwnProperty('risksPhysicalHealth') ? removeTags(drugItem.fields.risksPhysicalHealth) : null,
    tags: []
  }

  if (drugItem.fields.durationMethodOfTaking) {
    formattedDrugItem.durationMethodOfTaking = []
    drugItem.fields.durationMethodOfTaking
      .filter(durationMethodOfTakingItem => durationMethodOfTakingItem.fields)
      .map(durationMethodOfTakingItem => {
        formattedDrugItem.durationMethodOfTaking.push({
          methodAfterEffects: durationMethodOfTakingItem.fields.methodAfterEffects,
          methodEffectsDuration: durationMethodOfTakingItem.fields.methodEffectsDuration,
          methodEffectsStart: durationMethodOfTakingItem.fields.methodEffectsStart,
          methodName: durationMethodOfTakingItem.fields.methodName
        })
      })
  }

  if (drugItem.fields.tags) {
    drugItem.fields.tags
      .filter(tag => tag.fields)
      .map(tag => {
        formattedDrugItem.tags.push(tag.fields.tagName.trim())
      })
  }

  return formattedDrugItem
}

export const formatDrugNameEntryForSearch = (name, realName, drugItem) => {
  let id = `${drugItem.sys.id}-${name.trim()}`.toLowerCase()
  let formattedDrugItem = {
    id: id.replace(/\s/g, '-'),
    entryId: drugItem.sys.id,
    name: name.trim(),
    realName: realName.trim(),
    category: drugItem.fields.hasOwnProperty('category') ? removeTags(drugItem.fields.category) : 'None',
    slug: drugItem.fields.hasOwnProperty('slug') ? drugItem.fields.slug : '',
    tags: []
  }

  if (drugItem.fields.tags) {
    drugItem.fields.tags
      .filter(tag => tag.fields)
      .map(tag => {
        formattedDrugItem.tags.push(tag.fields.tagName.trim())
      })
  }
  return formattedDrugItem
}

export const formatGeneralContentEntryForSearch = (pageItem) => {
  let formattedGeneralPagesItem = {
    id: pageItem.sys.id,
    relatedDrugs: [],
    title: pageItem.fields.title,
    slug: pageItem.fields.slug,
    tags: [],
    type: 'page'
  }

  if (pageItem.fields.body) {
    formattedGeneralPagesItem['body'] = removeTags(documentToHtmlString(pageItem.fields.body))
  }

  if (pageItem.fields.tags) {
    pageItem.fields.tags
      .filter(tag => tag.fields)
      .map(tag => {
        formattedGeneralPagesItem.tags.push(tag.fields.tagName)
      })
  }
  return formattedGeneralPagesItem
}

export const buildBulkUpdateAction = async (index, type, data, esClient, nameField) => {
  let bulk = []

  console.log('\nUpdating index', index)

  await data
    .map(item => {
      let action = {update: {_index: index, _type: type, _id: item.id}}
      bulk.push(action, {doc: item, doc_as_upsert: true, _source: [nameField]})
    })

  const response = await esClient.bulk({
    maxRetries: 5,
    index: index,
    body: bulk
  })

  console.log('Data count ', data.length)
  console.log('Indexed', response.items.length)

  response.items
    .filter(item => !item.update.error)
    .map(item => {
      console.log(`Adding item ${item.update.get._source[nameField]} (id: ${item.update._id}) - result: ${item.update.result}`)
    })

  response.items
    .filter(item => item.update.error)
    .map(item => {
      console.log('Error: ', item)
    })
}

export const buildBulkDeleteAction = async (index, type, data, esClient, nameField = false) => {
  let bulk = []
  console.log('\nUpdating index', index)
  await data
    .map(item => {
      let action = {delete: {_index: index, _type: type, _id: item.id}}
      const msg = nameField ? `Deleting item ${item[nameField]} (${item.id})` : `Deleting item ${item.id}`
      console.log(msg)
      bulk.push(action)
    })

  const response = await esClient.bulk({
    maxRetries: 5,
    index: index,
    body: bulk
  })

  console.log('Deleted ', response.items.length)
  if (response.errors) {
    console.log('Errors:')
    console.log(util.inspect(response.items, {showHidden: false, depth: null}))
  }
}

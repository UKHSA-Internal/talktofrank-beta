// import es6 files in grunt seems to cause issues
// const elasticSearchFunctions = require('../../app/shared/elasticSearch.jsx')
const yaml = require('js-yaml')
const fs = require('fs')
const contentful = require('contentful')
const documentToHtmlString = require('@contentful/rich-text-html-renderer')
const env = process.env.BUILD_CONFIG || 'development'
const merge = require('merge')
const AWS = require('aws-sdk')
const connectionClass = require('http-aws-es')
const elasticsearch = require('elasticsearch')
const util = require('util')

module.exports = function (grunt) {
  grunt.registerMultiTask('contentful', 'Sync and reindex entries from contentful to Elasticsearch', async function () {
    const done = this.async()
    const config = buildConfig(grunt)

    if (!config.contentful && !config.elasticsearch) {
      grunt.log.error('No config files found')
      done()
      return
    }

    const contentfulClient = contentfulConnection(config)
    const elasticClient = elasticConnection(config)

    let [news, drugs, pages] = await Promise.all([
      contentfulClient.getEntries({
        content_type: config.contentful.contentTypes.news
      }),
      contentfulClient.getEntries({
        content_type: config.contentful.contentTypes.drug
      }),
      contentfulClient.getEntries({
        content_type: config.contentful.contentTypes.page,
        'fields.includeInSearch': true
      })
    ])

    // Format all entries
    let formattedNews = []
    news.items
      .map(newsItem => formattedNews.push(formatNewsEntryForSearch(newsItem)))

    let formattedDrugsText = []
    let formattedDrugsNames = []
    drugs.items
      .map(drugItem => {
        const name = drugItem.fields.hasOwnProperty('drugName') ? drugItem.fields.drugName : null
        formattedDrugsText.push(formatDrugEntryForSearch(name, drugItem))
        formattedDrugsNames.push(formatDrugNameEntryForSearch(name, name, drugItem))

        if (drugItem.fields.synonyms) {
          drugItem.fields.synonyms
            .map(synonymName => {
              const synonymItem = formatDrugNameEntryForSearch(synonymName, name, drugItem)
              formattedDrugsNames.push(synonymItem)
            })
        }
      })

    let formattedGeneralPages = []
    pages.items
      .map(pageItem => formattedGeneralPages.push(formatGeneralContentEntryForSearch(pageItem)))

    // Create bulk actions for ES
    await buildBulkUpdateAction(
      config.elasticsearch.indices.drug,
      '_doc',
      formattedDrugsText,
      elasticClient,
      'drugName'
    )

    await buildBulkUpdateAction(
      config.elasticsearch.indices.drugNames,
      '_doc',
      formattedDrugsNames,
      elasticClient,
      'name'
    )

    await buildBulkUpdateAction(
      config.elasticsearch.indices.content,
      '_doc',
      formattedNews,
      elasticClient,
      'title'
    )

    await buildBulkUpdateAction(
      config.elasticsearch.indices.content,
      '_doc',
      formattedGeneralPages,
      elasticClient,
      'title'
    )

    done()
  })
}

const buildConfig = (grunt) => {
  let envConfig = {}
  let baseConfig = {}
  let configLoaded = false

  try {
    baseConfig = yaml.load(fs.readFileSync(process.cwd() + '/config.yaml', 'utf8'))
    grunt.log.writeln('Using config.yaml file')
    if (baseConfig.contentful && baseConfig.elasticsearch) configLoaded = true
  } catch (e) {
    grunt.log.writeln('No config.yaml file found, searching for development config')
  }

  try {
    envConfig = yaml.load(fs.readFileSync(process.cwd() + '/config.' + env + '.yaml', 'utf8'))
    if (envConfig.contentful && envConfig.elasticsearch) configLoaded = true
  } catch (e) {
    grunt.log.error('No development config file found')
  }

  baseConfig.buildTimestamp = Date.now()
  return merge.recursive(true, baseConfig, envConfig)
}

const contentfulConnection = (config) => {
  let conf = {
    // This is the space ID. A space is like a project folder in Contentful terms
    space: config.contentful.contentSpace,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: config.contentful.contentAccessToken,
    host: config.contentful.contentHost
  }

  if (config.contentful.environment) {
    conf.environment = config.contentful.environment
  }

  return contentful.createClient(conf)
}

const elasticConnection = (config) => {
  let elasticSearchConf = {
    host: config.elasticsearch.host || `http://localhost:9200`,
    log: `info`,
    ssl: {
      rejectUnauthorized: false
    }
  }

  if (config.elasticsearch.amazonES && config.elasticsearch.amazonES.region) {
    elasticSearchConf.connectionClass = connectionClass
    AWS.config.update({
      region: config.elasticsearch.amazonES.region
    })
  }

  if (config.elasticsearch.amazonES && config.elasticsearch.amazonES.credentials) {
    AWS.config.update({
      credentials: new AWS.Credentials(
        config.elasticsearch.amazonES.credentials.accessKeyId,
        config.elasticsearch.amazonES.credentials.secretAccessKey
      ),
      region: config.elasticsearch.amazonES.region
    })
  }

  return new elasticsearch.Client(elasticSearchConf)
}

const removeTags = (string) => string.replace(/<\/?[^>]+(>|$)/g, '')

const formatNewsEntryForSearch = (newsItem) => {
  let formattedNewsItem = {
    id: newsItem.sys.id,
    relatedDrugs: [],
    title: newsItem.fields.title,
    slug: newsItem.fields.slug,
    tags: [],
    type: 'news'
  }

  if (newsItem.fields.body) {
    formattedNewsItem['body'] = removeTags(documentToHtmlString.documentToHtmlString(newsItem.fields.body))
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

const formatDrugEntryForSearch = (name, drugItem) => {
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

const formatDrugNameEntryForSearch = (name, realName, drugItem) => {
  let id = `${drugItem.sys.id}-${name.trim()}`.toLowerCase()
  let formattedDrugItem = {
    id: id.replace(/\s/g, '-').toLowerCase(),
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

const formatGeneralContentEntryForSearch = (pageItem) => {
  let formattedGeneralPagesItem = {
    id: pageItem.sys.id,
    relatedDrugs: [],
    title: pageItem.fields.title,
    slug: pageItem.fields.slug,
    tags: [],
    type: 'page'
  }

  if (pageItem.fields.body) {
    formattedGeneralPagesItem['body'] = removeTags(documentToHtmlString.documentToHtmlString(pageItem.fields.body))
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

const buildBulkUpdateAction = async (index, type, data, esClient, nameField) => {
  let bulk = []

  console.log('\nUpdating index', index)

  await data
    .map(item => {
      let action = {update: {_index: index, _type: type, _id: item.id}}
      bulk.push(action, {doc: item, doc_as_upsert: true, _source: [nameField]})
    })


  try {
    const response = await esClient.bulk({
      maxRetries: 5,
      index: index,
      body: bulk
    })

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


  } catch (error) {
    console.log(error)
  }
}

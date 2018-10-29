const yaml = require('js-yaml')
const fs = require('fs')
const resolveResponse = require('contentful-resolve-response')
const contentful = require('contentful')
const env = process.env.BUILD_CONFIG || 'development'
const merge = require('merge')
const richTextHTMLRedered = require('@contentful/rich-text-html-renderer')
const util = require('util')
const AWS = require('aws-sdk')
const connectionClass = require('http-aws-es')
const elasticsearch = require('elasticsearch')

module.exports = function (grunt) {
  grunt.registerMultiTask('contentful', 'Sync and reindex entries from contentful to Elasticsearch', async function () {
    const done = this.async()

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
    let config = merge.recursive(true, baseConfig, envConfig)

    if (!config.contentful && !config.elasticsearch) {
      grunt.log.error('No config files found')
      done()
      return
    }

    const contentfulClient = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: config.contentful.contentSpace,
      environment: config.contentful.environment,
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: config.contentful.contentAccessToken,
      host: config.contentful.contentHost
    })

    let elasticSearchConf = {
      host: config.elasticsearch.host || `http://localhost:9200`,
      log: `info`
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

    let client = new elasticsearch.Client(elasticSearchConf)

    let [news, drugs, pages] = await Promise.all([
      contentfulClient.getEntries({
        content_type: config.contentful.contentTypes.news
      }),
      contentfulClient.getEntries({
        content_type: config.contentful.contentTypes.drug
      }),
      contentfulClient.getEntries({
        content_type: config.contentful.contentTypes.page
      })
    ])

    let formattedNews = []
    news.items
      .map(newsItem => {
        const formattedNewsItem = {
          id: newsItem.sys.id,
          relatedDrugs: [],
          title: newsItem.fields.title,
          slug: newsItem.fields.slug,
          tags: [],
          type: 'news'
        }

        if (newsItem.fields.body) {
          formattedNewsItem['body'] = cleanText(richTextHTMLRedered.documentToHtmlString(newsItem.fields.body))
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
        formattedNews.push(formattedNewsItem)
      })

    let formattedDrugsText = []
    let formattedDrugsNames = []
    drugs.items
      .map(drugItem => {
        const name = drugItem.fields.hasOwnProperty('drugName') ? drugItem.fields.drugName : null
        const item = addFormattedDrugText(name, null, drugItem)
        formattedDrugsText.push(item)

        formattedDrugsNames.push(addFormattedDrugName(name, name, drugItem))

        drugItem.fields.synonyms
          .map(synonymName => {
            const synonymItem = addFormattedDrugName(synonymName, name, drugItem)
            formattedDrugsNames.push(synonymItem)
          })
      })
    console.log(util.inspect(formattedDrugsNames, {showHidden: false, depth: null}))
    let formattedGeneralPages = []
    pages.items
      .map(pageItem => {
        const formattedGeneralPagesItem = {
          id: pageItem.sys.id,
          relatedDrugs: [],
          title: pageItem.fields.title,
          slug: pageItem.fields.slug,
          tags: [],
          type: 'page'
        }

        if (pageItem.fields.body) {
          formattedGeneralPagesItem['body'] = cleanText(richTextHTMLRedered.documentToHtmlString(pageItem.fields.body))
        }
        formattedGeneralPages.push(formattedGeneralPagesItem)
      })

    let bulk = []
    await formattedDrugsText
      .map(item => {
        let action = {update: {_index: 'talktofrank-beta-drug-text', _type: '_doc', _id: `${item.id}-${item.name}`}}
        bulk.push(action, {doc: item, doc_as_upsert: true})
      })

    const drugTextResponse = await client.bulk({
      maxRetries: 5,
      index: config.elasticsearch.indices.drug,
      body: bulk
    })

    console.log('Drug text Indexed items: ', drugTextResponse.items.length)
    console.log('Errors: ', drugTextResponse.errors.length)

    drugTextResponse.items
      .filter(reponseItem => reponseItem.update.status === 400)
      .map(reponseItem => {
        console.log(util.inspect(reponseItem, {showHidden: false, depth: null}))
      })

    bulk = []
    await formattedDrugsNames
      .map(item => {
        let action = {update: {_index: 'talktofrank-beta-drug-name', _type: '_doc', _id: `${item.id}-${item.name}`}}
        bulk.push(action, {doc: item, doc_as_upsert: true})
      })

    const drugNameResponse = await client.bulk({
      maxRetries: 5,
      index: config.elasticsearch.indices.drugNames,
      body: bulk
    })

    console.log('Drug name Indexed items: ', drugNameResponse.items.length)
    console.log('Errors: ', drugNameResponse.errors.length)

    drugNameResponse.items
      .filter(reponseItem => reponseItem.update.status === 400)
      .map(reponseItem => {
        console.log(util.inspect(reponseItem, {showHidden: false, depth: null}))
      })

    bulk = []
    await formattedNews
      .map(item => {
        let action = {update: {_index: 'talktofrank-beta-content', _type: '_doc', _id: `${item.id}`}}
        bulk.push(action, {doc: item, doc_as_upsert: true})
      })

    const newsResponse = await client.bulk({
      maxRetries: 5,
      index: config.elasticsearch.indices.page,
      body: bulk
    })

    console.log('News Indexed items: ', newsResponse.items.length)
    console.log('Errors: ', newsResponse.errors.length)

    newsResponse.items
      .filter(reponseItem => reponseItem.update.status === 400)
      .map(reponseItem => {
        console.log(util.inspect(reponseItem, {showHidden: false, depth: null}))
      })

    bulk = []
    await formattedGeneralPages
      .map(item => {
        console.log(item)
        let action = {update: {_index: 'talktofrank-beta-content', _type: '_doc', _id: `${item.id}`}}
        bulk.push(action, {doc: item, doc_as_upsert: true})
      })

    const pageResponse = await client.bulk({
      maxRetries: 5,
      index: config.elasticsearch.indices.page,
      body: bulk
    })

    console.log('General page indexed items: ', pageResponse.items.length)
    console.log('Errors: ', pageResponse.errors.length)

    pageResponse.items
      .filter(reponseItem => reponseItem.update.status === 400)
      .map(reponseItem => {
        console.log(util.inspect(reponseItem, {showHidden: false, depth: null}))
      })

    done()
  })
}

const addFormattedDrugText = (name, realName, drugItem) => {
  let formattedDrugItem = {
    id: drugItem.sys.id,
    name: name,
    synonyms: drugItem.fields.hasOwnProperty('synonyms') ? drugItem.fields.synonyms : '',
    slug: drugItem.fields.hasOwnProperty('slug') ? drugItem.fields.slug : null,
    addiction: drugItem.fields.hasOwnProperty('addiction') ? cleanText(drugItem.fields.addiction) : null,
    additional: drugItem.fields.hasOwnProperty('additional') ? cleanText(drugItem.fields.additional) : null,
    category: drugItem.fields.hasOwnProperty('category') ? cleanText(drugItem.fields.category) : 'None',
    description: drugItem.fields.hasOwnProperty('description') ? cleanText(drugItem.fields.description) : null,
    drugName: drugItem.fields.hasOwnProperty('drugName') ? cleanText(drugItem.fields.drugName) : null,
    durationDetail: drugItem.fields.hasOwnProperty('durationDetail') ? cleanText(drugItem.fields.durationDetail) : null,
    durationDetectable: drugItem.fields.hasOwnProperty('durationDetectable') ? cleanText(drugItem.fields.durationDetectable) : null,
    effectsBehaviour: drugItem.fields.hasOwnProperty('effectsBehaviour') ? cleanText(drugItem.fields.effectsBehaviour) : null,
    effectsFeeling: drugItem.fields.hasOwnProperty('effectsFeeling') ? cleanText(drugItem.fields.effectsFeeling) : null,
    mixingDangers: drugItem.fields.hasOwnProperty('mixingDangers') ? cleanText(drugItem.fields.mixingDangers) : null,
    qualitiesAdministered: drugItem.fields.hasOwnProperty('qualitiesAdministered') ? cleanText(drugItem.fields.qualitiesAdministered) : null,
    qualitiesAppearance: drugItem.fields.hasOwnProperty('qualitiesAppearance') ? cleanText(drugItem.fields.qualitiesAppearance) : null,
    qualitiesTaste: drugItem.fields.hasOwnProperty('qualitiesTaste') ? cleanText(drugItem.fields.qualitiesTaste) : null,
    risksCutWith: drugItem.fields.hasOwnProperty('risksCutWith') ? cleanText(drugItem.fields.risksCutWith) : null,
    risksHealthMental: drugItem.fields.hasOwnProperty('risksHealthMental') ? cleanText(drugItem.fields.risksHealthMental) : null,
    risksPhysicalHealth: drugItem.fields.hasOwnProperty('risksPhysicalHealth') ? cleanText(drugItem.fields.risksPhysicalHealth) : null,
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

const addFormattedDrugName = (name, realName, drugItem) => {
  let id = `${drugItem.sys.id}-${name}`
  let formattedDrugItem = {
    id: id.replace(' ', '-').toLowerCase(),
    name: name,
    realName: realName,
    category: drugItem.fields.hasOwnProperty('category') ? cleanText(drugItem.fields.category) : 'None',
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

const cleanText = (string) => string.replace(/<\/?[^>]+(>|$)/g, '')

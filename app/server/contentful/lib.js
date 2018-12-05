import { config } from 'config'

const contentful = require('contentful')

const contentfulClientConf = {
  space: config.contentful.contentSpace,
  accessToken: config.contentful.contentAccessToken,
  host: config.contentful.contentHost
}

if (config.contentful.environment && config.contentful.environment !== 'master') {
  console.log(`Using contentful environment: ${config.contentful.environment}`)
  contentfulClientConf.environment = config.contentful.environment
} else {
  console.log(`Using contentful environment: master`)
}

export default contentful.createClient(contentfulClientConf)

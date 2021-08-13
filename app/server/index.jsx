'use strict'
import express from 'express'
import basicAuth from 'express-basic-auth'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import { StaticRouter } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import { routes, ampRoutes } from '../shared/newRoutes'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { generateStore } from '../shared/store'
import * as path from 'path'
import { exists, shouldAuthenticate } from '../shared/utilities'
import { getLoadableState } from 'loadable-components/server'

/*
 * Express routes
 */
import apiRoutes from './api/v1/api.js'
import apiContactRoutes from './api/v1/contact.js'
import contentFulWebhookRoutes from './contentful/webhooks.js'

/*
 * Project configuration
 */
import { config } from 'config'
import packageInfo from '../../package.json'
import Html from '../shared/components/Html/component'
import PageNotFound from '../shared/components/PageNotFound/component'

import { buildSitemaps } from 'express-sitemap-xml'
import { format, parse } from 'date-fns'
import contentfulClient from './contentful/lib'

const Sentry = require('@sentry/node')
if (config.sentry.logErrors) {
  console.log(`Error logging enabled: Sentry DSN ${config.sentry.dsn}`)
  Sentry.init({
    dsn: config.sentry.dsn,
    beforeSend(event) {
      if (
        event.extra &&
        event.extra.Error &&
        event.extra.Error.status &&
        event.extra.Error.status === 404
      ) {
        // Dont send 404 errors
        return null
      }
      return event
    }
  })
}

/*
 * Elasticsearch config
 */
const AWS = require('aws-sdk')
const connectionClass = require('http-aws-es')
const { Client } = require('@elastic/elasticsearch')
const elasticSearchConf = {
  node: config.elasticsearch.host || `https://localhost:9200`,
  ssl: {
    rejectUnauthorized: false
  }
}

if (config.elasticsearch.amazonES && config.elasticsearch.amazonES.region) {
  elasticSearchConf.connection = connectionClass
  AWS.config.update({
    region: config.elasticsearch.amazonES.region
  })
}

if (
  config.elasticsearch.amazonES &&
  config.elasticsearch.amazonES.credentials
) {
  AWS.config.update({
    credentials: new AWS.Credentials(
      config.elasticsearch.amazonES.credentials.accessKeyId,
      config.elasticsearch.amazonES.credentials.secretAccessKey
    ),
    region: config.elasticsearch.amazonES.region
  })
}

if (
  config.elasticsearch.basicAuth &&
  config.elasticsearch.basicAuth.username
) {
  elasticSearchConf.auth = {
    username: config.elasticsearch.basicAuth.username,
    password: config.elasticsearch.basicAuth.password
  }  
}

const search = new Client(elasticSearchConf)

var store

const app = express()
const cacheBusterTS = Date.now()

const addSearch = (req, res, next) => {
  res.search = search
  return next()
}

// Add search middleware
app.use('/api/v1/search', addSearch)
app.use('/contentful/webhook', addSearch)
// app.use(cookieParser())
app.use('/api/v1', apiRoutes)
app.use('/contentful/webhook', contentFulWebhookRoutes)

app.use('/api/v1/contact', apiContactRoutes)

const options = {
  setHeaders: function(res, path, stat) {
    res.set('Service-Worker-Allowed', '/')
  }
}

app.use(express.static('../static', options))
app.use(favicon('../static/ui/favicon.ico'))

app.get('/robots.txt', (req, res) => {
  if (config.robotsDisallow) {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  } else {
    res.type('text/plain')
    res.send(
      `User-agent: *\nAllow: /\nSitemap: ${config.canonicalHost}/sitemap.xml`
    )
  }
})

app.get('/sitemap.xml', async (req, res, next) => {
  let entries = []

  try {
    entries = await contentfulClient.getEntries({
      'sys.contentType.sys.id[in]':
        'drug,generalPage,homepage,azPage,news,treatmentCentre',
      limit: 1000
    })
  } catch (err) {
    return next(err)
  }

  // manual entries
  let additions = [
    'https://www.talktofrank.com/',
    'https://www.talktofrank.com/news',
    'https://www.talktofrank.com/contact-frank',
    'https://www.talktofrank.com/get-help',
    'https://www.talktofrank.com/drugs-a-z',
    'https://www.talktofrank.com/drug/tranquillisers',
    'https://www.talktofrank.com/livechat'
  ]

  let blacklist = [
    'contact/success',
    'feedback/success',
    'young-people’s-health-agency-wandsworth',
    'north-yorkshire-horizons-harrogate',
    'needle-syringe-programme-rowland’s-pharmacy',
    'wolverhampton-360',
    'north-yorkshire-women’s-criminal-justice-service',
    'tranquillisers',
    'swanswell-young-persons-substance-misuse-service-and-young-person’s-families-1',
    'text-disclaimer',
    'pavilions-families-carer’s-service',
    'norcas-young-people’s-affected-others-service',
    'islington-young-people’s-drug-and-alcohol-service',
    'young-people’s-drug-and-alcohol-team',
    'barnardo’s-streetlevel'
  ]

  let urls = entries.items
    .filter(item => {
      if (
        item.fields.hasOwnProperty('addressStatus') &&
        item.fields.addressStatus === false
      ) {
        return false
      }

      if (blacklist.includes(item.fields.slug)) {
        return false
      }

      if (!item.fields.slug) {
        console.log('No slug for ' + item.fields.slug)
      }
      return item.fields.slug
    })
    .map(item => {
      let url
      switch (item.sys.contentType.sys.id) {
        case 'news':
          url = 'news/' + item.fields.slug
          break
        case 'drug':
          url = 'drug/' + item.fields.slug
          break
        case 'treatmentCentre':
          url = 'treatment-centre/' + item.fields.slug
          break
        default:
          url = item.fields.slug
      }
      return {
        url: url,
        lastMod: format(parse(item.sys.updatedAt), 'YYYY-MM-DD')
      }
    })

  urls = urls.concat(additions)

  try {
    let sitemaps = await buildSitemaps(urls, config.canonicalHost)
    res.set('application/xml').send(sitemaps['/sitemap.xml'])
  } catch (err) {
    return next(err)
  }
})
/*
 * Pass Express over to the App via the React Router
 */
app.get(/^([^.]+)$/, (req, res) => {
  const store = generateStore()
  const newRoutes = req.path.match(/\/amp\//) ? ampRoutes : routes

  const loadData = () => {
    const branches = matchRoutes(newRoutes, req.path)

    const matchedBranches = branches.filter(
      ({ newRoutes, match }) => match.isExact
    )

    if (matchedBranches.length === 0) {
      /*
        no matching route found e.g. 404

        note `matchRoutes` will not match the asyncPageNotFound route

        store.dispatch(receivePageError(404)) < NOPE - throw error so
        all 404s are caught in the catch block below throw new Error(404)
        */
      throw new Error(404)
    }

    const promises = matchedBranches
      .filter(({ route, match }) => {
        return route.loadData
      })
      .map(({ route, match }) => {
        return Promise.all(
          route
            .loadData({
              params: match.params,
              query: req.query,
              getState: store.getState
            })
            .map(item => store.dispatch(item))
        )
      })

    return Array.isArray(promises) && promises.length > 0
      ? Promise.all(promises)
      : null
  }

  ;(async () => {
    // @todo: refactor this - enforcing header here to verify whether this
    // fixes windows 7 chrome not rendering the site correctly
    res.type('text/html; charset=UTF-8')

    try {
      await loadData()
    } catch (err) {
      const state = store.getState()
      const props = {
        routes: null,
        initialState: state,
        cacheBusterTS: cacheBusterTS,
        pageLoadError: {
          error: 404,
          title: 'Page not found'
        }
      }
      res.status(404)
      res.write('<!DOCTYPE html>')
      return ReactDOMServer.renderToNodeStream(
        <Html {...props}>
          <PageNotFound />
        </Html>
      ).pipe(res)
    }

    try {
      const state = store.getState()
      const staticContext = {}
      const AppComponent = (
        <Provider store={store}>
          <StaticRouter location={req.path} context={staticContext}>
            {renderRoutes(newRoutes, {
              initialState: state,
              cacheBusterTS: cacheBusterTS
            })}
          </StaticRouter>
        </Provider>
      )

      res.write('<!DOCTYPE html>')

      getLoadableState(AppComponent).then(loadableState => {
        ReactDOMServer.renderToNodeStream(AppComponent).pipe(res)
      })
    } catch (err) {
      console.log(err)
      // need to render the NoMatch component here
      res
        .status(500)
        .send(
          '' +
            '<html>' +
            '<body><h2>Internal server error :(</h2></body>' +
            '</html>'
        )
    }
  })()
})

const port = process.env.PORT || 3000

var server = app.listen(port, () => {
  let host = server.address().address

  console.log('Compiled in ' + config.buildConfig + ' mode')
  console.log('NODE_ENV set to ' + process.env.NODE_ENV)
  console.log('BUILD_CONFIG set to ' + process.env.BUILD_CONFIG)

  console.log(packageInfo.name + ' app listening at http://%s:%s', host, port)
})

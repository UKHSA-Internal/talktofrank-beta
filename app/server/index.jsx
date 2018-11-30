'use strict'
import express from 'express'
import basicAuth from 'express-basic-auth'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import { StaticRouter } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import routes from '../shared/newRoutes'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { generateStore } from '../shared/store'
import * as path from 'path'
import { exists, shouldAuthenticate } from '../shared/utilities'
import { getLoadableState } from 'loadable-components/server'
// import cookie from 'react-cookie'
// import cookieParser from 'cookie-parser'

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

const Sentry = require('@sentry/node')
if (config.sentry.logErrors) {
  console.log(`Error logging enabled: Sentry DSN ${config.sentry.dsn}`)
  Sentry.init({ dsn: config.sentry.dsn })
}

/*
 * Elasticsearch config
*/
const AWS = require('aws-sdk')
const connectionClass = require('http-aws-es')
const elasticsearch = require('elasticsearch')
const elasticSearchConf = {
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

const search = new elasticsearch.Client(elasticSearchConf)

/*
 * Authentication
*/
const basicAuthHandler = (username, password) => {
  return username === config.basicAuth.username && password === config.basicAuth.password
}
const basicAuthMiddleware = basicAuth({ authorizer: basicAuthHandler, challenge: true })

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
  setHeaders: function (res, path, stat) {
    res.set('Service-Worker-Allowed', '/')
  }
}

app.use(express.static('../static', options))
app.use(favicon('../static/ui/favicon.ico'))

app.get('/robots.txt', function (req, res) {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /')
})

/*
 * Pass Express over to the App via the React Router
 */
app.get('*', (req, res) => {
  const store = generateStore()
  //  cookie.plugToRequest(req, res)
  const loadData = () => {
    const branches = matchRoutes(routes, req.path)
    const promises = branches
      .filter(({ route, match }) => { return match.isExact && route.loadData })
      .map(({ route, match }) => {
        return Promise.all(
          route
            .loadData({ params: match.params, query: req.query, getState: store.getState })
            .map(item => store.dispatch(item))
        )
      })
    return Array.isArray(promises) && promises.length > 0 ? Promise.all(promises) : null
  }

  (async () => {
    // @todo: refactor this - enforcing header here to verify whether this
    // fixes windows 7 chrome not rendering the site correctly
    res.type('text/html; charset=UTF-8')

    try {
      await loadData()
    } catch (err) {
      const state = store.getState()
      state.app.pageData.head = { title: 'Page not found' }
      state.app.pageData.error = 404
      const props = {
        routes: null,
        initialState: state,
        cacheBusterTS: cacheBusterTS
      }
      res.write('<!DOCTYPE html>')
      return ReactDOMServer
        .renderToNodeStream(<Html {...props}><PageNotFound/></Html>)
        .pipe(res)
    }

    try {
      const state = store.getState()
      const staticContext = {}
      console.log(`${Date.now()} - ${req.path}`)
      if (state.app.pageData.error) {
        console.log(`${Date.now()}`)
        console.log(state)
      }
      const AppComponent = (
        <Provider store={store}>
          <StaticRouter location={req.path} context={staticContext}>
            {renderRoutes(routes, {
              initialState: state,
              cacheBusterTS: cacheBusterTS
            })}
          </StaticRouter>
        </Provider>
      )

      res.write('<!DOCTYPE html>')

      getLoadableState(AppComponent).then(loadableState => {
        ReactDOMServer
          .renderToNodeStream(AppComponent)
          .pipe(res)
      })
    } catch (err) {
      console.log(err)
      // need to render the NoMatch component here
      res.status(500).send('' +
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

import { hydrate } from 'react-dom'
import React from 'react'
import loadable from 'loadable-components'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { app } from '../shared/reducers'
import thunkMiddleware from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'
import routes from '../shared/newRoutes.jsx'

import { Switch, Route } from 'react-router'

// @todo - this is not lazyloaded
import PageNotFound from '../shared/components/PageNotFound/component.jsx'

console.log('Here', navigator)

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  console.log('Loaded ', navigator)
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ui/js/service-worker.js')
  });
}

const rootReducer = combineReducers({
  app
})
let store = createStore(
  rootReducer,
  window.$REDUX_STATE,
  applyMiddleware(
    thunkMiddleware
  )
)

const history = createHistory()
const state = store.getState()
const appRoot = document.getElementById('app')

if (state.app.error) {
  switch (state.app.error) {
    case 404:
      hydrate(<PageNotFound />, appRoot)
      break
  }
} else {
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes[0].routes)}
      </ConnectedRouter>
    </Provider>, appRoot)
}

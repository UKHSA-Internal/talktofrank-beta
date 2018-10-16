import loadable from 'loadable-components'
import React from 'react'

import { fetchPage, fetchDrugList, fetchSearchTerm, receivePageError } from './actions'

/**
 * These will be bundled in the main JS file (including client)
 */
import HTMLWrapper from './components/HTMLWrapper/component.jsx'

/**
 * These will be lazy-loaded on the client
 */
/* eslint-disable */
const asyncPageNotFound = loadable(() => import(/*webpackChunkName: 'homepage'*/'./components/PageNotFound/component.jsx'))
const asyncHome = loadable(() => import(/*webpackChunkName: 'homepage'*/'./containers/HomepageContainer/component.jsx'))
const asyncPage = loadable(() => import(/*webpackChunkName: 'drug'*/'./containers/PageContainer/component.jsx'))
const asyncStaticPage = loadable(() => import(/*webpackChunkName: 'static-page'*/'./containers/PageStaticContainer/component.jsx'))
const asyncSearchPage = loadable(() => import(/*webpackChunkName: 'search'*/'./containers/SearchPageContainer/component.jsx'))
const asyncSearchResultsPage = loadable(() => import(/*webpackChunkName: 'search-results'*/'./containers/SearchResultsContainer/component.jsx'))
const asyncDrugsAZContainer = loadable(() => import(/*webpackChunkName: 'drugs-az'*/'./containers/PageDrugsAZContainer/component.jsx'))
/* eslint-enable */

export default [{
  component: HTMLWrapper,
  routes: [
    {
      path: '/',
      exact: true,
      component: asyncHome
    },
    {
      path: '/drugs-a-z',
      exact: true,
      component: asyncDrugsAZContainer,
      loadData: () => {
        return fetchDrugList()
      }
    },
    {
      path: '/drug/:drugName',
      exact: true,
      component: asyncPage,
      loadData: ({drugName}) => {
        return fetchPage(drugName, 'drugs')
      }
    },
    {
      path: '/search',
      exact: true,
      component: asyncSearchPage
    },
    {
      path: '/search/:term',
      exact: true,
      component: asyncSearchPage,
      loadData: ({search}) => {
        return getSearchPage(search)
      }
    },
    {
      component: asyncPageNotFound
    }
  ]
}]

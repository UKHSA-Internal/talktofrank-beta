import loadable from 'loadable-components'
import React from 'react'

import {
  fetchPage,
  fetchDrugList,
  fetchNewsList,
  fetchSearchTerm,
  receivePageError
} from './actions'

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
const asyncPageDrug = loadable(() => import(/*webpackChunkName: 'drug'*/'./containers/PageDrugContainer/component.jsx'))
const asyncPageGeneral = loadable(() => import(/*webpackChunkName: 'page'*/'./containers/PageGeneralContainer/component.jsx'))
const asyncStaticPage = loadable(() => import(/*webpackChunkName: 'static-page'*/'./containers/PageStaticContainer/component.jsx'))
const asyncPageSearch = loadable(() => import(/*webpackChunkName: 'search'*/'./containers/PageSearchContainer/component.jsx'))
const asyncPageDrugsAZContainer = loadable(() => import(/*webpackChunkName: 'drugs-az'*/'./containers/PageDrugsAZContainer/component.jsx'))
const asyncPageNewsListContainer = loadable(() => import(/*webpackChunkName: 'news-list'*/'./containers/PageNewsListContainer/component.jsx'))
const asyncPageNewsContainer = loadable(() => import(/*webpackChunkName: 'news'*/'./containers/PageNewsContainer/component.jsx'))
const asyncContactPage = loadable(() => import(/*webpackChunkName: 'contact-page'*/'./components/PageContact/component.jsx'))
const asyncPageSupportFormContainer = loadable(() => import(/*webpackChunkName: 'support-centre-form-page'*/'./components/PageSupportForm/component.jsx')) // need to swap this out with an actual container
const asyncPageSupportListContainer = loadable(() => import(/*webpackChunkName: 'support-centre-list'*/'./components/PageSupportList/component.jsx')) // need to swap this out with an actual container
const asyncPageSupportContainer = loadable(() => import(/*webpackChunkName: 'support-centre-page'*/'./components/PageSupport/component.jsx')) // need to swap this out with an actual container
/* eslint-enable */

export default [{
  component: HTMLWrapper,
  routes: [
    {
      path: '/',
      exact: true,
      component: asyncHome,
      loadData: () => fetchPage('homepage')
    },
    {
      path: '/drugs-a-z',
      exact: true,
      component: asyncPageDrugsAZContainer,
      loadData: () => fetchDrugList()
    },
    {
      path: '/drug/:drugName',
      exact: true,
      component: asyncPageDrug,
      loadData: ({drugName}) => fetchPage(drugName, 'drug')
    },
    {
      path: '/search',
      exact: true,
      component: asyncPageSearch
    },
    {
      path: '/search/:term',
      exact: true,
      component: asyncPageSearch,
      loadData: ({term}) => fetchSearchTerm(term)
    },
    {
      path: '/latest',
      exact: true,
      component: asyncPageNewsListContainer,
      loadData: () => fetchNewsList()
    },
    {
      path: '/latest/:number',
      exact: true,
      component: asyncPageNewsListContainer,
      loadData: ({number}) => fetchNewsList(number - 1)
    },
    {
      path: '/support-near-you',
      exact: true,
      component: asyncPageSupportFormContainer
    },
    {
      path: '/treatment-centre',
      exact: true,
      component: asyncPageSupportListContainer
    },
    {
      path: '/treatment-centre/:slug',
      exact: true,
      component: asyncPageSupportContainer
      // loadData: ({number}) => fetchSupportCentreList(number - 1) // for when the centres are wired up

    },
    {
      path: '/news/:slug',
      exact: true,
      component: asyncPageNewsContainer,
      loadData: ({slug}) => fetchPage(slug, 'news')
    },
    {
      path: '/contact-frank',
      exact: true,
      component: asyncContactPage
      //  ,loadData: ({slug, slug1}) => fetchPage([slug, slug1].join('/'))
    },
    {
      path: '/:slug',
      exact: true,
      component: asyncPageGeneral,
      loadData: ({slug}) => fetchPage(slug)
    },
    {
      path: '/:slug/:slug1',
      exact: true,
      component: asyncPageGeneral,
      loadData: ({slug, slug1}) => fetchPage([slug, slug1].join('/'))
    },
    {
      path: '/:slug/:slug1/:slug2',
      exact: true,
      component: asyncPageGeneral,
      loadData: ({slug, slug1, slug2}) => (
        fetchPage([slug, slug1, slug2].join('/'))
      )
    },
    {
      component: asyncPageNotFound
    }
  ]
}]

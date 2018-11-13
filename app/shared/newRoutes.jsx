import loadable from 'loadable-components'
import React from 'react'

import {
  fetchPage,
  fetchDrugList,
  fetchNewsList,
  fetchSearchTerm,
  fetchSupportList,
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
const asyncPageNotFound = loadable(() => import(/*webpackChunkName: 'pagenotfound'*/'./components/PageNotFound/component.jsx'))
const asyncHome = loadable(() => import(/*webpackChunkName: 'homepage'*/'./containers/HomepageContainer/component.jsx'))
const asyncPageDrug = loadable(() => import(/*webpackChunkName: 'drug'*/'./containers/PageDrugContainer/component.jsx'))
const asyncPageGeneral = loadable(() => import(/*webpackChunkName: 'page'*/'./containers/PageGeneralContainer/component.jsx'))
const asyncStaticPage = loadable(() => import(/*webpackChunkName: 'static-page'*/'./containers/PageStaticContainer/component.jsx'))
const asyncPageSearch = loadable(() => import(/*webpackChunkName: 'search'*/'./containers/PageSearchContainer/component.jsx'))
const asyncPageDrugsAZContainer = loadable(() => import(/*webpackChunkName: 'drugs-az'*/'./containers/PageDrugsAZContainer/component.jsx'))
const asyncPageNewsListContainer = loadable(() => import(/*webpackChunkName: 'news-list'*/'./containers/PageNewsListContainer/component.jsx'))
const asyncPageNewsContainer = loadable(() => import(/*webpackChunkName: 'news'*/'./containers/PageNewsContainer/component.jsx'))
const asyncPageContactForm = loadable(() => import(/*webpackChunkName: 'contact-form'*/'./containers/PageContactFormContainer/component.jsx'))
const asyncPageFeedbackForm = loadable(() => import(/*webpackChunkName: 'feedback-form'*/'./containers/PageFeedbackFormContainer/component.jsx'))
const asyncContactPage = loadable(() => import(/*webpackChunkName: 'contact-page'*/'./components/PageContact/component.jsx'))
const asyncPageSupportFormContainer = loadable(() => import(/*webpackChunkName: 'support-centre-form-page'*/'./components/PageSupportForm/component.jsx')) // need to swap this out with an actual container
const asyncContactFormPage = loadable(() => import(/*webpackChunkName: 'contact-form-page'*/'./components/PageContactForm/component.jsx'))
const asyncGetHelpListContainer = loadable(() => import(/*webpackChunkName: 'get-help-list'*/'./containers/PageGetHelpListContainer/component.jsx'))
const asyncGetHelpPageContainer = loadable(() => import(/*webpackChunkName: 'get-help-page'*/'./containers/PageGetHelpPageContainer/component.jsx'))
const asyncPageSupportListContainer = loadable(() => import(/*webpackChunkName: 'support-centre-list'*/'./components/PageSupportList/component.jsx')) // need to swap this out with an actual container
const asyncPageSupportContainer = loadable(() => import(/*webpackChunkName: 'support-centre'*/'./components/PageSupport/component.jsx')) // need to swap this out with an actual container
const asyncPageContactSuccessContainer = loadable(() => import(/*webpackChunkName: 'support-centre'*/'./containers/PageContactSuccessContainer/component.jsx')) // need to swap this out with an actual container
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
      loadData: ({params}) => fetchPage(params.drugName, 'drugs')
    },
    {
      path: '/contact',
      exact: true,
      component: asyncPageContactForm,
      loadData: () => fetchPage('contact')
    },
    {
      path: '/feedback',
      exact: true,
      component: asyncPageFeedbackForm,
      loadData: () => fetchPage('feedback')
    },
    {
      path: '/feedback/success',
      exact: true,
      component: asyncPageContactSuccessContainer,
      loadData: () => fetchPage('feedback/success')
    },
    {
      path: '/contact/success',
      exact: true,
      component: asyncPageContactSuccessContainer,
      loadData: () => fetchPage('contact/success')
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
      loadData: ({params}) => fetchSearchTerm(params.term)
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
      loadData: ({params}) => fetchNewsList(params.number - 1)
    },
    {
      path: '/news/:slug',
      exact: true,
      component: asyncPageNewsContainer,
      loadData: ({params}) => fetchPage(params.slug, 'news')
    },
    {
      path: '/support-near-you',
      exact: true,
      component: asyncPageSupportFormContainer
    },
    {
      path: '/treatment-centre',
      exact: true,
      component: asyncPageSupportListContainer,
      loadData: ({params, query}) => fetchSupportList(0, query)
    },
    {
      path: '/treatment-centre/:slug',
      exact: true,
      component: asyncPageSupportContainer,
      loadData: ({params}) => fetchPage(params.slug, 'treatment-centres')
    },
    {
      path: '/news/:slug',
      exact: true,
      component: asyncPageNewsContainer,
      loadData: ({params}) => fetchPage(params.slug, 'news')
    },
    {
      path: '/contact-frank',
      exact: true,
      component: asyncContactPage
    },
    {
<<<<<<< HEAD
      path: '/contact',
      exact: true,
      component: asyncContactFormPage
    },
    {
      path: '/get-help',
      exact: true,
      component: asyncGetHelpListContainer
    },
    {
      path: '/get-help/:slug',
      exact: true,
      component: asyncGetHelpPageContainer,
      loadData: ({params}) => fetchPage(['get-help', params.slug].join('/'))
    },
    {
=======
>>>>>>> develop
      path: '/:slug',
      exact: true,
      component: asyncPageGeneral,
      loadData: ({params}) => fetchPage(params.slug)
    },
    {
      path: '/:slug/:slug1',
      exact: true,
      component: asyncPageGeneral,
      loadData: ({params}) => fetchPage([params.slug, params.slug1].join('/'))
    },
    {
      path: '/:slug/:slug1/:slug2',
      exact: true,
      component: asyncPageGeneral,
      loadData: ({params}) => (
        fetchPage([params.slug, params.slug1, params.slug2].join('/'))
      )
    },
    {
      component: asyncPageNotFound
    }
  ]
}]

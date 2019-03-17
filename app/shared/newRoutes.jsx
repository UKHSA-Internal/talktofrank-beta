import loadable from 'loadable-components'
import React from 'react'

import {
  fetchPage,
  fetchDrugList,
  fetchNewsList,
  fetchSearchTerm,
  fetchSupportList,
  fetchFeaturedBlock,
  fetchSiteSettings
} from './actions'

/**
 * These will be bundled in the main JS file (including client)
 */
import HTMLWrapper from './components/HTMLWrapper/component.jsx'
import AmpHTMLWrapper from './components/AmpHTMLWrapper/component.jsx'

/**
 * These will be lazy-loaded on the client
 */
/* eslint-disable */
const asyncHome = loadable(() => import(/*webpackChunkName: 'homepage'*/'./containers/HomepageContainer/component.jsx'))
const asyncPageDrug = loadable(() => import(/*webpackChunkName: 'drug'*/'./containers/PageDrugContainer/component.jsx'))
const asyncPageGeneral = loadable(() => import(/*webpackChunkName: 'page'*/'./containers/PageGeneralContainer/component.jsx'))
const asyncPageSearch = loadable(() => import(/*webpackChunkName: 'search'*/'./containers/PageSearchContainer/component.jsx'))
const asyncPageDrugsAZContainer = loadable(() => import(/*webpackChunkName: 'drugs-az'*/'./containers/PageDrugsAZContainer/component.jsx'))
const asyncPageNewsListContainer = loadable(() => import(/*webpackChunkName: 'news-list'*/'./containers/PageNewsListContainer/component.jsx'))
const asyncPageNewsContainer = loadable(() => import(/*webpackChunkName: 'news'*/'./containers/PageNewsContainer/component.jsx'))
const ampPageNewsContainer = loadable(() => import(/*webpackChunkName: 'news'*/'./containers/AmpPageNewsContainer/component.jsx'))
const asyncPageContactForm = loadable(() => import(/*webpackChunkName: 'contact-form'*/'./containers/PageContactFormContainer/component.jsx'))
const asyncPageFeedbackForm = loadable(() => import(/*webpackChunkName: 'feedback-form'*/'./containers/PageFeedbackFormContainer/component.jsx'))
const asyncGetHelpListContainer = loadable(() => import(/*webpackChunkName: 'get-help-list'*/'./containers/PageGetHelpListContainer/component.jsx'))
const asyncGetHelpPageContainer = loadable(() => import(/*webpackChunkName: 'get-help-page'*/'./containers/PageGetHelpPageContainer/component.jsx'))
const asyncPageSupportListContainer = loadable(() => import(/*webpackChunkName: 'support-centre-list'*/'./containers/PageSupportListContainer/component.jsx'))
const asyncPageSupportContainer = loadable(() => import(/*webpackChunkName: 'support-centre'*/'./containers/PageSupportContainer/component.jsx'))
const asyncPageContactSuccessContainer = loadable(() => import(/*webpackChunkName: 'support-centre'*/'./containers/PageContactSuccessContainer/component.jsx'))
const asyncPageLiveChat = loadable(() => import(/*webpackChunkName: 'live-chat'*/'./containers/PageLiveChatContainer/component.jsx'))
const asyncContactFormPage = loadable(() => import(/*webpackChunkName: 'contact-form-page'*/'./containers/PageContactFormPageContainer/component.jsx'))
const asyncPageSupportFormContainer = loadable(() => import(/*webpackChunkName: 'support-centre-form-page'*/'./containers/PageSupportFormContainer/component.jsx'))
const asyncPageNotFound = loadable(() => import(/*webpackChunkName: 'pagenotfound'*/'./containers/PageNotFoundContainer/component.jsx'))
const asyncContactPage = loadable(() => import(/*webpackChunkName: 'contact-page'*/'./containers/PageContactContainer/component.jsx'))
const asyncPageOffline = loadable(() => import(/*webpackChunkName: 'pageoffline'*/'./components/PageOffline/component.jsx'))

/* eslint-enable */

const routes = [{
  component: HTMLWrapper,
  routes: [
    {
      path: '/',
      exact: true,
      component: asyncHome,
      loadData: () => [
        fetchPage('homepage'),
        fetchSiteSettings()
      ]
    },
    {
      path: '/drugs-a-z',
      exact: true,
      component: asyncPageDrugsAZContainer,
      loadData: () => [
        fetchDrugList(),
        fetchSiteSettings()
      ]
    },
    {
      path: '/drug/:drugName',
      exact: true,
      component: asyncPageDrug,
      loadData: ({params}) => [
        fetchPage(params.drugName, 'drugs'),
        fetchFeaturedBlock('featuredNewsBlock'),
        fetchSiteSettings()
      ]
    },
    {
      path: '/livechat',
      exact: true,
      component: asyncPageLiveChat,
      loadData: () => [
        fetchSiteSettings()
      ]
    },
    {
      path: '/contact',
      exact: true,
      component: asyncPageContactForm,
      loadData: () => [
        fetchPage('contact'),
        fetchSiteSettings()
      ]
    },
    {
      path: '/feedback',
      exact: true,
      component: asyncPageFeedbackForm,
      loadData: () => [
        fetchPage('feedback'),
        fetchSiteSettings()
      ]
    },
    {
      path: '/feedback/success',
      exact: true,
      component: asyncPageContactSuccessContainer,
      loadData: () => [
        fetchPage('feedback/success')
      ]
    },
    {
      path: '/contact/success',
      exact: true,
      component: asyncPageContactSuccessContainer,
      loadData: () => [
        fetchPage('contact/success')
      ]
    },
    {
      path: '/search',
      exact: true,
      component: asyncPageSearch,
      loadData: () => [
        fetchSiteSettings()
      ]
    },
    {
      path: '/search/:term',
      exact: true,
      component: asyncPageSearch,
      loadData: ({params}) => [
        fetchSearchTerm(params.term, 0),
        fetchSiteSettings()
      ]
    },
    {
      path: '/search/:term/:number(\\d+)',
      exact: true,
      component: asyncPageSearch,
      loadData: ({params}) => [
        fetchSearchTerm(params.term, params.number - 1),
        fetchSiteSettings()
      ]
    },
    {
      path: '/news',
      exact: true,
      component: asyncPageNewsListContainer,
      loadData: () => [
        fetchNewsList(),
        fetchSiteSettings()
      ]
    },
    {
      path: '/news/:number(\\d+)',
      exact: true,
      component: asyncPageNewsListContainer,
      loadData: ({params}) => [
        fetchNewsList(params.number - 1),
        fetchSiteSettings()
      ]
    },
    {
      path: '/news/:slug',
      exact: true,
      component: asyncPageNewsContainer,
      loadData: ({params}) => [
        fetchPage(params.slug, 'news'),
        fetchFeaturedBlock('featuredNewsBlock'),
        fetchSiteSettings()
      ]
    },
    {
      path: '/get-help/find-support-near-you',
      exact: true,
      component: asyncPageSupportFormContainer,
      loadData: () => [
        fetchSiteSettings()
      ]
    },
    {
      path: '/treatment-centre',
      exact: true,
      component: asyncPageSupportListContainer,
      loadData: ({params, query}) => [
        fetchSupportList(0, query),
        fetchSiteSettings()
      ]
    },
    {
      path: '/treatment-centre/:number(\\d+)',
      exact: true,
      component: asyncPageSupportListContainer,
      loadData: ({params, query}) => [
        fetchSupportList(params.number - 1, query),
        fetchSiteSettings()
      ]
    },
    {
      path: '/treatment-centre/:slug',
      exact: true,
      component: asyncPageSupportContainer,
      loadData: ({params, query}) => [
        fetchPage(params.slug, 'treatment-centres', query),
        fetchSiteSettings()
      ]
    },
    {
      path: '/news/:slug',
      exact: true,
      component: asyncPageNewsContainer,
      loadData: ({params}) => [
        fetchPage(params.slug, 'news'),
        fetchSiteSettings()
      ]
    },
    {
      path: '/contact-frank',
      exact: true,
      component: asyncContactPage,
      loadData: () => [
        fetchSiteSettings()
      ]
    },
    {
      path: '/contact',
      exact: true,
      component: asyncContactFormPage,
      loadData: () => [
        fetchSiteSettings()
      ]
    },
    {
      path: '/get-help',
      exact: true,
      component: asyncGetHelpListContainer,
      loadData: () => [
        fetchSiteSettings()
      ]
    },
    {
      path: '/get-help/:slug',
      exact: true,
      component: asyncGetHelpPageContainer,
      loadData: ({params}) => [
        fetchPage(['get-help', params.slug].join('/')),
        fetchSiteSettings()
      ]
    },
    {
      path: '/offline',
      exact: true,
      component: asyncPageOffline
    },
    {
      path: '/:slug',
      exact: true,
      component: asyncPageGeneral,
      loadData: ({params}) => [
        fetchPage(params.slug),
        fetchSiteSettings()
      ]
    },
    {
      path: '/:slug/:slug1',
      exact: true,
      component: asyncPageGeneral,
      loadData: ({params}) => [
        fetchPage([params.slug, params.slug1].join('/')),
        fetchSiteSettings()
      ]
    },
    {
      path: '/:slug/:slug1/:slug2',
      exact: true,
      component: asyncPageGeneral,
      loadData: ({params}) => [
        fetchPage([params.slug, params.slug1, params.slug2].join('/')),
        fetchSiteSettings()
      ]
    },
    {
      component: asyncPageNotFound,
      loadData: () => [
        fetchSiteSettings()
      ]
    }
  ]
}]

const ampRoutes = [{
  component: AmpHTMLWrapper,
  routes: [
    {
      path: '/amp/news/:slug',
      exact: true,
      component: ampPageNewsContainer,
      loadData: ({params}) => [
        fetchPage(params.slug, 'news'),
        fetchFeaturedBlock('featuredNewsBlock'),
        fetchSiteSettings()
      ]
    }
  ]
}]

export { routes, ampRoutes }

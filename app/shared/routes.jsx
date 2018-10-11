import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { fetchPage, fetchDrugList, fetchSearchTerm, receivePageError } from './actions'
import PageNoMatchContainer from './containers/PageNoMatchContainer/component'
import PageServerError from './components/PageServerError/component'
import PageContainer from './containers/PageContainer/component'
import PageStaticContainer from './containers/PageStaticContainer/component'
import SearchPageContainer from './containers/SearchPageContainer/component'
import SearchResultsContainer from './containers/SearchResultsContainer/component'
import TypographyContainer from './containers/TypographyContainer/component' // @todo @refactor @joel - remove this in due time - replace with generic static page handler
import PageDrugsAZContainer from './containers/PageDrugsAZContainer/component'
import HomepageContainer from './containers/HomepageContainer/component'

import { config } from 'config'

/*
 * Render 404 / 500 errors
 */

let getRoutes = store => {
  function withFallback (WrappedComponent, selectData) {
    return class extends React.Component {
      render () {
        let state = store.getState()
        switch (state.app.error) {
          case 500:
            return <PageServerError />
          case 404:
            return <PageNoMatchContainer />
          default:
            return <WrappedComponent {...this.props} />
        }
      }
    }
  }

  function getPage (nextState, replace, callback) {
    const slug = this.slug
    store.dispatch(fetchPage(slug))
      .then(() => {
        callback()
      }).catch(err => {
        console.log(err)
        // error pushed to state
        callback()
      })
  }

  function getDrug (nextState, replace, callback) {
    const slug = nextState.params.drugName
    store.dispatch(fetchPage(slug, 'drugs'))
      .then(() => {
        callback()
      }).catch(err => {
        console.log(err)
        // error pushed to state
        callback()
      })
  }

  function getSearchPage (nextState, replace, callback) {
    const term = nextState.params.term
    store.dispatch(fetchSearchTerm(term, '', 'should'))
      .then(() => {
        callback()
      }).catch(err => {
        console.log(err)
        // error pushed to state
        callback()
      })
  }

  function getDrugList (nextState, replace, callback) {
    store.dispatch(fetchDrugList())
      .then(() => {
        callback()
      }).catch(err => {
        console.log(err)
        // error pushed to state
        callback()
      })
  }

  function noMatchError (nextState, replace, callback) {
    store.dispatch(receivePageError(404))
    callback()
  }

  return (
    <Route path='/'>
      <IndexRoute component={withFallback(HomepageContainer)} onEnter={getPage} slug='homepage'/>
      <Route path='typography' component={withFallback(TypographyContainer)} onEnter={getPage} slug='typography' />
      <Route path='drugs-a-z' component={withFallback(PageDrugsAZContainer)} onEnter={getDrugList} />
      <Route path='drug'>
        <IndexRoute component={withFallback(PageDrugsAZContainer)} onEnter={getDrugList} />
        <Route path='search' component={withFallback(SearchPageContainer)} />
        <Route path='search/:term' component={withFallback(SearchPageContainer)} onEnter={getSearchPage} />
        <Route path=':drugName' component={withFallback(PageContainer)} onEnter={getDrug} />
      </Route>
      <Route path='*' component={withFallback(PageNoMatchContainer)} onEnter={getPage} slug='no-match' />
    </Route>
  )
}

export { getRoutes }

'use strict'

import axios from 'axios'
import { getApiHost } from './utilities'
import { config } from 'config'

export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'
export const RECEIVE_PAGE_ERROR = 'RECEIVE_PAGE_ERROR'
export const RECEIVE_FORM_ERROR = 'RECEIVE_FORM_ERROR'

const BAD_REQUEST = 400

const PAGE_SIZE = 10

let apiHost = getApiHost()

function requestPage () {
  return {
    type: REQUEST_PAGE
  }
}

export function receivePageError (status) {
  return {
    type: RECEIVE_PAGE_ERROR,
    error: status
  }
}

export function receiveFormError (status, errors) {
  return {
    type: RECEIVE_FORM_ERROR,
    status: status,
    errors: errors
  }
}

function receivePage (pageData) {
  return {
    type: RECEIVE_PAGE,
    pageData
  }
}

export function fetchSearchTerm (term, page = 0) {
  const queryString = '?page=' + page + '&pageSize=' + PAGE_SIZE

  return dispatch => {
    dispatch(requestPage())
    let lookupUrl = apiHost + `/api/v1/search/page/${term}` + queryString
    return axios.get(lookupUrl)
      .then(res => {
        dispatch(receivePage(res.data))
      })
      .catch(err => {
        let status = err.code === 'ETIMEDOUT' ? 500 : err.response.status
        dispatch(receivePageError(status))
        return Promise.reject(err)
      })
  }
}

export function submitFeedbackForm() {
  return dispatch => {
    dispatch(requestPage())
    let lookupUrl = apiHost + '/api/v1/contact/sendFeedback'
    return axios.post(lookupUrl)
      .then(res => {
        dispatch(receivePage(res.data))
        return Promise.resolve(null)
      })
      .catch(err => {
        if ( err.response.status === BAD_REQUEST ) {
          dispatch(receiveFormError(err.response.status, err.response.data))
        }
        else {
          let status = err.code === 'ETIMEDOUT' ? 500 : err.response.status
          dispatch(receivePageError(status))
        }

        return Promise.reject(err)
      })
  }
}

export function fetchDrugList () {
  return dispatch => {
    dispatch(requestPage())
    let lookupUrl = apiHost + '/api/v1/drugs'
    return axios.get(lookupUrl)
      .then(res => {
        dispatch(receivePage(res.data))
        return Promise.resolve(null)
      })
      .catch(err => {
        let status = err.code === 'ETIMEDOUT' ? 500 : err.response.status
        dispatch(receivePageError(status))
        return Promise.reject(err)
      })
  }
}

export function fetchNewsList (page = 0) {
  const queryString = '?page=' + page + '&pageSize=' + PAGE_SIZE
  return dispatch => {
    dispatch(requestPage())
    let lookupUrl = apiHost + '/api/v1/news' + queryString
    return axios.get(lookupUrl)
      .then(res => {
        dispatch(receivePage(res.data))
        return Promise.resolve(null)
      })
      .catch(err => {
        let status = err.code === 'ETIMEDOUT' ? 500 : err.response.status
        dispatch(receivePageError(status))
        return Promise.reject(err)
      })
  }
}

export function fetchPage (slug, type = 'pages') {
  return dispatch => {
    dispatch(requestPage())
    let lookupUrl = apiHost + '/api/v1/' + type + '/' + encodeURIComponent(slug)
    return axios.get(lookupUrl)
      .then(res => {
        dispatch(receivePage(res.data))
      })
      .catch(err => {
        let status = err.code === 'ETIMEDOUT' ? 500 : err.response.status
        dispatch(receivePageError(status))
        return Promise.reject(err)
      })
  }
}

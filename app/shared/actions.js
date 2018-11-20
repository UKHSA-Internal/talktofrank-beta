'use strict'

import axios from 'axios'
import { getApiHost } from './utilities'
import { config } from 'config'

export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'
export const RECEIVE_PAGE_ERROR = 'RECEIVE_PAGE_ERROR'

export const FORM_REQUEST = 'FORM_REQUEST'
export const FORM_REQUEST_SUCCESS = 'FORM_REQUEST_SUCCESS'
export const FORM_REQUEST_ERROR = 'FORM_REQUEST_ERROR'

export const REQUEST_FEATURED_BLOCK = 'REQUEST_FEATURED_BLOCK'
export const RECEIVE_FEATURED_BLOCK = 'RECEIVE_FEATURED_BLOCK'
export const RECEIVE_FEATURED_BLOCK_ERROR = 'RECEIVE_FEATURED_BLOCK_ERROR'
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

function receivePage (pageData) {
  return {
    type: RECEIVE_PAGE,
    pageData
  }
}

export function formRequest (status) {
  return {
    type: FORM_REQUEST
  }
}

export function formRequestSuccess (status, errors) {
  return {
    type: FORM_REQUEST_SUCCESS
  }
}

export function formRequestError (status, errors) {
  return {
    type: FORM_REQUEST_ERROR,
    status: status,
    errors: errors
  }
}

function requestFeaturedBlock () {
  return {
    type: REQUEST_FEATURED_BLOCK
  }
}

export function receiveFeaturedBlockError (status) {
  return {
    type: RECEIVE_FEATURED_BLOCK_ERROR,
    error: status
  }
}

function receiveFeaturedBlock (featuredBlockData) {
  return {
    type: RECEIVE_FEATURED_BLOCK,
    featuredBlockData
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

export function submitForm(data, form) {
  return dispatch => {
    dispatch(formRequest())
    let lookupUrl = apiHost + '/api/v1/contact/' + form
    return axios.post(lookupUrl, data)
      .then(res => {
        dispatch(formRequestSuccess(res.data))
        return Promise.resolve(null)
      })
      .catch(err => {
        if (err.response.status === BAD_REQUEST) {
          dispatch(formRequestError(err.response.status, err.response.data))
        } else {
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

export function fetchSupportList (page = 0, {location, serviceType}) {
  let queryString = '?page=' + page + '&pageSize=' + PAGE_SIZE

  if (location) {
    queryString += `&location=${encodeURIComponent(location)}`
  }

  if (serviceType) {
    queryString += `&serviceType=${encodeURIComponent(serviceType)}`
  }

  return dispatch => {
    dispatch(requestPage())
    let lookupUrl = apiHost + '/api/v1/treatment-centres' + queryString
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

export function fetchPage (slug, type = 'entries') {
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

export function fetchFeaturedBlock (blockId) {
  return dispatch => {
    dispatch(requestFeaturedBlock())
    let lookupUrl = apiHost + '/api/v1/entries/' + encodeURIComponent(blockId)
    return axios.get(lookupUrl)
      .then(res => {
        dispatch(receiveFeaturedBlock(res.data))
      })
      .catch(err => {
        let status = err.code === 'ETIMEDOUT' ? 500 : err.response.status
        dispatch(receiveFeaturedBlockError(status))
        return Promise.reject(err)
      })
  }
}

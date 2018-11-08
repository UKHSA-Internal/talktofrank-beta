import * as actions from './actions'

const initialState = {
  pageData: {},
  loading: false,
  error: false
}

export function app (state = initialState, action) {
  switch (action.type) {
    case actions.RECEIVE_FORM_ERROR:
      return Object.assign({}, state, {
        status: action.status,
        errors: action.errors,
        error: true,
        loading: false
      })
      break
    case actions.RECEIVE_PAGE:
      return Object.assign({}, state, {
        pageData: action.pageData,
        loading: false
      })
      break
    case actions.REQUEST_PAGE:
      return Object.assign({}, state, {
        loading: true
      })
      break
    case actions.RECEIVE_PAGE_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      })
      break
    default:
      return state
  }
}

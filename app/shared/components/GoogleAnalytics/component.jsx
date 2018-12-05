import React from 'react'
import ReactGA from 'react-ga'

const id = 'UA-50764316-1'

export const GA = props => {
  if (typeof window !== 'undefined') {
    if (!window.ga) {
      ReactGA.initialize(id) // @todo - this would be better coming from the config.yaml
    }
    ReactGA.pageview(window.location.pathname + window.location.search)

    if (props.children) {
      return props.children
    }
  }
  return null
}

export const GAEvent = (props) => {
  if (typeof window !== 'undefined') {
    if (!window.ga) {
      ReactGA.initialize(id) // @todo - this would be better coming from the config.yaml
    }
    ReactGA.event(props)
  }
  return null
}

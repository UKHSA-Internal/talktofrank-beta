import React from 'react'
import GA4React from 'ga-4-react'

const ga4react = new GA4React('G-BW7RD58Q7Z')

export const GA = props => {
  if (typeof window !== 'undefined') {
    if (!window.gtag) {
      ga4react.initialize().then(
        ga4 => {
          ga4.pageview(window.location.pathname + window.location.search)
        },
        err => {
          console.error(err)
        }
      )

      if (props.children) {
        return props.children
      }
    }
  }
  return null
}

export const GAEvent = props => {
  if (typeof window !== 'undefined') {
    const payload = {
      ...(props.label && { event_label: props.label }),
      ...(props.category && { event_category: props.category }),
      ...(props.nonInteraction && {
        non_interaction: props.nonInteraction
      })
    }
    if (!window.gtag) {
      ga4react.initialize().then(
        ga4 => {
          ga4.gtag('event', props.action, payload)
        },
        err => {
          console.error(err)
        }
      )
    } else {
      window.gtag('event', props.action, payload)
    }
  }
  return null
}

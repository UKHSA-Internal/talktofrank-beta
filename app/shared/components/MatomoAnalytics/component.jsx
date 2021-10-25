import React from 'react'
import MatomoTracker from '@datapunt/matomo-tracker-js'

const matomoAnalytics = () => {
  if (typeof window !== 'undefined') {
    const tracker = new MatomoTracker({
      urlBase: 'https://stats.x-smg.com/matomo/',
      siteId: 11,
      disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
      heartBeat: { // optional, enabled by default -> measure the time spent in the visit
        active: true, // optional, default value: true
        seconds: 10 // optional, default value: `15 if the page was viewed for at least 10 seconds
      },
      configurations: { // optional, default value: {}
          // any valid matomo configuration, all below are optional
        disableCookies: true,
        setRequestMethod: 'POST'
      }
    })

    tracker.trackPageView()
  }
  return (
    null
  )
}
export default matomoAnalytics

import React from 'react'
import MatomoTracker from '@datapunt/matomo-tracker-js'
import { getMatomoTracker } from '../../utilities'

const MatomoAnalytics = () => {
  if (typeof window !== 'undefined') {
    const tracker = getMatomoTracker()
    console.log('tracking page')
    tracker.trackPageView()
  }
  return (
    null
  )
}
export default MatomoAnalytics

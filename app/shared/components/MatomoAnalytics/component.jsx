import React from 'react'
import { getMatomoTracker } from '../../utilities'

const MatomoAnalytics = () => {
  if (typeof window !== 'undefined') {
    const tracker = getMatomoTracker()
    tracker.trackPageView()
  }
  return null
}

export default MatomoAnalytics

import React from 'react'
import { getMatomoTracker, trackEvent } from '../../utilities'

const MatomoAnalytics = () => {
  if (typeof window !== 'undefined') {
    const tracker = getMatomoTracker()
    window.addEventListener('scroll', TrackScroll)
    tracker.trackPageView()
  }
  return null
}
const ScrollHistory = []
const TrackScroll = (e) => {
  const scrollHeight = window.scrollY
  const scrollRatio = Math.round(((scrollHeight + window.innerHeight) / document.body.scrollHeight) * 100)
  if (scrollRatio % 25 === 0 && !ScrollHistory.includes(scrollRatio)) {
    ScrollHistory.push(scrollRatio)
    trackEvent({
      category: 'scroll',
      action: 'page scroll',
      value: scrollRatio
    })
  }
}

export default MatomoAnalytics

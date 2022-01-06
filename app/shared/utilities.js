import { config } from 'config'
import MatomoTracker from '@datapunt/matomo-tracker-js'

export function isInBrowser () {
  return typeof window !== 'undefined' && window.document
}

export function getApiHost () {
  let apiHost
  if (isInBrowser()) {
    apiHost = window.location.protocol + '//' + window.location.host
  } else {
    apiHost = config.api
  }
  return apiHost
}

export function getContentfulHost () {
  return `${config.contentful.contentHost}` +
    `/spaces/${config.contentful.contentSpace}` +
    `/environments/${config.contentful.environment}`
}

export function isArray (obj) {
  return obj.constructor === Array
}

export function shouldAuthenticate () {
  return config.basicAuth && config.basicAuth.username && config.basicAuth.password
}

export function stringContains (haystack, needles) {
  if (isArray(needles)) {
    for (let needle of needles) {
      if (stringContains(haystack, needle)) return true
    }
    return false
  } else {
    return haystack.indexOf(needles) !== -1
  }
}

export function getObjectKeys (obj) {
  let keys = []
  for (let key in obj) {
    if (!obj.hasOwnProperty) { continue }
    keys.push(key)
  }
  return keys
}

export function isEmpty (obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

export const removeMarkdown = (string) => string.replace(/#|\*|_|-|\|>|\[|\]|\(.*\)|`/g, '')
export const removeTags = (string) => string.replace(/<\/?[^>]+(>|$)/g, '')
export const replaceNewLine = (str, replacement) => str.replace(/(?:\r\n|\r|\n)/g, replacement)

/**
 * Usage: getIfExists(obj, 'prop1.prop2')
 * Returns undefined if it does not exist
 * @param {*} obj
 * @param {*} key
 */
export function getIfExists (obj, key) {
  return key.split('.').reduce(function (o, x) {
    return (typeof o === 'undefined' || o === null) ? o : o[x]
  }, obj)
}

export function exists (obj, key) {
  return key.split('.').every(function (x) {
    if (typeof obj !== 'object' || obj === null || !(x in obj)) {
      return false
    }
    obj = obj[x]
    return true
  })
}

export const fieldIncludesVideo = (videoObj) => {
  if (videoObj && videoObj.hasOwnProperty('embedUrl')) {
    return true
  } else if (videoObj && videoObj.hasOwnProperty('fields') && videoObj.fields.embedUrl) {
    return true
  }
  return false
}

export function fieldIncludesImages (imageObj) {
  if (!imageObj.fields) {
    return false
  }

  let imagesFileExists = false
  Object.keys(imageObj.fields)
    .filter(key => imageObj.fields[key].fields)
    .filter(key => imageObj.fields[key].fields.file)
    .map(key => {
      imagesFileExists = true
    })

  return imagesFileExists
}

// not great - needs a bit more flexibility
// it mirrors the cms but would be nice to
// have the freedom to add more breakpoints
export function imageMap (obj, field = 'image') {
  if (!obj[field] || !fieldIncludesImages(obj[field])) {
    return false
  }

  let imageObj = {
    title: '',
    images: {}
  }

  let path = obj[field].fields
  imageObj['title'] = path.title

  if (path.imageHuge && path.imageHuge.fields) {
    imageObj.images[path.hugeBreakpoint] = path.imageHuge.fields.file.url || 1200
  }

  if (path.imageVeryLarge && path.imageVeryLarge.fields) {
    imageObj.images[path.veryLargeBreakpoint] = path.imageVeryLarge.fields.file.url || 950
  }

  if (path.imageLarge && path.imageLarge.fields) {
    imageObj.images[path.largeBreakpoint] = path.imageLarge.fields.file.url || 800
  }

  if (path.imageMedium && path.imageMedium.fields) {
    imageObj.images[path.mediumBreakpoint] = path.imageMedium.fields.file.url || 600
  }

  if (path.imageSmall && path.imageSmall.fields) {
    imageObj.images[path.smallBreakpoint] = path.imageSmall.fields.file.url || 400
  }
  return imageObj
}

/**
 * https://gist.github.com/larsonjj/2bf44f1925237d67d5b65f74bc9e88f0
 * Animate scroll of a specified HTML Element (ease-in-out)
 * @param {HTMLElement} element HTML element's scroll to animate
 * @param {Number} to Scroll-Y position to scroll to
 * @param {Number} duration How long (ms) the animation should last
 * @param {Function} callback Function called after animation is complete
 * @returns {void}
 */

export function scrollIntoView (node, duration = 300, offset = 80, callback, resetTop = false) {
  if (resetTop) {
    document.documentElement.scrollTop = 0
  }
  const el = document.body || document.documentElement
  const start = el.scrollTop
  const change = (node.getBoundingClientRect().top - offset) - start
  const increment = 20
  let currentTime = 0
  let timerid

  const animateScroll = () => {
    currentTime += increment
    const val = Math.easeInOutQuad(currentTime, start, change, duration)
    document.documentElement.scrollTop = val

    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    } else if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  if (timerid) {
    clearTimeout(timerid)
  }

  timerid = setTimeout(() => {
    animateScroll()
  }, duration)
}

export function scrollIntoViewFromCurrent (node) {
  const duration = 300
  const offset = 80
  const start = window.scrollY
  const target = node.getBoundingClientRect().top
  const scrollTop = window.pageYOffset
  const change = (scrollTop + target - offset) - start
  const increment = 20
  let currentTime = 0
  let timerid

  const animateScroll = () => {
    currentTime += increment
    const val = Math.easeInOutQuad(currentTime, start, change, duration)
    document.documentElement.scrollTop = val

    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  if (timerid) {
    clearTimeout(timerid)
  }

  timerid = setTimeout(() => {
    animateScroll()
  }, duration)
}

/**
 * Animate scroll of a specified HTML Element (ease-in-out)
 * @param {HTMLElement} element HTML element's scroll to animate
 * @param {Number} to Scroll-Y position to scroll to
 * @param {Number} duration How long (ms) the animation should last
 * @param {Function} callback Function called after animation is complete
 * @returns {void}
 */
export function scrollTo (element, to, duration, callback) {
  // easing functions http://goo.gl/5HLl8
  const easeInOutQuad = (t, b, c, d) => {
    let _t = t || 0
    const _b = b || 0
    const _c = c || 0
    const _d = d || 0

    _t /= _d / 2
    if (_t < 1) {
      return _c / 2 * _t * _t + _b
    }
    _t--
    return -_c / 2 * (_t * (_t - 2) - 1) + _b
  }

  // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
  const requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) }
  })()

  const body = () => {
    return document.body || document.documentElement
  }

  const ele = element || body() || {}
  const start = ele.scrollTop || 0
  const change = to - start
  let currentTime = 0
  const increment = 20
  const _duration = (typeof (duration) === 'undefined') ? 400 : duration

  const animateScroll = () => {
    if (!ele) {
      return
    }

    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    const val = easeInOutQuad(currentTime, start, change, _duration)
    // move the element scroll
    ele.scrollTop = val
    // do the animation unless its over
    if (currentTime < _duration) {
      requestAnimFrame(animateScroll)
    } else if (callback && typeof (callback) === 'function') {
      // the animation is done so lets callback
      callback()
    }
  }
  animateScroll()
}

const toRad = (x) => x * Math.PI / 180

export const haversineDistance = (lon1, lat1, lon2, lat2, isMiles) => {
  const R = 6371 // km
  const x1 = lat2 - lat1
  const dLat = toRad(x1)
  const x2 = lon2 - lon1
  const dLon = toRad(x2)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c
  if (isMiles) d /= 1.60934
  return d.toFixed(1)
}

let matomoTracker = null
export const getMatomoTracker = () => {
  if (matomoTracker === null && typeof window !== 'undefined') {
    matomoTracker = new MatomoTracker({
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
  }
  return matomoTracker
}

export const trackEvent = (props) => {
  const tracker = getMatomoTracker()
  tracker.trackEvent(props)
}
export const trackSearch = ({keyword, count}) => {
  const tracker = getMatomoTracker()
  tracker.trackSiteSearch({
    keyword,
    count
  })
}

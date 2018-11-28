
import { config } from 'config'

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
export const nl2br = (str) => str.replace(/(?:\r\n|\r|\n)/g, '<br />')
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

// not great - needs a bit more flexibilty
// it mirrors the cms but would be nice to
// have the freedom to add more breakoints
export function imageMap (obj) {
  let imageObj = {}
  let path = obj.fields

  if (path.imageHuge) {
    imageObj[path.hugeBreakpoint] = path.imageHuge.fields.file.url || 1200
  }

  if (path.imageVeryLarge) {
    imageObj[path.veryLargeBreakpoint] = path.imageVeryLarge.fields.file.url || 950
  }

  if (path.imageLarge) {
    imageObj[path.largeBreakpoint] = path.imageLarge.fields.file.url || 800
  }

  if (path.imageMedium) {
    imageObj[path.mediumBreakpoint] = path.imageMedium.fields.file.url || 600
  }

  if (path.imageSmall) {
    imageObj[path.smallBreakpoint] = path.imageSmall.fields.file.url || 400
  }
  return imageObj
}

export function scrollIntoView (node, duration = 300, offset = 80) {
  document.documentElement.scrollTop = 0
  const start = document.documentElement.scrollTop
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

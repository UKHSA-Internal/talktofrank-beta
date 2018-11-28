export const setCookie = (key, value, daysToExpire) => {
  if (typeof window === 'undefined') {
    return null
  }
  const date = new Date()
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000))
  document.cookie = key + '=' + value + '; expires=' + date.toGMTString()
}

export const getCookie = (key) => {
  if (typeof window === 'undefined') {
    return null
  }
  const value = '; ' + document.cookie
  const parts = value.split('; ' + key + '=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
}

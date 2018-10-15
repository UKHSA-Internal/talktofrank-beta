const pages = {
  home: '/',
  aToZ: '/drugs-a-z',
  notfound: '/does-not-exist',
  drugPage: name => {
    return `/drug/${name}`
  }
}

module.exports = pages
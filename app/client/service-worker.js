if (workbox) {
  workbox.setConfig({
    debug: false
  })
  // Custom tracking for GA see
  // https://developers.google.com/web/tools/workbox/modules/workbox-google-analytics
  workbox.googleAnalytics.initialize({
    parameterOverrides: {
      dimension1: 'offline'
    },
    hitFilter: (params) => {
      const queueTimeInSeconds = Math.round(params.get('qt') / 1000)
      params.set('metric1', queueTimeInSeconds)
    }
  })
  workbox.skipWaiting()
  workbox.clientsClaim()
  // Offline page is the only precaching required
  // manually setting the revision here as there's no way for webpack / workbox
  // to pick up a react route when generating precache files
  workbox.precaching.precacheAndRoute([{
    'url': '/offline',
    'revision': '201903131722'
  }, {
    'url': '/ui/svg/offline-large.svg',
    'revision': '201903131722'
  }])

  workbox.routing.registerRoute(
    /\.(?:ico|woff|woff2|png|svg|css|min\.css)(?:\?v=[1-9]+)|\.(?:ico|woff|woff2|png|svg|css|min\.css)$/,
    workbox.strategies.networkFirst()
  )

  // Use a networkonly policy to respond to all navigation routes
  // fall back to 'offline' page when there is a network error
  // this method allows for non 'OK' http status codes (i.e. 301 redirects)
  const networkOnly = workbox.strategies.networkOnly()
  const route = new workbox.routing.NavigationRoute(({event}) => {
    return networkOnly.handle({event}).catch(() => caches.match('/offline'))
  })
  workbox.routing.registerRoute(route)
}

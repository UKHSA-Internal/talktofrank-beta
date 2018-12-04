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
    'revision': '20181129'
  }, {
    'url': '/ui/svg/offline-large.svg',
    'revision': '20181129'
  }])

  // Using network first for development, cache will then be used
  // for offline connections
  workbox.routing.registerRoute(
    /\.(?:ico|woff|woff2|png|svg|css|min\.css)(?:\?v=[1-9]+)|\.(?:ico|woff|woff2|png|svg|css|min\.css)$/,
    workbox.strategies.networkFirst()
  )

  
  const networkOnly = workbox.strategies.networkOnly()
  const route = new workbox.routing.NavigationRoute(({event}) => {
    return networkOnly.handle({event}).catch(() => caches.match('/offline'))
  })
  workbox.routing.registerRoute(route)
  
//   workbox.routing.registerRoute(
//     ({event}) => event.request.mode === 'navigate' && event.request.redirect === 'manual',
//     ({url}) => fetch(url.href, {credentials: 'same-origin', redirect: 'follow'})
//       .catch(() => {
//         return caches.match('/offline')
//       })
//   )
}

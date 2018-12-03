import React from 'react'
import { config } from 'config'

export default class Head extends React.Component {
  render () {
    const { location, initialState, pageLoadError } = this.props
    const { head, title, error } = initialState.app.pageData
    let pageTitle
    let pageDescription
    let canonical = false
    let path

    if (!error && !pageLoadError) {
      path = location.pathname ? location.pathname : null
      canonical = `${config.canonicalHost}${path}`

      if (head && head.description && head.title) {
        pageTitle = head.title
        pageDescription = head.description
      } else {
        path = location.pathname ? location.pathname.replace(/\/\d/, '') : null
        switch (path) {
          case '/drugs-a-z' :
            pageTitle = 'Drugs A-Z'
            pageDescription = 'Drugs A-Z'
            break

          case '/news' :
          case '/latest' :
            pageTitle = 'Frank News | The Latest Stories and Articles'
            pageDescription = 'Stay up to date with the latest news about drugs and what the law says about them.  Stay up to date with the FRANK\'s latest news about drugs, recent discoveries and what the law says about them.'
            break

          case '/support-near-you' :
            pageTitle = 'Find support near your'
            pageDescription = 'Find support near your'
            break

          case '/livechat' :
            pageTitle = 'Live Chat'
            pageDescription = 'Live Chat'
            break

          case '/contact-frank' :
            pageTitle = 'Contact Frank'
            pageDescription = 'Contact Frank'
            break

          case '/offline' :
          case '/offline/' :
            pageTitle = 'You\'re Offline'
            pageDescription = ''
            break

          default:
            pageTitle = (head && head.title) || pageTitle
            pageDescription = (head && head.description) || null
            break
        }
      }
    } else {
      const errorCode = pageLoadError ? pageLoadError.error : error
      canonical = `${config.canonicalHost}/page-not-found`
      switch (errorCode) {
        case 404:
          pageTitle = 'Page not found (404)'
          pageDescription = 'Page not found (404)'
          break

        case 500:
          pageTitle = 'Server error'
          pageDescription = 'Server error'
          break
      }
    }

    return (
      <head>
        <title>{pageTitle + ` | FRANK`}</title>
        <meta charSet='utf-8' />
        <meta name="description" content={pageDescription} />
        <meta content='width=device-width,initial-scale=1.0' name='viewport' />
        <meta content='on' httpEquiv='cleartype' />
        <meta name='format-detection' content='telephone=no' />
        {canonical && <link rel='canonical' href={canonical} />}
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='theme-color' content='#FFFFFF' />
        <link rel="manifest" href="/ui/manifest.json" />
        <link rel='stylesheet' type='text/css' href={`/ui/css/main.css?v=${this.props.cacheBusterTS}`} />
        <script dangerouslySetInnerHTML={{__html:
        `
        window.addEventListener('touchstart', function onFirstTouch() {
          document.documentElement.classList.remove('has-hover')
          window.removeEventListener('touchstart', onFirstTouch, false)
        }, false)`
        }} />
      </head>
    )
  }
}

Head.defaultProps = {
  pageTitle: 'Talk to Frank'
}

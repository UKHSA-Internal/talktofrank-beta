import React from 'react'
import { config } from 'config'
import AmpBoilerplate from '../AmpBoilerplate/component.jsx'

export default class AmpHead extends React.Component {
  render () {
    const { location, initialState, pageLoadError } = this.props
    const { head, title, error } = initialState.app.pageData
    const path = location.pathname ? location.pathname : null

    let pageTitle
    let pageDescription
    let canonical = `${config.canonicalHost}${path}`

    if (!error && !pageLoadError) {
      switch (path) {
        case '/drugs-a-z' :
          pageTitle = 'Drugs A-Z'
          pageDescription = 'Drugs A-Z'
          break

        case '/news' :
        case '/latest' :
          pageTitle = 'Frank News | The Latest Stories and Articles'
          pageDescription = 'Stay up to date with the latest news about drugs and what the law says about them. 82 Stay up to date with the FRANK\'s latest news about drugs, recent discoveries and what the law says about them.'
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
    } else {
      const errorCode = pageLoadError ? pageLoadError.error : error
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
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <meta charSet='utf-8' />
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <meta name='format-detection' content='telephone=no' />
        <link rel='canonical' href={canonical} />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='theme-color' content='#FFFFFF' />
        <AmpBoilerplate />
      </head>
    )
  }
}

AmpHead.defaultProps = {
  pageTitle: 'Talk to Frank'
}

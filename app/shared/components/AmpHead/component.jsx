import React from 'react'
import { config } from 'config'
import { headerBoilerplate } from 'react-amphtml/setup'

import style from '../../../../static/ui/scss/amp-main.scss'

export default class AmpHead extends React.Component {
  render () {
    const { location, initialState, pageLoadError } = this.props
    const { head, title, error, date } = initialState.app.pageData
    const ampInlineCss = style.toString()

    let path = location.pathname ? location.pathname : null
    path = path.replace(/^\/amp/, '')

    let pageTitle
    let pageDescription
    let canonical = `${config.canonicalHost}${path}`

    if (!error && !pageLoadError) {
      pageTitle = (head && head.title) || pageTitle
      pageDescription = (head && head.description) || null
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

    let images = initialState.app.pageData.fields.image
    /* find largest image */
    let largest = 0
    for (var index in images) {
      largest = index > largest ? index : largest
    }

    let mainImage = images[largest]

    let schemaTags = {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
      "headline": this.props.initialState.app.pageData.fields.title,
      "datePublished": date,
      "description": pageDescription,
      "author": {
        "@type": "Organization",
        "name": "FRANK"
      },
      "image": "https:" + mainImage,
      "publisher": {
        "@type": "Organization",
        "name": "FRANK",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.talktofrank.com/ui/img/frank-logo.png",
          "width": 311,
          "height": 60
        }
      }
    }

    return (
      <head>
        <title>{pageTitle + ` | FRANK`}</title>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <meta name="description" content={pageDescription} />
        <meta name='format-detection' content='telephone=no' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='theme-color' content='#FFFFFF' />
        {headerBoilerplate(canonical)}
        <style amp-custom="" dangerouslySetInnerHTML={{__html: ampInlineCss}} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaTags) }}/>
      </head>
    )
  }
}

AmpHead.defaultProps = {
  pageTitle: 'Talk to Frank'
}

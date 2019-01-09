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
    let ogPageTitle
    let canonical = `${config.canonicalHost}${path}`

    if (!error && !pageLoadError) {
      path = location.pathname ? location.pathname : null

      if (head && head.description && head.pageTitle) {
        ogPageTitle = head.title ? head.title : head.pageTitle
        pageTitle = head.pageTitle
        pageDescription = head.description
      } else {
        path = location.pathname ? location.pathname.replace(/\/\d/, '') : null
        ogPageTitle = pageTitle = (head && head.title) || pageTitle
        pageDescription = (head && head.description) || pageTitle
      }
    } else {
      const errorCode = pageLoadError ? pageLoadError.error : error
      canonical = `${config.canonicalHost}/page-not-found`
      switch (errorCode) {
        case 404:
          ogPageTitle = pageTitle = 'Page not found (404)'
          pageDescription = 'Page not found (404)'
          break

        case 500:
          ogPageTitle = pageTitle = 'Server error'
          pageDescription = 'Server error'
          break
      }
    }

    let schemaTags = {
      '@context': 'http://schema.org',
      '@type': 'NewsArticle',
      'mainEntityOfPage': 'http://cdn.ampproject.org/article-metadata.html',
      'headline': this.props.initialState.app.pageData.fields.title,
      'datePublished': date,
      'description': pageDescription,
      'author': {
        '@type': 'Organization',
        'name': 'FRANK'
      },
      'image': 'https:' + head.image.url,
      'publisher': {
        '@type': 'Organization',
        'name': 'FRANK',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.talktofrank.com/ui/img/frank-logo.png',
          'width': 311,
          'height': 60
        }
      }
    }

console.log(head.image)

    return (
      <head>
        <title>{pageTitle + ` | FRANK`}</title>
        <script async src='https://cdn.ampproject.org/v0.js'></script>
        <meta name='description' content={pageDescription} />
        <meta name='format-detection' content='telephone=no' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='theme-color' content='#FFFFFF' />
        <meta property="twitter:title" content={ogPageTitle + ` | FRANK`} />
        <meta property="twitter:description" content={pageDescription + ` | FRANK`} />
        {head && head.image && <meta property="twitter:image" content={head.image.url} />}
        <meta property="og:title" content={ogPageTitle + ` | FRANK`} />
        {head && head.image &&
          <meta property="og:image:width" content={head.image.details.image.width} />
          <meta property="og:image:height" content={head.image.details.image.height} />
          <meta property="og:image:secure_url" content={`https:${head.image.url}`} />
          <meta property="og:image:url" content={`http:${head.image.url}`} />
          <meta property="og:image:type" content={`http:${head.image.contentType}`} />
        }
        <meta property="og:description" content={pageDescription + ` | FRANK`} />
        {canonical && <meta property="og:url" content={canonical} />}
        {headerBoilerplate(canonical)}
        <style amp-custom='' dangerouslySetInnerHTML={{__html: ampInlineCss}} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaTags) }}/>
      </head>
    )
  }
}

AmpHead.defaultProps = {
  pageTitle: 'Talk to Frank'
}

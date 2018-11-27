import React from 'react'

export default class Head extends React.Component {
  render () {
    var title, description

    switch (this.props.error) {
      case 404:
        title = 'Page not found (404)'
        description = 'Page not found (404)'
        break

      case 500:
        title = 'Server error'
        description = 'Server error'
        break

      default:
        title = (this.props.head && this.props.head.title) || this.props.title
        description = (this.props.head && this.props.head.description) || null
        break
    }

    return (
      <head>
        <title>{title + ` | FRANK`}</title>
        <meta charSet='utf-8' />
        <meta content='width=device-width,initial-scale=1.0' name='viewport' />
        <meta content='on' httpEquiv='cleartype' />
        <meta name='format-detection' content='telephone=no' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <link rel='stylesheet' type='text/css' href={`/ui/css/main.min.css?v=${this.props.cacheBusterTS}`} />
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
  title: 'Talk to Frank'
}

import React from 'react'
import { getSizes, getPictureSettings, getWidthHeightRatio } from '../../utilities'

export default class Picture extends React.PureComponent {
  componentDidMount () {
    const picturefill = require('picturefill')
    picturefill()
  }

  getSources (sizes, images) {
    return sizes.map(s => <source key={s} media={'(min-width: ' + s + 'px)'} srcSet={images[s].url}/>)
  }

  render () {
    let smallestImage = getPictureSettings(this.props)
    let classes = `image ${this.props.className || ''}`
    let sources = this.getSources(getSizes(this.props), this.props)

    let smallestImageSrc = smallestImage.url + '?fm=jpg&q=70'

    return (
      <picture className={classes}>
        {sources}
        <img src={smallestImageSrc} srcSet={smallestImageSrc} alt={this.props.alt || ''}/>
      </picture>
    )
  }
}

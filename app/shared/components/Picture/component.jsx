import React from 'react'
import Play from '../Play/component.jsx'
import { fieldIncludesVideo } from '../../utilities'

export default class Picture extends React.PureComponent {
  componentDidMount() {
    const picturefill = require('picturefill')
    picturefill()
  }

  getSizes(images) {
    // @joel @refactor @todo - remove this object.keys and make the images pre-sorted
    return Object.keys(images)
      .map(s => parseInt(s, 10))
      .filter(s => !isNaN(s))
      .sort((a, b) => b - a)
  }

  getSources(sizes, images) {
    return sizes.map(s => (
      <source
        key={images[s]}
        media={'(min-width: ' + s + 'px)'}
        srcSet={images[s]}
      />
    ))
  }

  getSmallestImage(sizes, images) {
    let smallestSize = sizes.pop()
    return images[smallestSize]
  }

  getPictureSettings(images) {
    let alt = images.title
    images = images.images
    let sizes = this.getSizes(images)
    let smallestImageSrc = this.getSmallestImage(sizes, images)
    let sources = this.getSources(sizes, images)

    return {
      smallestImageSrc: smallestImageSrc,
      sources: sources,
      alt: alt
    }
  }

  render() {
    let { sources, smallestImageSrc, alt } = this.getPictureSettings(this.props)
    let classes = `image ${this.props.className || ''}`
    // alt = this.props.noAlt ? '' : alt
    // removing this for now as requested in the DAC audit
    alt = ''

    smallestImageSrc += '?fm=jpg&q=70'
    return (
      <picture className={classes}>
        {sources}
        <img
          src={smallestImageSrc}
          srcSet={smallestImageSrc}
          alt={this.props.noAlt ? '' : alt}
          role={this.props.noAlt ? 'presentation' : ''}
        />
        {fieldIncludesVideo(this.props.video) && (
          <Play className="hidden--xs" />
        )}
      </picture>
    )
  }
}

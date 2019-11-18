import React from 'react'
import classNames from 'classnames'
import * as Amp from 'react-amphtml'
import { fieldIncludesVideo } from '../../utilities'

export default class AmpPicture extends React.PureComponent {
  componentDidMount () {
    const picturefill = require('picturefill')
    picturefill()
  }

  getSizes (images) {
    // @joel @refactor @todo - remove this object.keys and make the images pre-sorted
    return Object.keys(images).map(s => parseInt(s, 10)).filter(s => !isNaN(s)).sort((a, b) => b - a)
  }

  getSources (sizes, images) {
    return sizes.map(s => <source key={images[s]} media={'(min-width: ' + s + 'px)'} srcSet={images[s]}/>)
  }

  getSmallestImage (sizes, images) {
    let smallestSize = sizes.pop()
    return images[smallestSize]
  }

  getPictureSettings (images) {
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

  render () {
    let { sources, smallestImageSrc, alt } = this.getPictureSettings(this.props)
    let classes = classNames('image', this.props.className)

    smallestImageSrc += '?fm=jpg&q=70'

    return (
      <div className={classes}>
        <Amp.AmpImg
          specName="default"
          src={smallestImageSrc}
          srcSet={smallestImageSrc}
          alt={alt}
          width='700'
          height='450'
          layout='responsive'>
        </Amp.AmpImg>
        {fieldIncludesVideo(this.props.video) && <Play className='hidden--xs'/>}
      </div>
    )
  }
}

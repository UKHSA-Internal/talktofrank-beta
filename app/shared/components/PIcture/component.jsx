import React from 'react'
import classNames from 'classnames'

export default class Picture extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const picturefill = require('picturefill')
    picturefill()
  }

  getSizes (images) {
    return Object.keys(images).map(function (s) {
      return parseInt(s, 10)
    }).sort(function (a, b) {
      return b - a
    })
  }

  getSources (sizes, images) {
    return sizes.map((s) => {
      return <source key={images[s]} media={'(min-width: ' + s + 'px)'} srcSet={images[s]}/>
    })
  }

  getSmallestImage (sizes, images) {
    let smallestSize = sizes.pop()

    return images[smallestSize]
  }

  getPictureSettings (images) {
    let sizes = this.getSizes(images)
    let smallestImageSrc = this.getSmallestImage(sizes, images)
    let sources = this.getSources(sizes, images)

    return {
      smallestImageSrc: smallestImageSrc,
      sources: sources
    }
  }

  render () {
    let srcs = this.getPictureSettings(this.props)
    let classes = classNames('image', this.props.className)

    console.log(srcs)
    return (
      <picture className={classes}>
        {srcs.sources}
        <img srcSet={smallestImageSrc} alt='' />
      </picture>
    )
  }
}

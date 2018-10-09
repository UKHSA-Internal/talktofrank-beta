import React from 'react'


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
      return <source key={images[s]} media={'(min-width: ' + s + 'px)'} srcset={images[s]}/>
    })
  }

  getSmallestImage (sizes, images) {
    let smallestSize = sizes.pop()

    return images[smallestSize]
  }

  getPictureSettings (images) {
    let sizes = getSizes(images)
    let smallestImageSrc = getSmallestImage(sizes, images)
    let sources = getSources(sizes, images)

    return {
      smallestImageSrc: smallestImageSrc,
      sources: sources
    }
  }

  render () {
    let srcs = getPictureSettings(this.props.images)
    console.log(srcs)

    return (
      <picture className={classes}>
        {srcs}

      </picture>
    )
  }
}

import React from 'react'
import classNames from 'classnames'
import * as Amp from 'react-amphtml'
import { getPictureSettings, getWidthHeightRatio } from '../../utilities'

export default class AmpPicture extends React.PureComponent {
  componentDidMount () {
    const picturefill = require('picturefill')
    picturefill()
  }

  render () {
    let smallestImage = getPictureSettings(this.props)

    let classes = classNames('image', this.props.className)

    let smallestImageSrc = smallestImage.url + '?fm=jpg&q=70'
    let {width, height} = getWidthHeightRatio(smallestImage.details.image.width, smallestImage.details.image.height)

    return (
      <div className={classes}>
        <Amp.AmpImg
          specName="default"
          src={smallestImageSrc}
          srcSet={smallestImageSrc}
          alt={this.props.alt || ''}
          width={width}
          height={height}
          layout='responsive'>
        </Amp.AmpImg>
      </div>
    )
  }
}

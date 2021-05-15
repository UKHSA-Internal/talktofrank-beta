import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import { VideoPlayer } from '../Video/component'
class BlockFeaturedVideo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }
  handlePlayer = type => {
    if (type === 'pause') {
      this.setState({ show: true })
    } else if (type === 'end') {
      this.setState({ show: true })
    } else if (type === 'play') {
      this.setState({ show: false })
    }
  }
  render() {
    return (
      <section
        className={`accent accent--shallow blockfeaturedvideo wrapper ${this.props.className}`}
      >
        <figure>
          <div
            className={
              'blockfeaturedvideo__titlebox ' +
              (this.state.show ? '' : 'blockfeaturedvideo__titlebox--hide')
            }
          >
            <span>{this.props.source}</span>
            <h4>{this.props.title}</h4>
          </div>

          {this.props?.videoFile?.fields?.file?.url && (
            <VideoPlayer {...this.props} handlePlayer={this.handlePlayer} />
          )}
          {this.props.videoFile?.fields?.description && (
            <figcaption className={'sr-only'}>
              {this.props.videoFile?.fields?.description}
            </figcaption>
          )}
        </figure>

        <div
          className={
            'blockfeaturedvideo__titlebox blockfeaturedvideo__titlebox--horizontal ' +
            (this.state.show
              ? ''
              : 'blockfeaturedvideo__titlebox--horizontal--show')
          }
        >
          <span>{this.props.source}</span>
          <h4>{this.props.title}</h4>
        </div>
      </section>
    )
  }
}

BlockFeaturedVideo.defaultProps = {
  className: ''
}

export default BlockFeaturedVideo

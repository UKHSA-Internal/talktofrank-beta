import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
class BlockFeaturedVideo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      url: this.props.embedUrl ? this.props.embedUrl.split('/embed')[1] : null,
      playIcon: {
        label: 'Submit search',
        url: '/ui/svg/play-pink.svg'
      },
      show: true
    }
  }
  handlePlayer = event => {
    const playerState = event.data

    if (playerState === 0) {
      event.target.pauseVideo()
      event.target.seekTo(0)
      this.setState({ show: true })
    } else if (playerState === 2) {
      this.setState({ show: true })
    } else if (playerState === 1) {
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

          {this.state.url && (
            <YouTube
              videoId={this.state.url}
              onStateChange={e => this.handlePlayer(e)}
            />
          )}
          {this.props.figCaption && (
            <figcaption className={'sr-only'}>
              {this.props.figCaption}
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

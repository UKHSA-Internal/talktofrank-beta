import React from 'react'

import videojs from 'video.js'

// YouTube embeddable video
const Video = props => {
  let url = props.embedUrl ? props.embedUrl + '?rel=0' : null
  return (
    <figure className={`video ${props.className}`}>
      {url && (
        <iframe
          src={url}
          width="500"
          height="281"
          frameBorder="0"
          allowFullScreen="allowfullscreen"
        ></iframe>
      )}
      {props.figCaption && (
        <figcaption className={'sr-only'}>{props.figCaption}</figcaption>
      )}
    </figure>
  )
}

Video.defaultProps = {
  className: ''
}

export default Video

//  self-hosted embeddable video from

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoOpts: {
        controls: true,
        liveui: false,
        fluid: true,
        autoplay: false,
        poster: this.props?.coverImage?.fields?.file?.url || null,
        sources: [
          {
            src: this.props.videoFile.fields.file.url,
            type: this.props.videoFile.fields.file.contentType
          }
        ]
      }
    }
  }
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(
      this.videoNode,
      this.state.videoOpts,
      function onPlayerReady() {
        console.log('onPlayerReady', this)
      }
    )
    this.player.on('play', () => this.props.handlePlayer('play'))
    this.player.on('pause', () => this.props.handlePlayer('pause'))
    this.player.on('ended', () => this.props.handlePlayer('end'))
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={node => (this.videoNode = node)}
            className="video-js"
          ></video>
        </div>
      </div>
    )
  }
}

export { VideoPlayer }

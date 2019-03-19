import React from 'react'
import * as Amp from 'react-amphtml'

const AMPVideo = props => {
  let youtubeVideoId = null
  let vimeoVideoId = null
  let url = props.embedUrl ? props.embedUrl : null
  let match = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/embed\/)([^\s&]+)/)
  if (match !== null) {
    youtubeVideoId = match[1]
  }

  match = url.match(/^https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)$/)
  if (match !== null) {
    vimeoVideoId = match[1]
  }

  if (!vimeoVideoId && !youtubeVideoId) {
    return null
  }

  return (
    <React.Fragment>
    { youtubeVideoId ? (
        <Amp.AmpYoutube
          data-videoid={youtubeVideoId}
          layout='responsive'
          width='480'
          height='270'
        ></Amp.AmpYoutube>
      ) : vimeoVideoId ? (
        <Amp.AmpVimeo
          data-videoid={vimeoVideoId}
          layout='responsive'
          width='480'
          height='270'
        ></Amp.AmpVimeo>
      ) : null}
    </React.Fragment>
  )
}

AMPVideo.defaultProps = {
  className: ''
}

export default AMPVideo

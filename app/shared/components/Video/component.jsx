import React from 'react'
import PropTypes from 'prop-types'

const Video = props => {
	let url = props.embedUrl ? props.embedUrl + '?rel=0' : null
  return (
    <figure className={`video ${props.className}`}>
      {url && <iframe src={url} width='500' height='281' frameBorder='0' allowFullScreen='allowfullscreen'></iframe>}
    </figure>
  )
}

Video.defaultProps = {
  className: ''
}

export default Video

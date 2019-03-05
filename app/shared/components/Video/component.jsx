import React from 'react'

const Video = props => {
	let url = props.videoId ? props.videoId + '?rel=0' : null
  return (
    <figure className='video'>
      {url && <iframe src={url} width='500' height='281' frameBorder='0' allowFullScreen='allowfullscreen'></iframe>}
    </figure>
  )
}

export default Video

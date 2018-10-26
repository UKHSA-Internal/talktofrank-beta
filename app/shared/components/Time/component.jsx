import React from 'react'

const Time = props => {
  return (
    <time className='time' dateTime={props.datetime}>
      {props.time}
    </time>
  )
}

export default Time

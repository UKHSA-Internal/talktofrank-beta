import React from 'react'

const Divider = props => {
  return (
    <hr className={`hr ${props.className || null}`}/>
  )
}

export default Divider

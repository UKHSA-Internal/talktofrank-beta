import React from 'react'

const Spinner = props => {
  let classes = `spinner spinner--active ${props.className || ''}`

  return (
    <div className={classes}>
      <span className='spinner__inner'>Loading</span>
    </div>
  )
}

export default Spinner

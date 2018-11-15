import React from 'react'
import classNames from 'classnames'

const Spinner = props => {
  let classes = classNames('spinner', {
    'spinner--active': props.loading
  })

  return (
    <div className={classes}>
      <span className='spinner__inner'>Loading</span>
    </div>
  )
}

export default Spinner

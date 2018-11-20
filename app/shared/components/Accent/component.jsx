import React from 'react'
import classNames from 'classnames'

const Accent = props => {
  let classes = classNames('accent', props.className)

  return (
    <section className={classes}>
      <div className='wrapper'>
        {props.children}
      </div>
    </section>
  )
}

export default Accent

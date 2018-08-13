import React from 'react'
import classNames from 'classnames'

const Main = props => {
  let classes = classNames('main-wrapper', props.className)
  return (
    <main className={classes} id='main' role='main'>
      {props.children}
    </main>
  )
}

export default Main

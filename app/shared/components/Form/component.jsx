import React from 'react'
import classNames from 'classnames'

const Form = props => {
  let classes = classNames('form', props.className)
  return (
    <form action={props.action || null} className={classes} role='search'>
      {props.children}
    </form>
  )
}

export default Form

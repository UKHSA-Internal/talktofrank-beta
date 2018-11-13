import React from 'react'
import classNames from 'classnames'

const Form = props => {
  let classes = classNames('form', props.className)
  return (
    <form className={classes} method='post' role='search' onSubmit={props.handleSubmit}>
      {props.children}
    </form>
  )
}

export default Form

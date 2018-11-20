import React from 'react'
const Form = props => {
  let classes = `form ${props.className || ''}`
  let role = props.role ? {'role': props.role} : null
  return (
    <form className={classes} method='post' {...role} onSubmit={props.handleSubmit}>
      {props.children}
    </form>
  )
}

export default Form

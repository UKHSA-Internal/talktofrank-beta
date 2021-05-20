import React from 'react'
const Form = props => {
  let classes = `form ${props.className || ''}`
  let role = props.role ? { role: props.role } : null
  return (
    <form
      className={classes}
      method="post"
      {...role}
      onSubmit={e => props.handleSubmit(e)}
    >
      {props.children}
    </form>
  )
}

export default Form

import React from 'react'

const Panel = props => {
  let classes = `panel ${props.className || ''}`
  let id = props.id ? {id: props.id} : null

  return (
    <div className={classes} {...id}>
      {props.children}
    </div>
  )
}

export default Panel

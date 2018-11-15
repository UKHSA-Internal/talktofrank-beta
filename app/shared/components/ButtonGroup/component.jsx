import React from 'react'

const ButtonGroup = props => {
  return (
    <div className={`button-group ${props.className || ''}`}>
      {props.children}
    </div>
  )
}
export default ButtonGroup

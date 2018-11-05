import React from 'react'

const Anchor = props => {
  return (
    <a href={props.href} className={props.className}>{props.text}{props.children}</a>
  )
}

export default Anchor

import React from 'react'

const Anchor = props => {
  let aria = props.label ? {'aria-label': props.label} : null
  return (
    <a href={props.href} {...aria} className={props.className}>{props.text}{props.children}</a>
  )
}

export default Anchor

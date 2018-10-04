import React from 'react'
const LinkItem = props => {
  return (
    <li className={props.className}>
      <a className='nav-link' href={props.url} role={props.role}>{props.label}</a>
    </li>
  )
}
export default LinkItem

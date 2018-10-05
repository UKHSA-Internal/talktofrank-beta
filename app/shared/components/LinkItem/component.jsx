import React from 'react'
import Icon from '../Icon/component.jsx'

const LinkItem = props => {
  return (
    <li className={props.className}>
      <a className='nav-link' href={props.url} role='menuitem' onClick={(e) => props.clickHandler(props.tracking, e)}>{props.icon && <Icon {...props.icon}/>}{props.label}</a>
    </li>
  )
}
export default LinkItem

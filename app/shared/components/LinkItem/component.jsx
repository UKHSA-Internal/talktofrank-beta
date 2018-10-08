import React from 'react'
import Icon from '../Icon/component.jsx'

const LinkItem = props => {
  let label = props.icon ? <span className='btn__text'>{props.label}</span> : props.label
  return (
    <li className={props.className}>
      <a className='nav-link' href={props.url} role='menuitem' onClick={(e) => props.clickHandler(props.tracking, e)}>{props.icon && <Icon {...props.icon}/>}{label}</a>
    </li>
  )
}
export default LinkItem

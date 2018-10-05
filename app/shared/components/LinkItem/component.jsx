import React from 'react'
import Svg from '../Svg/component.jsx'

const LinkItem = props => {
  return (
    <li className={props.className}>
      <a className='nav-link' href={props.url} role={props.role} onClick={(e) => props.clickHandler(props.tracking, e)}>{props.label}</a>
    </li>
  )
}
export default LinkItem

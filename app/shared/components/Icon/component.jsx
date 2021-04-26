import React from 'react'
import Svg from '../Svg/component.jsx'

const Icon = props => {
  return (
    <span
      className={props.className}
      onClick={props.onClick ? props.onClick : () => {}}
    >
      <Svg url={props.url} alt={props.alt} />
      {props.label && <span className="visually-hidden">{props.label}</span>}
    </span>
  )
}

export default Icon

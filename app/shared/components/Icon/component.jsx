import React from 'react'
import Svg from '../Svg/component.jsx'

const Icon = props => {
  return (
    <span className={props.className}>
      <Svg url={props.url} alt={props.alt}/>
      <span className='visually-hidden'>{props.label}</span>
    </span>
  )
}

export default Icon

import React from 'react'
import Svg from '../Svg/component.jsx'
import classNames from 'classnames'

const Icon = props => {
  const classes = classNames('icon', props.className)

  return (
    <div
      className={classes}
      onClick={props.onClick ? props.onClick : () => {}}
    >
      <Svg url={props.url} alt={props.alt} />
      {props.label && <div className="visually-hidden">{props.label}</div>}
    </div>
  )
}

export default Icon

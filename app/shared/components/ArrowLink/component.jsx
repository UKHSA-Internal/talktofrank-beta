import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/component.jsx'

const ArrowLink = props => {
  const classes = classNames('arrowlink', props.className)
  const aria = props.label ? { 'aria-label': props.label } : null
  const iconArrow = {
    url: '/ui/svg/arrow-right.svg'
  }
  return (
    <a
      href={props.href}
      onClick={props.onClick}
      className={classes}
      {...aria}
      tabIndex={props.tabIndex}
      onFocus={props.onFocus}
    >
      <span>{props.text}</span>
      <Icon {...iconArrow} />
    </a>
  )
}

export default ArrowLink

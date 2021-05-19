import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/component.jsx'

const ArrowLink = props => {
  const classes = classNames('arrowlink', props.className)
  const ariaLabel = props.label ? { 'aria-label': props.label } : null
  const ariaLabeledBy = props.labeledBy
    ? { 'aria-labeledby': props.labeledBy }
    : null
  const iconArrow = {
    url: '/ui/svg/arrow-right.svg'
  }
  return (
    <a
      href={props.href}
      onClick={props.onClick}
      className={classes}
      tabIndex={props.tabIndex}
      onFocus={props.onFocus}
      {...ariaLabel}
      {...ariaLabeledBy}
    >
      <span>{props.text}</span>
      <Icon {...iconArrow} />
    </a>
  )
}

export default ArrowLink

import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/component.jsx'

const PickADrug = props => {
  const classes = classNames('pickadrug text-gradient', props.className)
  const aria = props.label ? { 'aria-label': props.label } : null
  const iconFinger = {
    label: 'Select a drug for quick info',
    url: '/ui/svg/pointer-finger.svg'
  }
  return (
    <div {...aria} className={classes}>
      <Icon {...iconFinger} />
      <h3>{props.text || 'Select a drug for quick info'}</h3>
    </div>
  )
}

export default PickADrug

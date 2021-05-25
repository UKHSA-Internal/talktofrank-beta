import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/component.jsx'

const PickADrug = props => {
  const classes = classNames('pickadrug', props.className)
  const iconFinger = {
    label: 'Select a drug for quick info',
    url: '/ui/svg/pointer-finger.svg'
  }
  return (
    <div aria-hidden="true" className={classes}>
      <Icon {...iconFinger} />
      <p className="h3 text-gradient">{props.text || 'Select a drug for quick info'}</p>
    </div>
  )
}

export default PickADrug

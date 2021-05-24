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
      <h3 className="text-gradient">{props.text || 'Select a drug for quick info'}</h3>
    </div>
  )
}

export default PickADrug

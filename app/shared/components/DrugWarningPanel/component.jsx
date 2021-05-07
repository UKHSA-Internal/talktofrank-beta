import React from 'react'
import Icon from '../Icon/component'

const DrugWarningPanel = props => {
  const iconWarning = {
    url: '/ui/svg/warning-blue.svg',
    alt: 'Warning'
  }
  return (
    <div className="drugwarningpanel">
      <div className="row">
        <div className="drugwarningpanel__heading">
          <Icon {...iconWarning} />
          <h5 className="drugwarningpanel__heading_title">Important</h5>
        </div>
        <div className="drugwarningpanel__wrapper col-12">
          <p className="drugwarningpanel__text">{props.text}</p>
        </div>
      </div>
    </div>
  )
}

export default DrugWarningPanel

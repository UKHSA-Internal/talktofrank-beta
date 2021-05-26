import React from 'react'
import Icon from '../Icon/component.jsx'
import classNames from 'classnames'
const InfoPanel = props => {
  const classes = classNames('info-panel', props.className)

  return (
    <div className={classes}>
      <div className="info-panel__heading">
        {props.isHeading
        ? <h2 className="info-panel__title">
            {props.icon && <Icon url={`/ui/svg/${props.icon}.svg`} />}
            <div>{props.title}</div>
          </h2>
        : <p className="info-panel__title">
            {props.icon && <Icon url={`/ui/svg/${props.icon}.svg`} />}
            <div>{props.title}</div>
          </p>
        }
        {props.screenReaderTitle && (
          <h2 className="sr-only">{props.screenReaderTitle}</h2>
        )}
      </div>
      <div className="info-panel__wrapper">{props.children}</div>
    </div>
  )
}

export default InfoPanel

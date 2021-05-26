import React from 'react'
import Icon from '../Icon/component.jsx'
import classNames from 'classnames'

const InfoPanel = props => {
  const classes = classNames('info-panel', props.className)

  const Tag = `${props.tag || 'h2'}`

  return (
    <div className={classes}>
      <div className="info-panel__heading">
        <Tag className="info-panel__title" aria-hidden={props.screenReaderTitle ? 'true': 'false'}>
          {props.icon && <Icon url={`/ui/svg/${props.icon}.svg`} />}
          <div>{props.title}</div>
        </Tag>
        {props.screenReaderTitle && (
          <Tag className="sr-only">{props.screenReaderTitle}</Tag>
        )}
      </div>
      <div className="info-panel__wrapper">{props.children}</div>
    </div>
  )
}

export default InfoPanel

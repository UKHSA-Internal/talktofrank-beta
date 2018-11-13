import React from 'react'
import classNames from 'classnames'

const FormHint = props => {

  let classnames = classNames('text-muted', {
    'form-hint': props.inline,
    'form-hint--block': !props.inline
  })

  return (
    <span className={classnames} dangerouslySetInnerHTML={{__html: props.children}} />
  )
}

export default FormHint

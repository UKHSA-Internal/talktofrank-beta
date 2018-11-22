import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const FormHint = props => {
  let classnames = classNames('text-muted', {
    'form-hint': props.inline,
    'form-hint--block': !props.inline
  })

  return (
    <span className={classnames} dangerouslySetInnerHTML={{__html: props.children}} id={props.id}/>
  )
}

FormHint.propTypes = {
  id: null
}

export default FormHint

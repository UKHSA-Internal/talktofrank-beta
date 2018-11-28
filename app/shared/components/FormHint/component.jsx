import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const FormHint = props => {
  let classnames = classNames('form-hint text-muted', props.className, {
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

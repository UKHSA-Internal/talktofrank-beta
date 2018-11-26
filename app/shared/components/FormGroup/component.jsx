import React from 'react'
import PropTypes from 'prop-types'
import FormHint from '../FormHint/component.jsx'
import { ErrorMessage } from '../FormErrors/component'
import classNames from 'classnames'

const FormGroup = props => {
  const id = props.id
  let error = props.error ? {'aria-invalid': true} : null
  let inputClassNames = classNames('form-control', props.className, {
    'is-invalid': props.error
  })

  return (
    <div className='form-group'>
      <label htmlFor={id} className='form-label'>{props.label}</label>
      {props.hint && <FormHint id={props.hintId || null}>{props.hint}</FormHint>}
      {props.error && <ErrorMessage message={props.error} />}
      <input className={inputClassNames} maxLength={props.maxLength} id={id} name={props.name} value={props.value} type='text' {...error} onChange={props.onChange} aria-describedby={props.hintId || null}/>
    </div>
  )
}

FormGroup.propTypes = {
  id: PropTypes.string
}

FormGroup.defaultProps = {
  maxLength: 300
}

export default FormGroup

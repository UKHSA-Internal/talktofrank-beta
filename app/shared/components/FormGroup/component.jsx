import React from 'react'
import PropTypes from 'prop-types'
import FormHint from '../FormHint/component.jsx'
import { ErrorMessage } from '../FormErrors/component'
import classNames from 'classnames'

const FormGroup = props => {
  const id = props.id

  let inputClassNames = classNames('form-control', props.className, {
    'is-invalid': props.error
  })

  return (
    <div className='form-group'>
      <label htmlFor={id} className='form-label'>{props.label}</label>
      {props.hint && <FormHint>{props.hint}</FormHint>}
      {props.error && <ErrorMessage message={props.error} />}
      <input className={inputClassNames} id={id} name={props.name} value={props.value} type='text' onChange={props.onChange}/>
    </div>
  )
}

FormGroup.propTypes = {
  id: PropTypes.string
}

export default FormGroup

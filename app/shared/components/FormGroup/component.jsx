import React from 'react'
import PropTypes from 'prop-types'
import FormHint from '../FormHint/component.jsx'
import { ErrorMessage } from '../FormErrors/component'

const FormGroup = props => {
  const id = props.id

  return (
    <div className='form-group'>
      <label htmlFor={id} className='form-label'>{props.label}</label>
      <input className={`form-control ${props.className || ''}`} id={id} name={props.name} value={props.value} type="text" onChange={props.onChange}/>
      {props.error && <ErrorMessage message={props.error} />}
      {props.hint && <FormHint>{props.hint}</FormHint>}
    </div>
  )
}

FormGroup.propTypes = {
  id: PropTypes.string
}

export default FormGroup

import React from 'react'
import PropTypes from 'prop-types'

const FormGroup = props => {
  const id = props.id
  return (
    <div className={`input-group ${props.className}`}>
      <label htmlFor={id} className='form-label'>{props.label}</label>
      <input className='form-control' id={id} name={props.name} type='text'/>
    </div>
  )
}

FormGroup.propTypes = {
  id: PropTypes.string
}

export default FormGroup

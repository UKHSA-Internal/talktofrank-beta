import React from 'react'
import PropTypes from 'prop-types'

const FormGroup = props => {
  const id = props.id
  return (
    <div className='form-group'>
      <label htmlFor={id} className='form-label'>{props.label}</label>
      <input onChange={props.onChange || null} className={`form-control ${props.className || ''}`} id={id} name={props.name} type='text'/>
    </div>
  )
}

FormGroup.propTypes = {
  id: PropTypes.string
}

export default FormGroup

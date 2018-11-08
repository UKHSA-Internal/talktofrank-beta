import React from 'react'
import FormHint from '../FormHint/component.jsx'
import PropTypes from 'prop-types'

const Textarea = props => {
  let classes = `form-group ${props.className || ''}`
  let required = props.required ? {'required': true} : null

  return (
    <div className={classes}>
      <label className='form-label' htmlFor={props.id}>{props.label}
        {props.supporting && <FormHint>{props.supporting}</FormHint>}
      </label>
      <textarea className='form-control form-control-full form-control--reversed' id={props.id} name={props.name} rows={props.rows} defaultValue={props.value} {...required}></textarea>
    </div>
  )
}

Textarea.propTypes = {
  id: PropTypes.string
}

Textarea.defaultProps = {
  rows: 5,
  value: ''
}

export default Textarea

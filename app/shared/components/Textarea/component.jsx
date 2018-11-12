import React from 'react'
import FormHint from '../FormHint/component.jsx'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../FormErrors/component'

const Textarea = props => {
  let classes = `form-group ${props.className || ''}`
  let required = props.required ? {'required': true} : null

  return (
    <div className={classes}>
      <label className='form-label' htmlFor={props.id}>{props.label}
        {props.supporting && <FormHint>{props.supporting}</FormHint>}
      </label>
      {props.hint && <FormHint>{props.hint}</FormHint>}
      {props.error && <ErrorMessage message={props.error} />}
      <textarea className='form-control form-control-full form-control--reversed' id={props.id} name={props.name} rows={props.rows} value={props.value} onChange={props.onChange} {...required} />
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

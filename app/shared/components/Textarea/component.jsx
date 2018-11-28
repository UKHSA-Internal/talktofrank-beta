import React from 'react'
import FormHint from '../FormHint/component.jsx'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../FormErrors/component'
import classNames from 'classnames'

const Textarea = props => {
  let classes = `form-group ${props.className || ''}`
  let required = props.required ? {'required': true} : null
  let error = props.error ? {'aria-invalid': true} : null
  let textareaClassNames = classNames('form-control form-control-full form-control--reversed', {
    'is-invalid': props.error
  })

  return (
    <div className={classes}>
      <label className='form-label' id={`${props.id}-label`} htmlFor={props.id}>{props.label}
        {props.supporting && <FormHint>{props.supporting}</FormHint>}
      </label>
      {props.hint && <FormHint id={props.hintId}>{props.hint}</FormHint>}
      {props.error && <ErrorMessage message={props.error}/>}
      <textarea className={textareaClassNames} id={props.id} aria-describedby={props.hintId} name={props.name} rows={props.rows} {...error} value={props.value} onChange={props.onChange} {...required} />
    </div>
  )
}

Textarea.propTypes = {
  id: PropTypes.string
}

Textarea.defaultProps = {
  rows: 5,
  value: '',
  hintId: null
}

export default Textarea

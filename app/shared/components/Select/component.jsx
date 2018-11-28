import React from 'react'
import FormHint from '../FormHint/component.jsx'
import { ErrorMessage } from '../FormErrors/component'

const Select = props => {
  let options = props.options.map((val, i) => {
    return <option value={val.value} key={i}>{val.label}</option>
  })

  return (
    <div className='form-group'>
      <label className='form-label' id={`${props.id}-label`} htmlFor={props.id}>{props.label}{props.supporting && <FormHint inline={true}>{props.supporting}</FormHint>}</label>
      {props.hint && <FormHint>{props.hint}</FormHint>}
      {props.error && <ErrorMessage message={props.error} />}
      <select className={`form-control ${props.className}`} id={props.id} name={props.name} value={props.selected || null} onChange={props.onChange || null}>
        {options}
      </select>
    </div>
  )
}

export default Select

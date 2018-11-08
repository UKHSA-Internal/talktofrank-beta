import React from 'react'
import FormHint from '../FormHint/component.jsx'

const Select = props => {
  let options = props.options.map((val, i) => {
    return <option value={val.value} key={i}>{val.label}</option>
  })

  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={props.id}>{props.label}{props.supporting && <FormHint>{props.supporting}</FormHint>}</label>
      <select className={`form-control ${props.className || ''}`} id={props.id} name={props.name} value={props.selected || ''} onChange={props.onChange || null} >
        {options}
      </select>
    </div>
  )
}

export default Select

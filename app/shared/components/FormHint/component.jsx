import React from 'react'

const FormHint = props => {
  return (
    <span className='form-hint' dangerouslySetInnerHTML={{__html: props.children}} />
  )
}

export default FormHint

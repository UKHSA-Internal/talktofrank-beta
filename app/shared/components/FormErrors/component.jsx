import React from 'react'

export const ErrorSummary = ({errors}) => {

  if (!errors) {
    return null
  }

  return (
    <div>
      <h3>There is a problem</h3>
      <ul>
        {errors.map(error => (
          <li><a href={`#${error.field}`}>{error.message}</a></li>
        ))}
      </ul>
    </div>
  )
}

ErrorSummary.defaultProps = {
  errors: []
};


export const ErrorMessage = ({message}) => (
  <div className="invalid-feedback">{message}</div>
)

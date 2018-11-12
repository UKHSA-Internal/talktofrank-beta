import React from 'react'

export const getErrors = (formErrors) => {
  let errors = []
  formErrors.forEach(error => {
    errors[error.field] = error.message
  })
  return errors
}

export class ErrorSummary extends React.Component {
  render() {
    let { errors } = this.props

    if (!errors) {
      return null
    }

    // Joi duplicates ErrorSummary
    let seen = {}
    errors = errors.filter((item) => {
      return seen.hasOwnProperty(item.field) ? false : (seen[item.field] = true)
    })

    return (
      <div className="alert alert-danger">
        <strong>There is a problem</strong>
        <ul>
          {errors.map(error => (
            <li><a href={`#${error.field}`}>{error.message}</a></li>
          ))}
        </ul>
      </div>
    )
  }
}

ErrorSummary.defaultProps = {
  errors: []
}

export const ErrorMessage = ({message}) => (
  <div className="invalid-feedback">{message}</div>
)

import React from 'react'

const SuccessMessage = () => (
  <div className="alert alert-success" role="alert">
    {this.props.children}
  </div>
)

export default SuccessMessage

import React from 'react'

const Longform = props => {
  let {text, className} = props
  let classes = `long-form ${className || ''}`

  return (
    <React.Fragment>
      {text && <div className={classes} dangerouslySetInnerHTML={{__html: text}} />}
    </React.Fragment>
  )
}

export default Longform

import React from 'react'

const Longform = props => {
  let {text, modifiers} = props
  let classes = `long-form ${props.className || ''}`

  return (
    <React.Fragment>
      {text && <div className={classes} dangerouslySetInnerHTML={{__html: text}} />}
    </React.Fragment>
  )
}

export default Longform

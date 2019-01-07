import React from 'react'

const Main = props => {
  let classes = `main main--full-width ${props.className || ''}`
  return (
    <main className={classes} id='main' tabIndex='-1'>
      {props.children}
    </main>
  )
}

export default Main

import React from 'react'

const Main = props => {
  let classes = `main ${props.className || ''}`
  return (
    <main className={classes} id='main' name='main'>
      {props.children}
    </main>
  )
}

export default Main

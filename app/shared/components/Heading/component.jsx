import React from 'react'

const Heading = props => {
  const Tag = `${props.type || 'h2'}`
  return (
    <Tag className={props.className} id={props.id || null} dangerouslySetInnerHTML={{__html: props.text}}></Tag>
  )
}

export default Heading

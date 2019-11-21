import React from 'react'

const Heading = props => {
  const Tag = `${props.type}`
  const index = props.tabIndex ? {'tabIndex': props.tabIndex} : null
  return (
    <Tag className={props.className} {...index} id={props.id} dangerouslySetInnerHTML={{__html: props.text}}></Tag>
  )
}

Heading.defaultProps = {
	id: null,
	type: 'h2'
}

export default Heading

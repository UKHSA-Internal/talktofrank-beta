import React from 'react'
import Heading from '../Heading/component'

const ResultDrug = props => {
  // ES doesn't allow null values on completion fields, hence having to
  // duplicate name/real name
  let name = props.item.realName && props.item.realName !== props.item.name
    ? `${props.item.name} (${props.item.realName})`
    : props.item.name
  if (props.highlight && props.highlight.synonyms) {
    name = `${props.highlight.synonyms[0]} (${props.item.name})`
  }

  return (
    <li key={props.item.id} className='list-item list-item--dotted'>
      <a href={`/drug/${props.item.slug}`}>
        <Heading type={'h4'} text={name} />
      </a>
    </li>
  )
}

export default ResultDrug

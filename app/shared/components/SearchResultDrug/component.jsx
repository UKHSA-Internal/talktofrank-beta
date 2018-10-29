import React from 'react'

const ResultDrug = props => {
  // ES doesn't allow null values on completion fields, hence having to
  // duplicate name/real name
  let synonyms
  let name = props.item.name

  if (props.item.realName && props.item.realName !== props.item.name) {
    synonyms = props.item.realName
  }

  if (props.highlight && props.highlight.synonyms) {
    name = props.highlight.synonyms[0]
    synonyms = props.item.name
  }

  return (
    <a href={`/drug/${props.item.slug}`} className='list-link'>
      <h3 className='h5 d-inline-block spacing-bottom--flush spacing-right'><span className='inverted '>{name}</span></h3>
      {synonyms && <p className='grey d-inline-block'>({synonyms})</p>}
    </a>
  )
}

export default ResultDrug

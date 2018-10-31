const truncate = require('lodash.truncate')
import React from 'react'

const ResultDrug = props => {
  // ES doesn't allow null values on completion fields, hence having to
  // duplicate name/real name
  let synonyms
  let name = props.item.name
  let invertedMuted = false

  if (props.item.realName && props.item.realName !== props.item.name) {
    synonyms = props.item.realName
  }

  if (props.highlight && props.highlight.synonyms) {
    name = props.highlight.synonyms[0]
    synonyms = props.item.name
  }

  if (props.prefix
    && props.searchTerm && props.searchTerm.split(' ').length < 2) {
    
    invertedMuted = true
    const regexp = new RegExp('(' + props.searchTerm + ')', 'i')
    // prevent rerender happening whilst data is loading
    if (!regexp.test(name)) {
      return null
    }
    name = name.replace(regexp, '<span class=\'white\'>$&</span>')
  }

  return (
    <a href={`/drug/${props.item.slug}`} className='list-link'>
      <h3 className='h5 d-inline-block spacing-bottom--flush spacing-right'>
        <span className={`inverted ${invertedMuted ? 'inverted--muted' : null}`} dangerouslySetInnerHTML={{ __html: name}} />
      </h3>
      {synonyms && <p className='grey d-inline-block'>({synonyms})</p>}
      {props.summary &&
        <p>{ truncate(props.item.description, {
          'length': 100
        })}</p>
      }
    </a>
  )
}

export default ResultDrug

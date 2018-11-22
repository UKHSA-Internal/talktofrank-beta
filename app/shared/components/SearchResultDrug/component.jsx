import React from 'react'
const truncate = require('lodash.truncate')

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

  if (props.prefix &&
    props.searchTerm && props.searchTerm.split(' ').length < 2) {
    const regexp = new RegExp('(' + props.searchTerm + ')', 'i')
    if (name.match(regexp)) {
      invertedMuted = true
      name = name.replace(regexp, '<span class=\'white\'>$&</span>')
    }
  }

  const Tag = `${props.tag || 'h2'}`

  return (
    <a href={`/drug/${props.item.slug}`} className='list-link has-arrow'>
      <Tag className='list-link__title'>
        <span className={`inverted ${invertedMuted ? 'inverted--muted' : null}`} dangerouslySetInnerHTML={{ __html: name }} />
      </Tag>
      {synonyms && <p className='grey d-inline-block'>({synonyms})</p>}
      {props.summary &&
        <p className='break-word'>{ truncate(props.item.description, {
          'length': 100
        })}</p>
      }
    </a>
  )
}

export default ResultDrug

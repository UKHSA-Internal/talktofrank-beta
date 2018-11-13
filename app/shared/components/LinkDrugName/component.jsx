import React from 'react'
import PropTypes from 'prop-types'

const LinkDrugName = props => {
  return (
    <li className='list-item list-item--underlined'>
      <a href={`/drug/${props.slug}?a=${props.name}`} className='list-link'><h3 className='h5 d-inline-block spacing-right'><span className='inverted '>{props.name}</span></h3>
      {props.synonyms && <p className='grey d-inline-block'>({props.synonyms})</p>}{props.realName && <p className='grey d-inline-block'>({props.realName})</p>}
      {props.description && <p><span className='muted'>{props.description}</span></p>}
      </a>
    </li>
  )
}

LinkDrugName.defaultProps = {
  synonyms: undefined,
  realName: undefined,
  description: undefined
}

export default LinkDrugName

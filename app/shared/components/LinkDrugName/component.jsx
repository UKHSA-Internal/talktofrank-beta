import React from 'react'
import PropTypes from 'prop-types'
import Heading from '../Heading/component.jsx'

const LinkDrugName = props => {
  return (
    <li className="list-item list-item--underlined">
      <a href={`/drug/${props.slug}?a=${props.name}`} className="list-link">
        <h3 className="list-link__title">
          <span className="inverted">{props.name}</span>
        </h3>
        {props.synonyms && (
          <p className="grey d-inline-block">({props.synonyms})</p>
        )}
        {props.realName && (
          <p className="grey d-inline-block">({props.realName})</p>
        )}
        {/* {props.description && <Heading type='div' text={`<div className='muted'>${props.description}</div>`}/>} */}
      </a>
    </li>
  )
}

LinkDrugName.defaultProps = {
  synonyms: null,
  realName: null,
  description: null
}

export default LinkDrugName

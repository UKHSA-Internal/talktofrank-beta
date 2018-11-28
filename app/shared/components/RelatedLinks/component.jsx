import React from 'react'
import Heading from '../Heading/component'
import PropTypes from 'prop-types'

const RelatedLinks = props => {
  return (
    <React.Fragment>
      <Heading text='Related links' className={props.className} type={props.type}/>
      <ul className='list-unstyled link-list link-list--has-arrow'>
      {props.links
        .filter(v => v.sys)
        .map((v, i) => {
          let slug = v.sys.contentType.sys.id === 'generalPage' ? `/${v.fields.slug}` : `/${v.sys.contentType.sys.id}/${v.fields.slug}`
          return (
            <li className='link-list__item' key={i}>
              <a href={slug} className='link-list__link'>{v.fields.title}{v.fields.drugName}</a>
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

RelatedLinks.defaultProps = {
  type: 'h2',
  className: 'h4 spacing-top--large'
}

export default RelatedLinks

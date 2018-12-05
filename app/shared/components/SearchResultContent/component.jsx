import React from 'react'
import Heading from '../Heading/component'

const ResultContent = props => (
  <a className='list-link has-arrow' href={props.item.type === 'news' ? `/news/${props.item.slug}` : `/${props.item.slug}`} >
    <Heading type={props.tag} className='list-link__title' text={props.item.title} />
  </a>
)

export default ResultContent

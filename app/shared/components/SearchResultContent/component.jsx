import React from 'react'

const ResultContent = props => (
  <a className="list-link has-arrow" href={props.item.type === 'news' ? `/news/${props.item.slug}` : props.item.slug} >
    <h3 className='list-item__title h5 d-inline-block'>
      {props.item.title}
    </h3>
  </a>
)

export default ResultContent

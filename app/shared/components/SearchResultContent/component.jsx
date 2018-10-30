import React from 'react'

const ResultContent = props => (
  <a href={props.item.type === 'news' ? `/news/${props.item.slug}` : props.item.slug} >
    <h3 className='h5'>{props.item.title}</h3>
    <p className='grey'>{props.item.type}</p>
  </a>
)

export default ResultContent

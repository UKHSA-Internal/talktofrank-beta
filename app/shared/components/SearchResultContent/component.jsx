import React from 'react'

const ResultDrug = props => (
  <a href={props.item.type === 'news' ? `/news/${props.item.slug}` : props.item.slug} >
    <h3 className='h5 d-inline-block spacing-right'><span className='inverted '>{props.item.title}</span></h3>
    <p className='grey d-inline-block'>{props.item.type}</p>
  </a>
)

export default ResultDrug

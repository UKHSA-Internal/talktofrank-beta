import React from 'react'
import Heading from '../Heading/component'

const ResultDrug = props => (
  <li key={props.item.id} className='list-item list-item--dotted'>
    <a href={props.item.type === 'news' ? `/news/${props.item.slug}` : props.item.slug} >
      <Heading type={'h4'} text={props.item.title} />
    </a>
    <p>{props.item.type}</p>
  </li>
)

export default ResultDrug
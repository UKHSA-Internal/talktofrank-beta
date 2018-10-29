import React from 'react'
import Picture from '../Picture/component.jsx'
import Longform from '../Longform/component.jsx'
import Time from '../Time/component.jsx'

const Article = props => {
  const Tag = `${props.type || 'div'}`
  return (
    // eslint-disable-next-line no-self-compare
    <Tag className={`list-item ${props.fields.image ? ('list-item--has-image' + (props.fields.imagepos & 1 === 1 ? ' list-item--alternate' : '')) : ''} `} >
      <a className='list-item__link' href={`/news/${props.fields.slug}`}>
        {props.fields.image && <Picture {...props.fields.image}/>}
        <div className='list-item__inner'>
          <h2 className='list-item__title h3 heading-inline'><span>{props.fields.title}</span><span className='has-arrow'></span></h2>
          {props.date && <Time time={props.dateFormatted} dateTime={props.date}/>}
          {props.fields.bodyLegacy && !props.fields.image && <Longform text={props.fields.bodyLegacy}/>}
          {props.fields.summary && !props.fields.image && <Longform text={props.fields.summary}/>}
          <p className='read-more' aria-hidden='true'>Read more</p>
        </div>
      </a>
    </Tag>
  )
}

export default Article


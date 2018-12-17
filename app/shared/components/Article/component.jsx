import React from 'react'
import Picture from '../Picture/component.jsx'
import Longform from '../Longform/component.jsx'
import Time from '../Time/component.jsx'
import Heading from '../Heading/component.jsx'
import PropTypes from 'prop-types'
import isEmpty from 'lodash.isempty'

const Link = ({ href, children }) => (href !== null
  ? <a href={href} className='list-item__link'>
      {children}
    </a>
  : children
)

const Article = props => {
  const Tag = props.type

  let hasImage = !isEmpty(props.fields.image)

  return (
    // eslint-disable-next-line no-self-compare
    <Tag className={`list-item ${hasImage ? ('list-item--has-image' + (props.fields.imagepos & 1 === 1 ? ' list-item--alternate' : '')) : ''} `} >
      <Link href={props.fields.slug ? `/news/${props.fields.slug}` : null}>
        {hasImage && <Picture {...props.fields.image}/>}
        <div className={`list-item__inner${props.fields.slug == null ? ' list-item__inner--indented' : ''}`}>
          <Heading type={props.fields.type} className='list-item__title h3 heading-inline' text={`<span>${props.fields.title}</span>`}/>
          {props.date && <Time time={props.dateFormatted} dateTime={props.date}/>}
          {props.fields.summary && !hasImage && <Longform text={props.fields.summary}/>}
          {(props.fields.slug && !hasImage) && <p className='link-text' aria-hidden='true'>Read more</p>}
        </div>
      </Link>
    </Tag>
  )
}

Article.defaultProps = {
  type: 'div'
}

export default Article

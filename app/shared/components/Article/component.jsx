import React from 'react'
import Picture from '../Picture/component.jsx'
import AmpPicture from '../AmpPicture/component.jsx'
import Longform from '../Longform/component.jsx'
import Time from '../Time/component.jsx'
import Heading from '../Heading/component.jsx'
import Svg from '../Svg/component.jsx'
import Play from '../Play/component.jsx'
import PropTypes from 'prop-types'

const Link = ({ href, children }) => (href !== null
  ? <a href={href} className='list-item__link'>
      {children}
    </a>
  : children
)

const Article = props => {
  const Tag = props.type
  const video = props.fields.headerVideo

  return (
    // eslint-disable-next-line no-self-compare
    <Tag className={`list-item ${props.fields.image ? ('list-item--has-image' + (props.fields.imagepos & 1 === 1 ? ' list-item--alternate' : '')) : ''} `} >
      <Link href={props.fields.slug ? `/news/${props.fields.slug}` : null}>
        {props.isAmp ? props.fields.image && <AmpPicture video={video} {...props.fields.image}/> : props.fields.image && <Picture video={video} className={props.fields.headerVideo ? 'has-video' : ''} {...props.fields.image}/>}
        <div className={`list-item__inner${props.fields.slug == null ? ' list-item__inner--indented' : ''}`}>
          <Heading type={props.fields.type} className='list-item__title h3 heading-inline' text={`<span>${props.fields.title}</span>`}/>
          {props.date && <Time time={props.dateFormatted} dateTime={props.date}><Play className='hidden--sm-up icon--offset'/></Time>}
          {props.fields.summary && !props.fields.image && <Longform text={props.fields.summary}/>}
          {(props.fields.slug && !props.fields.image) && <p className='link-text' aria-hidden='true'>Read more</p>}
        </div>
      </Link>
    </Tag>
  )
}

Article.defaultProps = {
  type: 'div',
  headerVideo: null
}

export default Article

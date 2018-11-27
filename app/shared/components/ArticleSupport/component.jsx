import React from 'react'
import Longform from '../Longform/component.jsx'
import Heading from '../Heading/component.jsx'
import Anchor from '../Anchor/component.jsx'
import Svg from '../Svg/component.jsx'

const ArticleSupport = props => {
  return (
    <li className='list-item list-item--underlined spacing--single media' >
      <Svg className='media__item' url='/ui/svg/location.svg'/>
      <div className='media__content'>
        <Anchor className='list-item__link' href={`/treatment-centre/${props.slug}`}>
          <Heading className='h3' text={props.text}/>
        </Anchor>
        <p><strong>{props.distance} mile{props.distance !== '1.0' ? 's' : ''} away</strong>
        <Heading type='p' text={props.address}/></p>
        <Longform text={props.summary} className='spacing--single'/>
        <ul class='list-inline spacing--single'>
          {props.phone && <li class='list-inline-item'><Anchor text={props.phone} label={`Telephone ${props.text}`} className='break-word link-text' href={`tel:${props.phoneRaw}`} /></li>}
          {props.email && <li class='list-inline-item'><Anchor text='Send email' label={`Send email to ${props.text}`} className='break-word link-text' href={`mailto:${props.email}`} /></li>}
          {props.website && <li class='list-inline-item'><Anchor text='Visit website' label={`Visit ${props.text} website`} className='break-word link-text' href={props.website} /></li>}
        </ul>
      </div>
    </li>
  )
}

export default ArticleSupport

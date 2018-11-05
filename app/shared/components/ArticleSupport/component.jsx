import React from 'react'
import Longform from '../Longform/component.jsx'
import Heading from '../Heading/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Anchor from '../Anchor/component.jsx'

const ArticleSupport = props => {
  const Tag = `${props.type || 'div'}`
  return (
    <Tag className='list-item list-item--underlined spacing--large' >
      <Anchor className='list-item__link' href={`/support-near-you/${props.slug}`}>
        <Heading text={props.text}/>
      </Anchor>
      <Heading type='p' className='h3' text={`(${props.distance})`}/>
      <Grid>
        <GridCol className='col-12 col-md-8'>
          <Longform text={props.summary}/>
          {props.address && <address className='lead spacing--tight' dangerouslySetInnerHTML={{__html: props.address}}/>}
        </GridCol>
        <GridCol className='col-12 col-md-4'>
          {props.phone && <p><Anchor text={`Phone: ${props.phone}`} className='break-word' href={`tel:${props.phoneRaw}`} /></p>}
          {props.email && <p><Anchor text='Email' className='break-word' href={`mailto:${props.email}`} /></p>}
          {props.website && <p><Anchor text='Website' className='break-word' href={props.website} /></p>}
        </GridCol>
      </Grid>
    </Tag>
  )
}

export default ArticleSupport

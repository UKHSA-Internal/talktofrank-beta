import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Longform from '../Longform/component.jsx'
import Button from '../Button/component.jsx'
import Accent from '../Accent/component.jsx'
import Anchor from '../Anchor/component.jsx'
import Icon from '../Icon/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Divider from '../Divider/component.jsx'

export default class PageSupport extends React.PureComponent {
  render () {
    const icon = {
      className: 'icon icon--external',
      url: '/ui/svg/external.svg',
      alt: '',
      label: 'External link'
    }
    const {
      name,
      email,
      website,
      telephone1,
      address1,
      address2,
      address3,
      town,
      county,
      postCode,
      serviceInfo,
      referralMethod,
      timesSessions,
      catchmentArea
    } = this.props.pageData.fields
    const phoneRaw = telephone1.replace(/\D/g, '')
    const address = [address1, address2, address3, town, county, postCode].filter(Boolean).join(', ')

    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text={name}/>
        </Accent>
        <Main>
          <Grid>
            <GridCol className='col-12 offset-md-1 col-sm-7 col-md-6'>
              <Heading className='h4' text='Information' />
              <Longform text={serviceInfo}/>
              <Divider className='hr--muted hr--large'/>
              <Heading className='h4' text='Referral' />
              <Longform text={referralMethod}/>
              <Divider className='hr--muted hr--large'/>
              <Heading className='h4' text='Catchment' />
              <Heading type='p' text={catchmentArea} />
              <Divider className='hr--muted hr--large'/>
              <div className='hidden--xs' aria-hidden='true'>
                <Heading className='h4' text='Get in touch' />
                {telephone1 && <p class='list-item'><Anchor text={telephone1} label={`Telephone ${name} on ${telephone1}`} className='link-text' href={`tel:${phoneRaw}`} /></p>}
              </div>
            </GridCol>
            <GridCol className='col-12 col-sm-4 col-md-3 spacing-bottom--single sm-spacing-bottom--large offset-md-1'>
              <Heading className='h4' text='Get in touch' />
              <ul class='list-unstyled list-unstyled--single'>
                {telephone1 && <li class='list-item'><Anchor text={`Telephone ${name} on ${telephone1}`} className='break-word link-text' href={`tel:${phoneRaw}`} /></li>}
                {email && <li class='list-item'><Anchor text='Send email' label={`Send email to ${name}`} className='break-word link-text' href={`mailto:${email}`} /></li>}
                {website && <li class='list-item'><Anchor text='Visit website' label={`Visit ${name} website`} className='break-word link-text' href={website} /></li>}
              </ul>
              <Divider className='hr--muted hr--large'/>
              <Heading className='h4' text='Opening times' />
              <Heading type='p' text={timesSessions} />
              <Divider className='hr--muted hr--large'/>
              <Heading className='h4' text='Address' />
              <Longform text={address}/>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`} aria-label={`View ${name} on Google maps`} className='link has-icon spacing-bottom--single sm-spacing-bottom--large'><span className='link__text link__text--right'>View on map</span> <Icon {...icon}/></a>
              <div className='hidden--sm-up' aria-hidden='true'>
                <Divider className='hr--muted hr--large'/>
                <Heading className='h4' text='Get in touch' />
                {telephone1 && <p class='list-item'><Anchor text={telephone1} label={`Telephone ${name} on ${telephone1}`} className='link-text' href={`tel:${phoneRaw}`} /></p>}
              </div>
            </GridCol>
          </Grid>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

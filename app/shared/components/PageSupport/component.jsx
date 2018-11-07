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

export default class PageSupport extends React.PureComponent {
  render () {
    const text = 'The specific name of the support centre'
    const phone = '0117 904 4366'
    const phoneRaw = '01179044366'
    const email = 'enquiries@chrysalissupportedassociationltd.co.uk'
    const website = 'www.chrysalissupportedassociationltd.co.uk'
    const address = '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL'
    const text1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis vulputate urna, sed feugiat nibh. Nulla sapien velit, volutpat nec odio viverra, consectetur finibus metus. Etiam accumsan fringilla ligula. Phasellus in egestas dolor, vitae bibendum lorem. Maecenas ut nisl nulla. Phasellus vitae gravida augue, non tincidunt enim. Quisque fermentum cursus mi vel viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec elementum velit quis justo consequat, a mollis nibh aliquam. Mauris ac sodales risus. Maecenas ac consectetur sem, vel dignissim neque. Suspendisse augue nunc, maximus sit amet purus sed, rutrum feugiat risus.'
    const icon = {
      className: 'icon icon--external',
      url: '/ui/svg/external.svg',
      alt: '',
      label: 'External link'
    }

    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text={text}/>
        </Accent>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-7'>
              <Heading className='h4' text='Information' />
              <Longform text={text1} className='spacing-bottom--large'/>
              <Heading className='h4' text='Referral' />
              <Longform text={text1} className='spacing-bottom--large'/>
            </GridCol>
            <GridCol className='col-12 col-sm-4 offset-sm-1'>
              <Heading className='h4' text='Get in touch' />
              <ul class='list-unstyled list-unstyled--single spacing-bottom--large'>
                {phone && <li class='list-item'><Anchor text={phone} label={`Telephone ${text}`} className='break-word link-text' href={`tel:${phoneRaw}`} /></li>}
                {email && <li class='list-item'><Anchor text='Send email' label={`Send email to ${text}`} className='break-word link-text' href={`mailto:${email}`} /></li>}
                {website && <li class='list-item'><Anchor text='Visit website' label={`Visit ${text} website`} className='break-word link-text' href={website} /></li>}
              </ul>

              <Heading className='h4' text='Address' />
              <Longform text={address} className='spacing-bottom--large'/>
              <a href='https://goole.com' aria-label={`View ${text} location on Google maps`} className='link has-icon'><span className='link__text link__text--right'>View on map</span> <Icon {...icon}/></a>

              <Heading className='h4' text='Catchment' />
              <p>Bristol and surrounding areas</p>
            </GridCol>
          </Grid>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

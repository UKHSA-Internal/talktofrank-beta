import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Main from '../Main/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Accent from '../Accent/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Longform from '../Longform/component.jsx'
import Panel from '../Panel/component.jsx'
import Icon from '../Icon/component.jsx'
import Anchor from '../Anchor/component.jsx'

export default class PageContact extends React.PureComponent {
  render () {
    const icons = [
      {
        label: 'Phone',
        className: 'icon icon--phone-inverted',
        url: '/ui/svg/telephone-pink.svg',
        alt: ''
      },
      {
        label: 'Chat',
        className: 'icon icon--chat',
        url: '/ui/svg/chat.svg',
        alt: ''
      },
      {
        label: 'Email',
        className: 'icon icon--email',
        url: '/ui/svg/email.svg',
        alt: ''
      },
      {
        label: 'Live Chat',
        className: 'icon icon--phone-inverted',
        url: '/ui/svg/livechat.svg',
        alt: ''
      }

    ]

    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text='Need some friendly advice?'/>
        </Accent>
        <Main className='main--muted main--full-width'>
          <Accent>
            <Grid>
              <GridCol className='col-12 col-sm-7 col-md-6 offset-md-2'>
                <ul className='list-unstyled'>
                  <li className='list-item list-item--underlined spacing--single' >
                    <h2 className='h6'><Icon {...icons[0]}/> Call <Anchor className='link-text' label='Click to phone FRANK on 0300 123 6600' href='tel:03001236600' text='0300 123 6600'/></h2>
                    <p>Call FRANK 24 hours a day, 7 days a week.</p>
                  </li>
                  <li className='list-item list-item--underlined spacing--single' >
                    <h2 className='h6'><Icon {...icons[1]}/> Text <Anchor className='link-text' label='Text FRANK on 82111' href='sms:82111' text='82111'/></h2>
                    <p>Text a question and FRANK will text you back.</p>
                  </li>
                  <li className='list-item list-item--underlined spacing--single' >
                    <h2 className='h6'><Icon {...icons[2]}/> Send <Anchor className='link-text' label='Send an email to FRANK at ' href='sms:82111' text='an email'/></h2>
                    <p>Send an email and FRANK will message you back.</p>
                  </li>
                </ul>
              </GridCol>
              <GridCol className='col-12 col-sm-5 col-md-4'>
                <Panel>
                  <Icon className='spacing-bottom--tight' {...icons[3]}/>
                  <h2 className='h4'><span className='icon icon--circle icon--circle-red'></span>Live chat <span className='quieter'>(online)</span></h2>
                  <p>Our live chat service operates from 2pm - 6pm, 7 days a week.</p>
                  <p><Anchor className='link-text' label='Click to start live chat' href='#' text='Get started'/></p>
                </Panel>
              </GridCol>
            </Grid>
          </Accent>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

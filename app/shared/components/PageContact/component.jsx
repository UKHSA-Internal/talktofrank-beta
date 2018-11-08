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
import Collapsible from '../Collapsible/component.jsx'

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
        label: 'Live Chat - online',
        className: 'icon icon--live-chat spacing-bottom--tight',
        url: '/ui/svg/livechat.svg',
        alt: ''
      },
      {
        label: 'Live Chat - offline',
        className: 'icon icon--live-chat spacing-bottom--tight',
        url: '/ui/svg/livechat-offline.svg',
        alt: ''
      }
    ]

    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text='Need some friendly advice?'/>
        </Accent>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-7 col-md-6 offset-md-1'>
              <ul className='list-unstyled'>
                <li className='list-item list-item--underlined spacing--single' >
                  <h2 className='h6 spacing--single'><Icon {...icons[0]}/> Call <Anchor className='link-text' label='Click to phone FRANK on 0300 123 6600' href='tel:03001236600' text='0300 123 6600'/></h2>
                  <p>Call FRANK 24 hours a day, 7 days a week.</p>
                  <Collapsible text='Call service details' id='call-service-details'>
                    <p>For people with hearing impairments, you can textphone FRANK on 0300 123 1099.</p>
                    <p>If you call when your friends are around we may ask you to call back when you're on your own.</p>
                    <p>Calls from a landline cost no more than a normal national call (to an 01 or 02 number). The calls may show up on the bill.</p>
                    <p>Calls from a mobile phone vary in cost depending on what network you’re on. The call may show up on the bill.</p>
                    <p>You can talk to FRANK in 120 languages – just call the same number and an interpreter will be there if you want.</p>
                  </Collapsible>
                </li>
                <li className='list-item list-item--underlined spacing--single' >
                  <h2 className='h6 spacing--single'><Icon {...icons[1]}/> Text <Anchor className='link-text' label='Text FRANK on 82111' href='sms:82111' text='82111'/></h2>
                  <p>Text a question and FRANK will text you back.</p>
                  <Collapsible text='Text service details' id='text-service-details'>
                    <p>The cost of sending a text to FRANK is the same as a standard text message - which will depend on your network tariff. There is no charge for receiving text messages from FRANK. Please don't send picture messages as FRANK can't view them.</p>
                    <p>Remember you can always call or email FRANK anytime if you need more information and advice about drugs.</p>
                    <p>The information you give to FRANK will only be used for internal training and improving the service. It will not be passed to other organisations or third parties that are not directly connected with FRANK and you will not receive more communication from FRANK unless you have asked for it.</p>
                  </Collapsible>
                </li>
                <li className='list-item list-item--underlined spacing--single' >
                  <h2 className='h6 spacing--single'><Icon {...icons[2]}/> Send <Anchor className='link-text' label='Send an email to FRANK at ' href='sms:82111' text='an email'/></h2>
                  <p>Send an email and FRANK will message you back.</p>
                  <Collapsible text='Email service details' id='email-service-details'>
                    <p>The reply will come from frank@talktofrank.com and the subject line won't have your question in it.</p>
                    <p>FRANK will only ever reply to you. You'll never receive an email you didn't ask for.</p>
                    <p>If you're worried about someone reading your messages, you can always set up a special email account with something like Gmail or Yahoo.</p>
                  </Collapsible>
                </li>
              </ul>
            </GridCol>
            <GridCol className='col-12 col-sm-5 col-md-4 offset-md-1'>
              <Panel>
                <Icon {...icons[3]}/>
                <h2 className='h4'><span className='icon icon--circle icon--circle-red'></span>Live chat <span className='quieter'>(online)</span></h2>
                <p>Our live chat service operates from 2pm - 6pm, 7 days a week.</p>
                <p><Anchor className='link-text' label='Click to start live chat' href='#' text='Get started'/></p>
              </Panel>
              <Panel>
                <Icon {...icons[4]}/>
                <h2 className='h4'><span className='icon icon--circle'></span>Live chat <span className='quieter'>(offline)</span></h2>
                <p>Our live chat service operates from 2pm - 6pm, 7 days a week.</p>
              </Panel>
            </GridCol>
          </Grid>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

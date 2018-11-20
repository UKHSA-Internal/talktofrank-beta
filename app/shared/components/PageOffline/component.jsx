import React from 'react'
import Footer from '../Footer/component'
import GA from '../GoogleAnalytics/component'
import Heading from '../Heading/component'
import Longform from '../Longform/component'
import Masthead from '../Masthead/component'
import Main from '../Main/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import { isInBrowser } from '../../utilities'

const PageOffline = () => {
  if (isInBrowser()) {
    setTimeout(() => window.location.reload(true), 30000)
  }
  return (
    <React.Fragment>
      <Masthead path={'no-match'}/>
      <Main>
        <Grid>
          <GridCol className='col-12 col-md-2 spacing-bottom--single'>
            <Svg url='/ui/svg/magnifying-large.svg' alt=''/>
          </GridCol>
          <GridCol className='col-12 col-md-8'>
            <Heading type='h1' className='h2' text={'You\'re offline'} />
            <p>
              It looks like you're offline.  You can still talk to Frank by calling us on
              {' '}<a href='tel:03001236600'>0300 123 6600</a>
            </p>
            <Heading type='h3' className='h5' text='Perhaps try...'/>
            <ul>
              <li>Checking your Wi-Fi</li>
              <li>Checking your mobile data</li>
            </ul>
            <Divider className='hr--muted hr--large' />
            <Heading type='h3' className='h5' text='Other ways to get in touch...'/>
            <p><Anchor className='link-text' href='tel:03001236600' label='Call FRANK on 0300 123 6600'>Call: 0300 123 6600</Anchor></p>
            <p><Anchor className='link-text' href='sms:82111' label='Text FRANK on 82111'>Text: 82111</Anchor></p>
            <p><Anchor className='link-text' href='mailto:frank@talktofrank.com' label='Send an email to FRANK at frank@talktofrank.com'>frank@talktofrank.com</Anchor></p>
          </GridCol>
        </Grid>
      </Main>
      <Footer/>
      <GA/>
    </React.Fragment>
  )
}

export default PageOffline

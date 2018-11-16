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
          <GridCol className='col-12 col-sm-8 offset-md-2'>
            <Heading type='h1' className='h2' text={'You\'re offline'} />
            <p>
              It looks like you're offline.  You can still talk to Frank by calling us on
              {' '}<a href='tel:03001236600'>0300 123 6600</a>
            </p>
            <h5>Perhaps try...</h5>
            <ul>
              <li>Checking your Wi-Fi</li>
              <li>Checking your mobile data</li>
            </ul>
            <hr className='light-grey' />
            <h5>Other ways to get in touch...</h5>
            <p><a className='link-text' href="sms:82111">Text: 82111</a></p>
            <p><a className='link-text' href="mailto:frank@talktofrank.com">frank@talktofrank.com</a></p>
          </GridCol>
        </Grid>
      </Main>
      <Footer/>
      <GA/>
    </React.Fragment>
  )
}

export default PageOffline

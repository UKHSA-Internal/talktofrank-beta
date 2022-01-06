import React from 'react'
import Footer from '../Footer/component'
import Heading from '../Heading/component'
import Longform from '../Longform/component'
import Masthead from '../Masthead/component'
import Accent from '../Accent/component'
import Main from '../Main/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import HelpPanels from '../HelpPanels/component'
import MatomoAnalytics from '../MatomoAnalytics/component'

const PageNotFound = () => {
  const text = '<p>If you entered a web address please check it was correct.</p>' +
    '<p>You can also <a href="/contact-frank">contact Talk to Frank</a> or ' +
    '<a href="/">browse from the homepage</a> to find the information you need.</p>'

  return (
    <React.Fragment>
      <Masthead path={'no-match'}/>
      <Main>
        <Accent className='accent--shallow spacing-top--single' modifier='wrapper--constant'>
          <Heading type='h1' className='h2' text='Page not found' />
        </Accent>
        <Accent className='accent--shallow'>
          <Grid>
            <GridCol className='col-12 col-sm-8 offset-md-2'>
              <Longform text={text} />
            </GridCol>
          </Grid>
        </Accent>
        <HelpPanels />
      </Main>
      <Footer/>
      <MatomoAnalytics />
    </React.Fragment>
  )
}

export default PageNotFound

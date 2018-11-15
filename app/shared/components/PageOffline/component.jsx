import React from 'react'
import Footer from '../Footer/component'
import GA from '../GoogleAnalytics/component'
import Heading from '../Heading/component'
import Longform from '../Longform/component'
import Masthead from '../Masthead/component'
import Main from '../Main/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'

const PageOffline = () => {
  const text = '<p>OFFLINE</p>'

  return (
    <React.Fragment>
      <Masthead path={'no-match'}/>
      <Main>
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <Heading type='h1' className='h2' text='OFFLINE' />
            <Longform text={text} />
          </GridCol>
        </Grid>
      </Main>
      <Footer/>
      <GA/>
    </React.Fragment>
  )
}

export default PageOffline

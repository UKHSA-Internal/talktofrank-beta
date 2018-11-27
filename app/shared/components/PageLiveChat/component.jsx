import React from 'react'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Divider from '../Divider/component'
import Heading from '../Heading/component'
import Footer from '../Footer/component'
import GA from '../GoogleAnalytics/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Main from '../Main/component'
import Longform from '../Longform/component'

const PageLiveChat = props => {
  return (
    <React.Fragment>
      <Masthead path={props.location}/>
      <Accent className='accent--shallow'>
        <Heading type='h1' className='h2 spacing-left spacing--single' text='Live Chat' />
      </Accent>
      <Divider className='hr--muted' />
      <Main>
        <Grid>
          <GridCol className='col-md-8 offset-md-2'>
            <iframe title='FRANK - livechat' frameborder='0' width='100%' height='550' src='https://smokefree.serco.com/visitor/EntryPageClosed.htm'>FRANK - livechat</iframe>
          </GridCol>
        </Grid>
      </Main>
      <Footer />
      <GA/>
    </React.Fragment>
  )
}

export default PageLiveChat

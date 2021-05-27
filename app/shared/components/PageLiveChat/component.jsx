import React from 'react'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Divider from '../Divider/component'
import Heading from '../Heading/component'
import Footer from '../Footer/component'
import { GA } from '../GoogleAnalytics/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Main from '../Main/component'
import Longform from '../Longform/component'
import {LiveChatOn, LiveChatOff} from '../LiveChatToggle/component'
import SiteMessageContainer from '../../containers/SiteMessageContainer/component'
import HelpPanels from '../HelpPanels/component'

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
            <LiveChatOn>
              <iframe title="FRANK - livechat" frameborder="0" width="100%" height="550" src="https://talktofrank.serco.com/visitor/entrypage.htm">FRANK - livechat</iframe>
            </LiveChatOn>
            <LiveChatOff>
              <iframe title="FRANK - livechat" frameborder="0" width="100%" height="550" src="https://talktofrank.serco.com/visitor/entrypageclosed.htm">FRANK - livechat</iframe>
            </LiveChatOff>
          </GridCol>
        </Grid>
        <HelpPanels />
      </Main>
      <Footer />
      <GA/>
      <SiteMessageContainer
        path={props.location}
      />
    </React.Fragment>
  )
}

export default PageLiveChat

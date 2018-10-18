import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Footer from '../Footer/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Main from '../Main/component.jsx'
import Accent from '../Accent/component.jsx'
import { factory } from '../../factory.jsx'

export default class PageGeneral extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Main className='main--full-width'>
          <Accent>
            <Grid>
              <GridCol className='col-12 col-md-8'>
                { factory(this.props) }
              </GridCol>
            </Grid>
          </Accent>
        </Main>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

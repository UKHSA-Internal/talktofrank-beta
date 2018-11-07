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

export default class PageContact extends React.PureComponent {
  render () {
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
                    <Heading className='h3' text='{props.text}'/>
                    <Longform text='{props.summary}' className='spacing-bottom--single'/>
                  </li>
                  <li className='list-item list-item--underlined spacing--single' >
                    <Heading className='h3' text='{props.text}'/>
                    <Longform text='{props.summary}' className='spacing-bottom--single'/>
                  </li>
                  <li className='list-item list-item--underlined spacing--single' >
                    <Heading className='h3' text='{props.text}'/>
                    <Longform text='{props.summary}' className='spacing-bottom--single'/>
                  </li>
                </ul>
              </GridCol>
              <GridCol className='col-12 col-sm-5 col-md-3 offset-md-1'>
                <Panel>

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

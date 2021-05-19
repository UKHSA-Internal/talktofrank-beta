import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Longform from '../Longform/component.jsx'
import Accent from '../Accent/component.jsx'
import { GA } from '../GoogleAnalytics/component.jsx'
import { primary } from '../../fixtures/navigation.js'
import SiteMessageContainer from '../../containers/SiteMessageContainer/component'
import HelpPanels from '../HelpPanels/component.jsx'

export default class PageGetHelpList extends React.PureComponent {
  render () {
    let nav = primary && primary.filter(v => v.subnavigation)

    return (
      <React.Fragment>
        <Masthead/>
        <Main>
          <Accent className='accent--shallow'>
            <Heading type='h1' className='h2 spacing-left spacing--single' text='Help and advice' />
          </Accent>
          <Accent className='accent--shallow'>
            <Grid>
              <GridCol className='col-12 col-sm-8 offset-sm-2'>
                <ul className='list-unstyled'>
                  {nav[0].subnavigation && nav[0].subnavigation
                    .map((v, i) => {
                      return (
                        <li className='list-item list-item--underlined' key={i}>
                          <a href={v.url} className='list-link'><span class='list-link__title'>{v.label}</span></a>
                        </li>
                      )
                    })
                  }
                </ul>
              </GridCol>
            </Grid>
          </Accent>
          <HelpPanels />
        </Main>
        <Footer/>
        <GA/>
        <SiteMessageContainer
          path={this.props.location}
        />
      </React.Fragment>
    )
  }
}

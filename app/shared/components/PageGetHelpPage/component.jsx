import React from 'react'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Divider from '../Divider/component'
import Heading from '../Heading/component'
import Footer from '../Footer/component'
import GA from '../GoogleAnalytics/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Longform from '../Longform/component'
import Toggle from '../Toggle/component'
import Main from '../Main/component'

const PageGetHelpPage = props => {
  return (
    <React.Fragment>
      <Masthead path={props.location}/>
      <Accent className='accent--shallow'>
        <Heading type='h1' className='h2 spacing-left inverted spacing--single' text={props.title} />
      </Accent>
      <Main className='main--full-width'>
        <Accent className='accent--shallow'>
          <Grid>
            <GridCol className='col-12 col-md-8 offset-md-3'>
              {props.fields.body && <Longform text={props.fields.body} />}
            </GridCol>
          </Grid>
        </Accent>
        {props.fields.contentExtra && props.fields.contentExtra.map((v, i) => {
          return (
            <section className='section section--has-toggle' key={i}>
              <Toggle text={v.fields.title} className='collapsible--chevron collapsible--first' history={props.location}>
                <Longform text={v.fields.content} />
              </Toggle>
            </section>
          )
        })
        }
      </Main>
      <Footer />
      <GA/>
    </React.Fragment>
  )
}

export default PageGetHelpPage

import React from 'react'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Divider from '../Divider/component'
import Footer from '../Footer/component'
import { GA } from '../GoogleAnalytics/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Longform from '../Longform/component'
import Toggle from '../Toggle/component'
import Heading from '../Heading/component'
import Svg from '../Svg/component'
import RelatedLinks from '../RelatedLinks/component'
import Main from '../Main/component'

const PageGetHelpPage = props => {
  const { pageData, location, siteSettings } = props
  return (
    <React.Fragment>
      <Masthead path={location}/>
      <Main>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='page-title' text={pageData.fields.title}/>
        </Accent>
        <Accent className='accent--shallow'>
          <Grid>
            <GridCol className='col-12 col-md-8 offset-md-3'>
              {pageData.fields.callout && <aside className='panel panel--padding-small panel--has-heading spacing-bottom--large'>
                  <h2 className='h4 inverted displaced-top inverted--primary'><Svg url={pageData.fields.callout.fields.icon} alt=''/> {pageData.fields.callout.fields.title}</h2>
                  <Longform text={pageData.fields.callout.fields.content}/>
                </aside>}
              {pageData.fields.intro && <Longform className='lead' text={pageData.fields.intro} />}
              {pageData.fields.body && <Longform className={pageData.fields.indentedText ? 'long-form--indented' : null} text={pageData.fields.body} />}
            </GridCol>
          </Grid>
        </Accent>
        {pageData.fields.contentExtra && pageData.fields.contentExtra.map((v, i) => {
          return (
            <section className='section section--has-toggle' key={i}>
              <Toggle text={v.fields.title} toggleFancyList={v.fields.toggleFancyList} className='collapsible--chevron collapsible--first' history={location}>
                <Longform text={v.fields.content} />
              </Toggle>
            </section>
          )
        })
        }
        {pageData.fields.relatedLinks && <Accent className='accent--shallow'>
          <Grid>
            <GridCol className='col-12 col-md-8 offset-md-3'>
              <RelatedLinks links={pageData.fields.relatedLinks} />
            </GridCol>
          </Grid>
        </Accent>}
      </Main>
      <Footer />
      <GA/>
    </React.Fragment>
  )
}

export default PageGetHelpPage

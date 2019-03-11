import React from 'react'
import BlockFeaturedContent from '../../containers/BlockFeaturedContentContainer/component'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Heading from '../Heading/component'
import Footer from '../Footer/component'
import { GA } from '../GoogleAnalytics/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Main from '../Main/component'
import Longform from '../Longform/component'
import Article from '../Article/component'
import Time from '../Time/component.jsx'
import LinkDrugName from '../LinkDrugName/component.jsx'
import Video from '../Video/component.jsx'
// @todo refactor all contentful "factory" stuffs to api
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { contentFulFactory } from '../../contentful'

const PageNews = ({pageData, location, siteSettings}) => {
  return (
    <React.Fragment>
      <Masthead path={location}/>
      <Main>
        <Accent className='accent--shallow spacing-top--single' modifier='wrapper--constant'>
          <Grid>
            {pageData.fields.headerVideo && <GridCol className='col-12'>
              <Video className='video--header' {...pageData.fields.headerVideo.fields}/>
            </GridCol>}
            {(pageData.fields.image && !pageData.fields.headerVideo) && <GridCol className='col-12 list-offset'>
              <Article {...this.props}/>
            </GridCol>}
            {(!pageData.fields.image || pageData.fields.headerVideo) && <GridCol className='col-12 col-sm-8 offset-md-2'>
              {pageData.date && <Time time={pageData.dateFormatted} dateTime={pageData.date}/>}
              <Heading type='h1' text={pageData.fields.title} className='h3 spacing-bottom--single'/>
            </GridCol>}
            <GridCol className='col-12 col-sm-8 col-md-6 offset-md-2'>
              {pageData.fields.body && <Longform text={documentToHtmlString(pageData.fields.body, contentFulFactory())}/>}
              {pageData.fields.relatedDrugs && <React.Fragment><Heading text='Related drugs' className='h4 spacing--single'/><ul className='list-unstyled'>
                {pageData.fields.relatedDrugs.map((v, i) => {
                  v.fields.name = v.fields.drugName
                  delete v.fields.synonyms
                  delete v.fields.description
                  return <LinkDrugName key={i} {...v.fields}/>
                })}
                </ul></React.Fragment>
              }
            </GridCol>
          </Grid>
        </Accent>
        <BlockFeaturedContent />
      </Main>
      <Footer />
      <GA />
    </React.Fragment>
  )
}

export default PageNews
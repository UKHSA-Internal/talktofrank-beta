import React from 'react'
import { Link } from 'react-router-dom'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Divider from '../Divider/component.jsx'
import Picture from '../Picture/component.jsx'
import Accent from '../Accent/component.jsx'
import Time from '../Time/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'

const PageNewsList = props => {
  return (
    <React.Fragment>
      <Masthead path={props.location}/>
      <Accent className='accent--shallow'>
        <Heading type='h1' className='h2 spacing-left spacing--single' text={props.title} />
      </Accent>
      <Divider className='hr--muted' />
      <Main>
        <Grid>
          <GridCol className='col-12 col-sm-10 offset-sm-2'>
            <ul className='list-unstyled list-offset'>{ props.list && props.list.map(newsItem => (
              <li className='list-item' key={newsItem.sys.id} >
                <a className='' href={`/news/${newsItem.fields.slug}`}>
                  {newsItem.fields.image && <Picture {...newsItem.fields.image}/>}
                  <Time time={newsItem.originalPublishDate ? newsItem.originalPublishDateFormatted : newsItem.updatedAtFormatted} dateTime={newsItem.originalPublishDate ? newsItem.originalPublishDate : newsItem.updatedAt}/>
                  <Heading className='h3 has-arrow' text={newsItem.fields.title}/>
                  <p className='read-more'>Read more</p>
                </a>
              </li>
            ))}
            </ul>
          </GridCol>
        </Grid>
      </Main>
      <Footer />
      <GA />
    </React.Fragment>
  )
}
export default PageNewsList

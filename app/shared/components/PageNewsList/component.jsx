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
import Longform from '../Longform/component.jsx'
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
          <GridCol className='col-12 col-sm-10 offset-sm-1'>
            <ul className='list-unstyled list-offset'>{ props.list && props.list.map((item, i) => (
              <li className={`list-item ${item.fields.image ? ('list-item--has-image' + (item.fields.imagepos & 1 === 1 ? ' list-item--alternate' : '')) : ''} `} key={item.sys.id} >
                <a className='list-item__link' href={`/news/${item.fields.slug}`}>
                  {item.fields.image && <Picture {...item.fields.image}/>}
                  <div className='list-item__inner'>
                    <h2 className='list-item__title h3 heading-inline'><span>{item.fields.title}</span><span className='has-arrow'></span></h2>
                    <Time time={'Updated at: ' + item.originalPublishDate ? item.originalPublishDateFormatted : item.updatedAtFormatted} dateTime={item.originalPublishDate ? item.originalPublishDate : item.updatedAt}/>
                    {item.fields.bodyLegacy && !item.fields.image && <Longform text={item.fields.bodyLegacy}/>}
                    {item.fields.summary && !item.fields.image && <Longform text={item.fields.summary}/>}
                    <p className='read-more'>Read more</p>
                  </div>
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

import React from 'react'
import { Link } from 'react-router-dom'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Divider from '../Divider/component.jsx'
import Accent from '../Accent/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'

const PageNewsList = props => {

  console.log(props)
  return (
    <React.Fragment>
      <Masthead path={props.location}/>
      <Accent className='accent--shallow'>
        <Heading type='h1' className='h2 inverted spacing-left spacing--single' text={props.title} />
      </Accent>
      <Divider className='hr--muted' />
      <Main>
        <Grid>
          <GridCol className='col-12 col-sm-8 offset-sm-2'>
            <ul>{ props.list
              .map(newsItem => (
                <li key={newsItem.sys.id} >
                  <h2 className='h5'>
                    <a href={`/news/${newsItem.fields.slug}`}>
                      {newsItem.fields.title}
                    </a>
                  </h2>
                </li>
              ))
            }</ul>
          </GridCol>
        </Grid>
      </Main>
      <Footer />
      <GA />
    </React.Fragment>
  )
}
export default PageNewsList

import React from 'react'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Divider from '../Divider/component'
import Heading from '../Heading/component'
import Footer from '../Footer/component'
import GA from '../GoogleAnalytics/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Main from '../Main/component'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { contentFulFactory } from '../../contentful'

const PageNews = props => (
  <React.Fragment>
    <Masthead path={props.location}/>
    <Accent className='accent--shallow'>
      <Heading type='h1' className='h2 inverted spacing-left spacing--single' text={props.title} />
    </Accent>
    <Divider className='hr--muted' />
    <Main>
      <Grid>
        <GridCol className='col-12 col-md-8'>
          {props.fields.body &&
            <div dangerouslySetInnerHTML={{
              __html: documentToHtmlString(props.fields.body, contentFulFactory())
            }}/>
          }
        </GridCol>
        <GridCol className='col-12 col-md-8 spacing-top--single sm-spacing-top--large'>
          {props.fields.relatedDrugs && props.fields.relatedDrugs.length > 0 &&
            <React.Fragment>
              <Heading className='h4' text='Related drugs' />
              <ul className='list-unstyled list-offset'>
                {props.fields.relatedDrugs
                  .map(item => (
                    <li className='list-item--underlined'>
                      <a className='list-link' href={`/drug/${item.fields.slug}`} >
                        <Heading type='h3' className='list-item__title h5 d-inline-block' text={item.fields.drugName} />
                      </a>
                    </li>
                  ))
                }
              </ul>
            </React.Fragment>
          }
        </GridCol>
      </Grid>
    </Main>
    <Footer />
    <GA />
  </React.Fragment>
)

export default PageNews

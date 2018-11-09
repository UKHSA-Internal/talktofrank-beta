import React from 'react'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Divider from '../Divider/component'
import Heading from '../Heading/component'
import Footer from '../Footer/component'
import GA from '../GoogleAnalytics/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Picture from '../Picture/component'
import Main from '../Main/component'
import Article from '../Article/component'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { contentFulFactory } from '../../contentful'

export default class PageNews extends React.PureComponent {

  render () {


console.log(this.props.fields)

    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-8 col-md-6 offset-md-2'>
              <Article {...this.props} />
            </GridCol>
            <GridCol className='col-12 col-sm-8 col-md-6 offset-md-2'>
              {this.props.fields.body &&
                <div dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(this.props.fields.body, contentFulFactory())
                }}/>
              }
            </GridCol>
          </Grid>
        </Main>
        <Footer />
        <GA />
      </React.Fragment>
    )
  }
}

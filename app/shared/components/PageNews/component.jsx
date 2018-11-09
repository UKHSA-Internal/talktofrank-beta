import React from 'react'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Heading from '../Heading/component'
import Footer from '../Footer/component'
import GA from '../GoogleAnalytics/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Picture from '../Picture/component'
import Main from '../Main/component'
import Article from '../Article/component'
import Time from '../Time/component.jsx'
import LinkDrugName from '../LinkDrugName/component.jsx'
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
            {this.props.fields.image && <GridCol className='col-12 list-offset'>
              <Article {...this.props} />
            </GridCol>}
            {!this.props.fields.image && <GridCol className='col-12 col-sm-8 offset-md-2'>
              {this.props.fields.date && <Time time={this.props.fields.dateFormatted} dateTime={this.props.fields.date}/>}
              <Heading text={this.props.fields.title} className='h3 spacing-bottom--large'/>
            </GridCol>}
            <GridCol className='col-12 col-sm-8 col-md-6 offset-md-2'>
              {this.props.fields.body &&
                <div dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(this.props.fields.body, contentFulFactory())
                }}/>
              }
              {this.props.fields.relatedDrugs && <React.Fragment><Heading text='Related drugs' className='h3 spacing-top--large spacing-bottom--single'/><ul className='list-unstyled'>
                {this.props.fields.relatedDrugs.map((v, i) => {
                  v.fields.description = ''
                  v.fields.name = v.fields.drugName
                  return <LinkDrugName key={i} {...v.fields}/>
                })}
                </ul></React.Fragment>
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

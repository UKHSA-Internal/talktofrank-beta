import React from 'react'
import Accent from '../Accent/component'
import Heading from '../Heading/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import AmpLogo from '../AmpLogo/component'
import Main from '../Main/component'
import Longform from '../Longform/component'
import Article from '../Article/component'
import Time from '../Time/component.jsx'
import LinkDrugName from '../LinkDrugName/component.jsx'
// @todo refactor all contentful "factory" stuffs to api
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { contentFulFactory } from '../../contentful'
import { fieldIncludesVideo } from '../../utilities'
import AMPVideo from '../AmpVideo/component'

export default class AmpPageNews extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <AmpLogo url='/ui/svg/logo-frank--alt.svg' alt=''/>
        <Main>
          <Accent className='accent--shallow spacing-top--single' modifier='wrapper--constant'>
            <Grid>
              {fieldIncludesVideo(this.props.fields.headerVideo) && <GridCol className='col-12'>
                <AMPVideo className='video--header' {...this.props.fields.headerVideo.fields}/>
              </GridCol>}
              {(this.props.fields.image && !fieldIncludesVideo(this.props.fields.headerVideo)) && <GridCol className='col-12 list-offset'>
                <Article isAmp {...this.props}/>
              </GridCol>}
              {(!this.props.fields.image || fieldIncludesVideo(this.props.fields.headerVideo)) && <GridCol className='col-12 col-sm-8 offset-md-2 spacing-top--single'>
                {this.props.date && <Time time={this.props.dateFormatted} dateTime={this.props.date}/>}
                <Heading type='h1' text={this.props.fields.title} className='h3 spacing-bottom--large'/>
              </GridCol>}
              <GridCol className='col-12 col-sm-8 col-md-6 offset-md-2'>
                {this.props.fields.body && <Longform text={documentToHtmlString(this.props.fields.body, contentFulFactory(true))}/>}
                {this.props.fields.relatedDrugs && <React.Fragment><Heading text='Related drugs' className='h4 spacing--single'/><ul className='list-unstyled'>
                  {this.props.fields.relatedDrugs.map((v, i) => {
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
        </Main>
      </React.Fragment>
    )
  }
}

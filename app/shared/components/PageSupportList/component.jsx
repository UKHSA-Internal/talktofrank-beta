import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Form from '../Form/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import Longform from '../Longform/component.jsx'
import Anchor from '../Anchor/component.jsx'
import Accent from '../Accent/component.jsx'
import Pagination from '../Pagination/component.jsx'
import ArticleSupport from '../ArticleSupport/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Select from '../Select/component.jsx'

export default class PageSupportList extends React.PureComponent {
  render () {
    const { results, location } = this.props.pageData
    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text={`${results.length} results returned for ${location}`} />
          <Anchor className='spacing-left link-text' href='/support-near-you' text='Search again'/>
        </Accent>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-8 offset-sm-2'>
               <ul className='list-unstyled'>
                {results && results.map((item, i) => {
                  return <ArticleSupport
                    text={item.fields.name}
                    distance={item.distance}
                    address={[
                      item.fields.address1,
                      item.fields.address2,
                      item.fields.address3,
                      item.fields.town,
                      item.fields.county,
                      item.fields.postCode
                    ].filter(Boolean).join(', ')}
                    phone={item.fields.telephone1}
                    phoneRaw={item.fields.telephone1.replace(/\D/g, '')}
                    {...item.fields} key={i}
                  />
                })}
              </ul>
              {results.length > 10 &&
                <Pagination
                  pageCount={results.length / 10}
                />
              }
            </GridCol>
          </Grid>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

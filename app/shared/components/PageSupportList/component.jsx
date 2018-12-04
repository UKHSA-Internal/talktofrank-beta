import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Anchor from '../Anchor/component.jsx'
import Accent from '../Accent/component.jsx'
import Pagination from '../Pagination/component.jsx'
import ArticleSupport from '../ArticleSupport/component.jsx'
import { GA } from '../GoogleAnalytics/component.jsx'
import Main from '../Main/component.jsx'
import Divider from '../Divider/component'
import Svg from '../Svg/component'

export default class PageSupportList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.main = React.createRef()
    this.focusMain = this.focusMain.bind(this)
  }

  handlePageChange (pageNumber) {
    const { location, serviceType } = this.props.pageData
    this.props.fetchSupportList(pageNumber.current, location, serviceType)
    this.updateAddress(pageNumber.current, location, serviceType)
  }

  updateAddress (page, location, serviceType) {
    if ('replaceState' in history) {
      let path = page === 0 ? '/treatment-centre' : `/treatment-centre/${(page + 1)}`
      path += `?location=${location}&serviceType=${serviceType}`
      window.history.replaceState({}, document.title, path)
    }
  }

  focusMain() {
    setTimeout(() => {
      this.main.current.focus()
    }, 1500)
  }

  renderNoResults() {
    return (
      <Grid>
        <GridCol className='col-12 col-sm-10 offset-sm-1'>
          <div className='search__no-results'>
            <Grid>
              <GridCol className='col-12 col-md-2 spacing-bottom--single'>
                <Svg url='/ui/svg/location-large.svg' alt=''/>
              </GridCol>
              <GridCol className='col-12 col-md-8'>
                <Heading className='h3' text='Sorry, no results were found'/>
                <Heading type='p' className='lead' text='Perhaps try...'/>
                <ul>
                  <li>Checking your spelling</li>
                  <li>Searching for a nearby town or city name</li>
                </ul>
                <Divider className='hr--muted hr--large' />
                <Heading type='h2' className='h5' text='Get in touch'/>
                <p><Anchor className='link-text' href='tel:03001236600' label='Call FRANK on 0300 123 6600'>Call: 0300 123 6600</Anchor></p>
                <p><Anchor className='link-text' href='sms:82111' label='Text FRANK on 82111'>Text: 82111</Anchor></p>
                <p><Anchor className='link-text' href='/contact' label='Send an email to FRANK'>Send an email</Anchor></p>
              </GridCol>
            </Grid>
          </div>
        </GridCol>
      </Grid>
    )
  }

  render () {
    const { loading } = this.props
    const { results, location, total, pageNumber } = this.props.pageData
    return (
      <React.Fragment>
        <Masthead/>
         <Main>
         <span className='jump visually-hidden' tabIndex='-1' ref={this.main}/>
         <Accent className='accent--shallow'>
            <Heading type='h1' className='page-title' text={`Results ordered by nearest to “${location}”` } />
            <Anchor className='md-spacing-left link-text' href='/support-near-you' text='Search again'/>
          </Accent>
          <Accent className='accent--shallow'>
            <Grid>
              <GridCol className='col-12 col-sm-8 offset-sm-2'>
                 <ul className='list-unstyled'>
                  {results && results.map((item, i) => {
                    return <ArticleSupport
                      text={item.fields.name}
                      distance={item.distance}
                      className={i === 0 ? 'list-item--first' : null}
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
              </GridCol>
            </Grid>
            {total > 10 &&
              <Pagination
                initialPage={pageNumber}
                pageCount={Math.ceil(total / 10)}
                onPaginateFocus={this.focusMain}
                onPageChange={this.handlePageChange}
              />
            }
            {!loading && !total &&
              this.renderNoResults()
            }
          </Accent>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

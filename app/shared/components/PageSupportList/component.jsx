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
import GA from '../GoogleAnalytics/component.jsx'
import Main from '../Main/component.jsx'

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
  }

  focusMain() {
    setTimeout(() => {
      this.main.current.focus()
    }, 1500)
  }

  render () {
    const { results, location, total } = this.props.pageData
    return (
      <React.Fragment>
        <Masthead/>
         <Main>
         <span className='jump visually-hidden' tabIndex='-1' ref={this.main}/>
         <Accent className='accent--shallow'>
            <Heading type='h1' className='page-title' text={`${total} results returned for ${location}`} />
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
                {total > 10 &&
                  <Pagination
                    pageCount={total / 10}
                    onPaginateFocus={this.focusMain}
                    onPageChange={this.handlePageChange}
                  />
                }
              </GridCol>
            </Grid>
          </Accent>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

import React from 'react'
import Masthead from '../Masthead/component'
import Grid from '../Grid/component'
import Heading from '../Heading/component'
import GridCol from '../GridCol/component'
import Accent from '../Accent/component.jsx'
import Footer from '../Footer/component'
import Divider from '../Divider/component.jsx'
import Pagination from '../Pagination/component'
import SearchResultDrug from '../SearchResultDrug/component'
import SearchResultContent from '../SearchResultContent/component'
import Anchor from '../Anchor/component'
import Svg from '../Svg/component'
import Main from '../Main/component.jsx'

export default class SearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.main = React.createRef()
    this.focusMain = this.focusMain.bind(this)
    this.state = {
      searchValue: this.props.pageData.searchTerm
    }
  }

  handleSubmit () {
    if (this.state.searchValue !== '') {
      const searchValue = this.state.searchValue
      window.location = `/drug/search/${searchValue}`
    }
  }

  handleInputChange (e) {
    e.preventDefault()
    const searchValue = e.target.value.toLowerCase()
    this.setState({
      searchValue: searchValue
    }, () => {
      if (searchValue.length >= 2) {
        this.props.searchForTerm(searchValue)
      }
    })
  }

  focusMain() {
    setTimeout(() => {
      this.main.current.focus()
    }, 1500)
  }

  handlePageChange (pageNumber) {
    this.props.fetchSearchTerm(this.state.searchValue, pageNumber.current)
    this.updateAddress(pageNumber.current, this.state.searchValue)
  }

  updateAddress (page, searchTerm) {
    if ('replaceState' in history) {
      let path = page === 0 ? `/search/${searchTerm}` : `/search/${searchTerm}/${(page + 1)}`
      window.history.replaceState({}, document.title, path)
    }
  }


  renderNoResults() {
    return (
      <div className='search__no-results'>
        <Grid>
          <GridCol className='col-12 col-md-2 spacing-bottom--single'>
            <Svg url='/ui/svg/magnifying-large.svg' alt=''/>
          </GridCol>
          <GridCol className='col-12 col-md-8'>
            <Heading className='h3' text='Sorry, no results were found'/>
            <Heading type='p' className='lead' text='Perhaps try...'/>
            <ul>
              <li>Checking your spelling</li>
              <li>A more general word</li>
              <li><Anchor className='link-text' href='/drugs-a-z'>Checking the Drug A-Z page</Anchor></li>
            </ul>
            <Divider className='hr--muted hr--large' />
            <Heading type='h2' className='h5' text='Get in touch'/>
            <p><Anchor className='link-text' href='tel:03001236600' label='Call FRANK on 0300 123 6600'>Call: 0300 123 6600</Anchor></p>
            <p><Anchor className='link-text' href='sms:82111' label='Text FRANK on 82111'>Text: 82111</Anchor></p>
            <p><Anchor className='link-text' href='/contact' label='Send an email to FRANK'>Send an email</Anchor></p>
          </GridCol>
        </Grid>

      </div>
    )
  }

  render () {
    const { loading, location } = this.props
    const { total, hits, pageNumber } = this.props.pageData
    const searchValue = this.state.searchValue ? this.state.searchValue : ''
    let title = `Search results for '${searchValue}'`
    title = `${total} ${title.toLowerCase()}`
    return (
      <React.Fragment>
        <Masthead path={location}/>
        <Main>
          <span className='jump visually-hidden' tabIndex='-1' ref={this.main}/>
          <Accent className='accent--shallow'>
            <Heading type='h1' className='page-title' text={title} />
          </Accent>
          <Accent className='accent--shallow'>
            <Grid>
              <GridCol className='col-12 col-sm-10 offset-sm-1'>
                {!loading && total > 0 &&
                  <React.Fragment>
                    <ul className='list-unstyled list-offset spacing-top--flush'>
                      {hits
                        .map(result => {
                          const SearchResultComponent =
                            result._index.includes('talktofrank-content')
                              ? SearchResultContent
                              : SearchResultDrug

                          return (
                            <li className={`list-item--underlined`}>
                              <SearchResultComponent
                                item={result._source}
                                highlight={result.highlight
                                  ? result.highlight
                                  : null
                                }
                                summary={true}
                              />
                            </li>
                          )
                        })
                      }</ul>
                  </React.Fragment>
                }
                {total > 10 &&
                <Pagination
                  initialPage={pageNumber}
                  pageCount={Math.ceil(total / 10)}
                  onPageChange={this.handlePageChange}
                  onPaginateFocus={this.focusMain}
                />
                }
                {!loading && !total &&
                  this.renderNoResults()
                }
              </GridCol>
            </Grid>
          </Accent>
        </Main>
        <Footer />
      </React.Fragment>
    )
  }
}

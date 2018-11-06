import React from 'react'
import Masthead from '../Masthead/component'
import Grid from '../Grid/component'
import Heading from '../Heading/component'
import Main from '../Main/component'
import GridCol from '../GridCol/component'
import Accent from '../Accent/component.jsx'
import Footer from '../Footer/component'
import Pagination from '../Pagination/component'
import SearchResultDrug from '../SearchResultDrug/component'
import SearchResultContent from '../SearchResultContent/component'

export default class SearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
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

  handlePageChange (pageNumber) {
    this.props.fetchSearchTerm(this.state.searchValue, pageNumber.current)
  }

  renderNoResults() {
    return (
      <div className='search__no-results'>
        <Grid>
          <GridCol className='col-12 col-sm-10'>
            <h2 className='h3'><span className='smilie'>:(</span> Sorry, no results were found</h2>
            <h5>Perhaps try...</h5>
            <ul>
              <li>Checking your spelling</li>
              <li>A more general word</li>
              <li>Words with a similar meanings</li>
            </ul>
          </GridCol>
        </Grid>
        <hr className='light-grey' />
        <h5>Get in touch...</h5>
        <p><a className='read-more' href="tel:03001236600">Call: 0300 123 6600</a></p>
        <p><a className='read-more' href="sms:82111">Text: 82111</a></p>
        <p><a className='read-more' href="mailto:03001236600">frank@talktofrank.com</a></p>
      </div>
    )
  }

  render () {
    const { loading, location } = this.props
    const { total, hits } = this.props.pageData
    const searchValue = this.state.searchValue ? this.state.searchValue : ''
    let title = `Search results for '${searchValue}'`
    title = total && total > 0 ? `${total} ${title.toLowerCase()}` : title
    return (
      <React.Fragment>
        <Masthead path={location}/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single'
                   text={title} />
        </Accent>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-10 offset-sm-1'>
              {!loading && total > 0 &&
                <React.Fragment>
                  <ul className='list-unstyled list-offset'>
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
                pageCount={total / 10}
                onPageChange={this.handlePageChange}
              />
              }
              {!loading && !total &&
                this.renderNoResults()
              }
            </GridCol>
          </Grid>
        </Main>
        <Footer />
      </React.Fragment>
    )
  }
}

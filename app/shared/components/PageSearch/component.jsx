import React from 'react'
import Masthead from '../Masthead/component'
import Grid from '../Grid/component'
import Heading from '../Heading/component'
import Main from '../Main/component'
import GridCol from '../GridCol/component'
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
      searchValue: this.props.match.params.term
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
    this.props.fetchSearchTerm(this.props.match.params.term, pageNumber.current)
  }

  render () {
    const { loading } = this.props
    const { total, hits } = this.props.pageData
    const searchValue = this.state.searchValue ? this.state.searchValue : ''
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-8'>
              <Heading type='h1' className='h2' text='Search results' />
                { loading &&
                  <p>Searching...</p>
                }
                { total && total > 0 ? (
                  <React.Fragment>
                    <p>Results for <strong>{searchValue}</strong> ({total})</p>
                    <ul className="search__list list-unstyled">{ hits
                        .map(result => {
                          const SearchResultComponent =
                            result._index.includes('talktofrank-content')
                          ? SearchResultContent
                              : SearchResultDrug

                          return <SearchResultComponent
                            item={result._source}
                            highlight={result.highlight
                              ? result.highlight
                              : null
                            }
                          />
                        })
                    }</ul>
                    {total > 10 &&
                      <Pagination
                        pageCount={total / 10}
                        onPageChange={this.handlePageChange}
                      />
                    }
                  </React.Fragment>
                ) : (
                  <div className='search__no-results'>
                    <Grid>
                      <GridCol className='col-12 col-sm-10'>
                        <p>Our search isn't clever enough to answer your question yet.</p>
                        <p>Try searching for a drug name (e.g. Mandy, Cocaine, Balloons).
                          If you're still stuck you can contact Frank:</p>
                      </GridCol>
                      <GridCol className='col-12 col-sm-2'>
                        <span className='smilie'>:(</span>
                      </GridCol>
                    </Grid>
                    <hr />
                    <p>Phone: <a href="tel:03001236600">0300 123 6600</a></p>
                    <p>Email: <a href="mailto:03001236600">frank@talktofrank.com</a></p>
                    <p>Text: <a href="sms:82111">82111</a></p>
                  </div>
                )}
              </GridCol>
            </Grid>
        </Main>
        <Footer />
      </React.Fragment>
    )
  }
}

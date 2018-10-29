import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Footer from '../Footer/component.jsx'
import Button from '../Button/component.jsx'
import Svg from '../Svg/component.jsx'
import SearchResultDrug from '../SearchResultDrug/component'
import SearchResultContent from '../SearchResultContent/component'

export default class SearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  render () {
    const { loading } = this.props
    const { total, hits } = this.props.pageData
    const searchValue = this.state.searchValue ? this.state.searchValue : ''
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <main className='search' id='main' name='main'>
          <div className='search--header'>
            <div>
              <h1>Search</h1>
            </div>
          </div>
          <div className='main'>
            <Grid>
              <GridCol className='col-12 col-md-8'>
                { loading &&
                  <p>Searching...</p>
                }
                { total && total > 0 ? (
                  <React.Fragment>
                    <p>Results for <strong>{searchValue}</strong> ({total})</p>
                    <ul className="search__list list-unstyled">{ hits
                        .map(result => {
                          // @todo: refactor hardcoded index names
                          // to reference config file
                          switch (result._index) {
                            case 'talktofrank-beta-content' :
                              return <SearchResultContent
                                item={result._source}
                                highlight={result.highlight
                                  ? result.highlight
                                  : null
                                }
                              />
                            default:
                              return <SearchResultDrug
                                item={result._source}
                                highlight={result.highlight
                                  ? result.highlight
                                  : null
                                }
                              />
                          }
                        })
                    }</ul>
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
          </div>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

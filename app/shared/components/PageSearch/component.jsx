import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Footer from '../Footer/component.jsx'
import Button from '../Button/component.jsx'
import Svg from '../Svg/component.jsx'

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
                <div className='input-group' role='search'>
                  <label htmlFor='search-site' className='form-label h3 sr-only'>Enter a drug name (e.g. Mandy, Cocaine, Weed)</label>
                  <div className='input-group--raised d-flex'>
                    <input
                      className={`form-control form-control--search underlined`}
                      placeholder='Enter a drug name (e.g. Mandy, Cocaine, Weed)'
                      id='search-site'
                      type='text'
                      autoComplete='off'
                      autoCorrect='off'
                      autoCapitalize='off'
                      spellCheck='false'
                      value={searchValue}
                      onChange={this.handleInputChange}
                      />
                    <div className='input-group-append'>
                      <Button
                        className='btn--primary icon-magnifying'
                        clickHandler={this.handleSubmit}
                      >
                        <Svg url='/ui/svg/magnifying.svg' alt='Submit search'/>
                        <span>Search</span>
                      </Button>
                    </div>
                  </div>
                </div>
                { loading &&
                  <p>Searching...</p>
                }
                { total && total > 0 ? (
                    <ul className="search__list list-unstyled">{ hits
                        .map(result => {
                          // @todo: refactor hardcoded index names
                          // to reference config file
                          switch (result._index) {
                            case 'talktofrank-beta-drug-name' :
                              return <ResultDrug
                                item={result._source}
                                highlight={result.highlight
                                  ? result.highlight
                                  : null
                                }
                              />
                            case 'talktofrank-beta-drug-text' :
                              return <ResultDrug
                                item={result._source}
                                highlight={result.highlight
                                  ? result.highlight
                                  : null
                                }
                              />
                            case 'talktofrank-beta-content' :
                              return <ResultContent
                                item={result._source}
                                highlight={result.highlight
                                  ? result.highlight
                                  : null
                                }
                              />
                          }
                        })
                    }</ul>
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

const ResultDrug = ({item, highlight}) => {
  // ES doesn't allow null values on completion fields, hence having to
  // duplicate name/real name
  let name = item.realName && item.realName !== item.name
    ? `${item.name} (${item.realName})`
    : item.name
  if (highlight && highlight.synonyms) {
    name = `${highlight.synonyms[0]} (${item.name})`
  }

  return (
    <li key={item.id} className='list-item list-item--dotted'>
      <a href={`/drug/${item.slug}`}><h4 dangerouslySetInnerHTML={{ __html: name }} /></a>
    </li>
  )
}

const ResultContent = ({item, highlight}) => (
  <li key={item.id} className='list-item list-item--dotted'>
    <a href={item.type === 'news' ? `/news/${item.slug}` : item.slug} ><h4>{item.title}</h4></a>
    <p>{item.type}</p>
  </li>
)

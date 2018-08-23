import React from 'react'
import { Link } from 'react-router'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
const util = require('util')

export default class SearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    this.addToSuggestionsIfNotSearchTerm = this.addToSuggestionsIfNotSearchTerm.bind(this)
    this.state = {
      searchValue: '',
      likelyDrugName: false,
      showSuggestions: false
    }
  }

  getDidYouMean (suggestions) {
    if (!suggestions || !suggestions.length) return null

    return (
      <React.Fragment>
        <p>
          <span className="h4">Did you mean:</span>{' '}
          { suggestions.map((item, key) =>
            <React.Fragment key={`suggestion-${item.text}`}>
              <a onClick={this.handleSuggestionClick}>
                {item.text}
              </a>
              { key + 1 < suggestions.length && ', '}
            </React.Fragment>
          )}
        </p>
      </React.Fragment>
    )
  }

  getResults (results, type) {
    if (!results || !results.length) return null
    return (
      <ul className="search__list">
        { results.map(item => (
          type === 'phrase' ? <PhraseMatchItem{ ...item } /> : <ResultItem { ...item } />
        ))}
      </ul>
    )
  }

  handleSuggestionClick (e) {
    e.preventDefault()
    const value = e.target.innerHTML
    this.setState({
      searchValue: value,
      likelyDrugName: value,
      showSuggestions: false
    }, () => {
      this.props.searchForTerm(value, 'must')
    })
  }

  addToSuggestionsIfNotSearchTerm (item) {
    return item.text.toLowerCase() !== this.state.searchValue.toLowerCase()
  }

  handleInputChange (e) {
    e.preventDefault()

    let { likelyDrugName, showSuggestions} = this.state
    const { match } = this.props.pageData
    const { searchValue } = this.state
    const nextSearchValue = e.target.value
    let queryType = 'should'

    if (this.props.pageData.match) {
      console.log('setting page match ', this.props.pageData.match)
      likelyDrugName = this.props.pageData.match
    }

    // Drug name is still in search
    if (likelyDrugName && nextSearchValue.indexOf(likelyDrugName) !== -1) {
      queryType = 'must'
    } else {
      likelyDrugName = '',
      showSuggestions = true
    }

    console.log('queryType', queryType)
    console.log('likelyDrugName', likelyDrugName)
    console.log('searchValue', searchValue)
    console.log('nextSearchValue', nextSearchValue)
    console.log('drugName exists in value', nextSearchValue.indexOf(likelyDrugName))

    this.setState({
      searchValue: nextSearchValue,
      likelyDrugName,
      showSuggestions
    }, () => {
      if (nextSearchValue.length >= 2) {
        this.props.searchForTerm(nextSearchValue, queryType)
      }
    })
  }

  render () {
    const { loading } = this.props
    const { results, suggestions, phraseMatches } = this.props.pageData
    const { searchValue, likelyDrugName } = this.state
    const showResults = Boolean((results && results.length) || (phraseMatches && phraseMatches.length))
    return (
      <React.Fragment>
        <Masthead/>
        <div className='main-wrapper'>
          <h1>Search</h1>
          <Grid>
            <GridCol className='col-8 col-md-8 col-sm-12 search'>
              <input
                type="text"
                value={searchValue}
                onChange={this.handleInputChange}
                placeholder="Search for drugs, advice & information...."
                style={{width: '100%'}}
                className="search__input"
              />
              { loading &&
                <p>Searching...</p>
              }
              <Grid>
                { !likelyDrugName &&
                  <GridCol className='col-12 col-sm-12 search--suggestions'>
                    {this.getDidYouMean(suggestions)}
                  </GridCol>
                }
                { showResults &&
                  <GridCol className='col-12 col-sm-12'>
                    { this.getResults(results)}
                    <hr />
                    { this.getResults(phraseMatches, 'phrase')}
                  </GridCol>
                }
              </Grid>
            </GridCol>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

const getHeading = (field, drugName) => {
  const headings = {
    'risks': 'the risks of using %s',
    'effects': 'the effects of using %s',
    'appearance': 'what %s looks like',
    'law': 'what the law says about %s',
    'worried': 'worries of using %s',
    'description.localised': '%s'
  }
  return util.format(headings[field], drugName)
}

const PhraseMatchItem = ({text, drugName, topic, link}) => {
  return (
    <li key={`phraseresultitem-${link}`}>
      <p><strong>{ getHeading(topic, drugName) }</strong></p>
      <p dangerouslySetInnerHTML={{__html: text}} />
    </li>
  )
}

const ResultItem = ({name, drug, description, link}) => {
  return (
    <li key={`resultitem-${link}`}>
      <p className="h4">
        <a href={`/drug/${link}`}>{name}</a>
        { name !== drug && ` (${drug})` }
      </p>
      <p dangerouslySetInnerHTML={{__html: description}}/>
    </li>
  )
}


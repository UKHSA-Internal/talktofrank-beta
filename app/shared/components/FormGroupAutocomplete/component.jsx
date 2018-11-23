import React, { PureComponent } from 'react'
import Button from '../Button/component.jsx'
import Svg from '../Svg/component.jsx'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import SearchResultDrug from '../SearchResultDrug/component'
import SearchResultContent from '../SearchResultContent/component'
import FormHint from '../FormHint/component'

class FormGroup extends PureComponent {
  constructor (props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this)
    this.onSuggestionHighlighted = this.onSuggestionHighlighted.bind(this)
    this.state = {
      id: '',
      searchTerm: '',
      currentSuggestion: '',
      autoCompleteData: [],
      activedescendant: false,
      resultsTotal: 0,
      loading: false
    }
  }

  componentDidMount() {
    if (this.props.focus) {
      this.searchInput.input.focus()
    }
  }

  onChange (event, { newValue }) {
    if (event.type === 'change') {
      this.setState({
        searchTerm: newValue,
        searchTermClean: encodeURIComponent(newValue),
        currentSuggestion: '',
        activedescendant: false,
        resultsTotal: 0
      })
    } else {
      this.setState({
        currentSuggestion: newValue
      })
    }
  }

  // @todo: refactor to container
  async getSuggestions (value) {
    const searchTerm = encodeURIComponent(value.toLowerCase().trim())
    const response = await axios
      .get(`/api/v1/search/autocomplete/${searchTerm}?page=0&pageSize=5`)
    return response.data
  }

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      loading: true
    })
    this.getSuggestions(value).then(resp => {
      if (resp.hits) {
        resp.hits = resp.hits.map((v, i) => {
          v['pos'] = `react-autowhatever-${this.props.id}--item-${i}`
          return v
        })
        console.log(resp.hits)
        this.setState({
          resultsTotal: resp.total,
          autoCompleteData: resp.hits,
          loading: false
        })
      }
    })
  }

  onSuggestionHighlighted({suggestion}) {
    if (suggestion && suggestion.pos) {
      this.setState({
        activedescendant: suggestion.pos
      })
    }
  }

  handleKeyPress (e) {
    // Theres a race condition with the keyup/onchange events
    // this.state.currentSuggestion is set when up/down keys are used
    // if its empty enter has been pressed whilst the input is focussed
    if (e.key === 'Enter' && this.state.currentSuggestion === '') {
      e.preventDefault()
      window.location = `/search/${this.state.searchTermClean}`
    }
  }

  // this prevents the thing from firing until at least two characters are added
  shouldRenderSuggestions(value) {
    return value.trim().length > 0
  }

  renderSuggestionsContainer({ containerProps, children }) {
    let res = this.state.resultsTotal > 5 ? (this.state.resultsTotal - 5) : null
    return (
      <div {...containerProps} id={this.props.id + '_container'}>
        {this.state.loading && <span className='spinner spinner--active spinner--static'/>}
        {children}
        {res && children && <a className='link-text' href={`/search/${this.state.searchTermClean}`}>
          View {res} more results
        </a>}
      </div>
    )
  }

  onSuggestionSelected (event, suggestionItem) {
    event.preventDefault()
    const item = suggestionItem.suggestion._source
    let url = ''
    if (suggestionItem.suggestion._index.includes('talktofrank-content')) {
      url = item.type === 'news'
        ? `/news/${item.slug}`
        : item.slug
    } else {
      url = `/drug/${item.slug}`
      if (item.realName && item.realName !== item.name) {
        url += `?a=${item.name.trim()}`
      }
    }

    window.location = url
  }

  onSuggestionsClearRequested () {
    this.setState({
      autoCompleteData: []
    })
  }

  getSuggestionValue (suggestion) {
    // @todo: refactor to use config
    return suggestion._index.includes('talktofrank-content')
      ? suggestion._source.title
      : suggestion._source.name
  }

  renderSuggestion (result) {
    const SearchResultComponent =
      result._index.includes('talktofrank-content')
        ? SearchResultContent
        : SearchResultDrug

    return <SearchResultComponent
      item={result._source}
      prefix={true}
      tag={'p'}
      searchTerm={this.state.searchTerm}
      highlight={result.highlight
        ? result.highlight
        : null
      }
    />
  }

  render () {
    const { searchTerm, autoCompleteData, currentSuggestion, activedescendant } = this.state
    const { id, labelHidden, label, button } = this.props

    return (
      <div className='form-group form-group--flush'>
        <label htmlFor={id} className='form-label form-label--large'>{label}</label>
        <FormHint id={`${this.props.id}_hint`} className='visually-hidden'>When autocomplete results are available use up and down arrows to review and enter to select. </FormHint>
        <Autosuggest
          suggestions={autoCompleteData}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          id={id}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionHighlighted={this.onSuggestionHighlighted}
          inputProps={{
            className: `form-control form-control--large ${!autoCompleteData.length && searchTerm.trim().length > 2 ? 'form-control--underline' : ''}`,
            id: id,
            value: searchTerm,
            onKeyDown: this.handleKeyPress,
            onChange: this.onChange,
            placeholder: this.props.placeholder,
            type: 'text',
            role: 'textbox',
            'aria-describedby': `${this.props.id}_hint`,
            'aria-owns': `${this.props.id}_container`,
            'aria-activedescendant': activedescendant
          }}
          ref={input => { this.searchInput = input }}
          required
        />
      </div>
    )
  }
}

export default FormGroup

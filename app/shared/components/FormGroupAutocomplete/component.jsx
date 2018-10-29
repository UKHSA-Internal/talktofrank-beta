import React, { PureComponent } from 'react'
import classNames from 'classnames'
import Button from '../Button/component.jsx'
import Svg from '../Svg/component.jsx'
import Autosuggest from 'react-autosuggest'
import {browserHistory} from 'react-router'
import axios from 'axios'
import SearchResultDrug from '../SearchResultDrug/component'
import SearchResultContent from '../SearchResultContent/component'

class FormGroup extends PureComponent {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.state = {
      id: '',
      searchTerm: '',
      autoCompleteData: []
    }
  }

  componentDidMount() {
    this.searchInput.input.focus()
  }

  onChange (event, { newValue }) {
    this.setState({
      searchTerm: newValue
    })
  }

  // @todo: refactor to container
  async getSuggestions (value) {
    console.log('Get suggestions', value)
    const response = await axios
      .get(`/api/v1/search/autocomplete/${value}`)
    return response.data.hits
  }

  onSuggestionsFetchRequested ({ value }) {
    this.getSuggestions(value).then(resp => {
      this.setState({
        autoCompleteData: resp.splice(0, 5)
      })
    })
  }

  handleSubmit () {
    if (this.state.searchTerm !== '') {
      window.location = `/search/${this.state.searchTerm.toLowerCase()}`
    }
  }

  shouldRenderSuggestions(value) {
    return value.trim().length > 1
  }

  renderSuggestionsContainer({ containerProps , children, query }) {
    return (
      <React.Fragment>
        <div className='input-group-append'>
          <Button className='btn--flat'>
            <span className='sr-only'>Submit search</span>
            <Svg url='/ui/svg/magnifying.svg' alt='Submit search'/>
          </Button>
        </div>
        <div {...containerProps}>
          {children}
        </div>
      </React.Fragment>
    )
  }

  onSuggestionSelected (event, suggestionItem) {
    event.preventDefault()
    const item = suggestionItem.suggestion._source
    let url = ''
    switch (suggestionItem.suggestion._index) {
      case 'talktofrank-beta-content':
        url = item.type === 'news'
          ? `/news/${item.slug}`
          : item.slug
        break
      default :
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
    return suggestion._index === 'talktofrank-beta-content'
      ? suggestion._source.title
      : suggestion._source.name
  }

  renderSuggestion (result) {
    switch (result._index) {
      // @todo: refactor to use config
      case 'talktofrank-content-v0.0.1' :
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
  }

  render () {
    let classes = classNames('input-group', this.props.className)
    let controlClasses = classNames('form-control', this.props.modifiers)
    const { searchTerm, autoCompleteData } = this.state
    const { id, labelHidden, label, button } = this.props

    return (
      <div className={classes}>
        <label htmlFor={id} className='form-label h3'>{label}</label>
        <Autosuggest
          suggestions={autoCompleteData}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={{
            className: controlClasses,
            id: id,
            value: searchTerm,
            onKeyDown: this.handleKeyPress,
            onChange: this.onChange,
            placeholder: this.props.placeholder,
            type: 'search',
            role: 'combobox',
            'aria-owns': this.props.resultsId,
            'aria-activedescendant': this.state.id
          }}
          ref={input => { this.searchInput = input }}
          required
        />

      </div>
    )
  }
}

export default FormGroup

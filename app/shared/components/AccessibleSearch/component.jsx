import React from 'react'
import Autocomplete from 'accessible-autocomplete/react'
import Button from '../Button/component'
import Icon from '../Icon/component'
import Form from '../Form/component.jsx'

export default class AccessibleSearch extends React.Component {
  suggest(query, populateResults) {
    fetch(`/api/v1/search/autocomplete/${query}?page=0&pageSize=10`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const results = data.hits.map(drug => {
          if (drug._source.title) {
            return `<span data-type='news' data-slug='${drug._source.slug}'>${drug._source.title}</span>`
            /*eslint-disable */
          } else if (drug._source.name != drug._source.realName) {
            /*eslint-enable */
            return `<span data-type='drug' data-slug='${drug._source.slug}' class='autocomplete__option--background'>${drug._source.name}</span> (${drug._source.realName})`
          }
          return `<span data-type='drug' data-slug='${drug._source.slug}' class='autocomplete__option--background'>${drug._source.realName}</span>`
        })
        populateResults(results)
      })
      .catch(e => console.error(e))
  }

  // Extracts selection type and slug from selected option html string
  handleSearchSubmit = term => {
    if (term !== '') {
      let path = ''
      let searchTerm = ''
      if (term.includes("data-type='drug'")) {
        path = '/drug/'
        searchTerm = encodeURIComponent(term.match(/data-slug='([^']*)'/)[1])
      } else if (term.includes("data-type='news'")) {
        path = '/news/'
        searchTerm = encodeURIComponent(term.match(/data-slug='([^']*)'/)[1])
      } else {
        path = '/search/'
        searchTerm = encodeURIComponent(
          term
            .replace(/<\/?span[^>]*>/g, '')
            .toLowerCase()
            .trim()
        )
      }
      if (searchTerm !== '') {
        window.location = `${path}${searchTerm}`
      }
    }
  }

  render() {
    const iconSubmit = {
      label: 'Submit search',
      url: '/ui/svg/magnifying-white.svg'
    }
    return (
      <Form
        onSubmit={this.handleSearchSubmit.bind(this)}
        role="search"
        className="form--search constrain form--search-home"
      >
        <div
          className={
            'accessiblesearch__wrapper' +
            (this.props.isSearch ? ' accessiblesearch__wrapper--search' : '')
          }
        >
          <label
            htmlFor="autocomplete"
            className="form-label form-label--large"
          >
            Search for any drug...
          </label>
          <div className="accessiblesearch__container">
            <Autocomplete
              id="autocomplete"
              name="search"
              confirmOnBlur="false"
              source={this.suggest}
              placeholder="Look up a drug..."
              onConfirm={this.handleSearchSubmit}
              templates={{
                inputValue: str =>
                  str ? str.replace(/<\/?span[^>]*>/g, '') : str
              }}
              displayMenu="overlay"
            />
            <Button
              className="btn btn--search submit"
              clickHandler={this.handleSearchSubmit.bind(this)}
            >
              <Icon {...iconSubmit} />
            </Button>
          </div>
        </div>
      </Form>
    )
  }
}

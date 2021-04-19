import React from 'react'
import Autocomplete from 'accessible-autocomplete/react'
import Button from '../Button/component'
import Icon from '../Icon/component'
export default () => {
  function suggest(query, populateResults) {
    fetch(`/api/v1/search/autocomplete/${query}?page=0&pageSize=10`)
      .then(res => res.json())
      .then(data => {
        const results = data.hits.map(drug => {
          if (drug._source.title) {
            return drug._source.title
            /*eslint-disable */
          } else if (drug._source.name != drug._source.realName) {
            /*eslint-enable */
            return `<span class='autocomplete__option--background'>${drug._source.name}</span> (${drug._source.realName})`
          }
          return `<span class='autocomplete__option--background'>${drug._source.realName}</span>`
        })
        populateResults(results)
      })
      .catch(e => console.error(e))
  }
  let iconSubmit = {
    label: 'Submit search',
    url: '/ui/svg/magnifying-white.svg'
  }
  return (
    <div className="accessiblesearch__wrapper">
      <Autocomplete
        id="autocomplete"
        source={suggest}
        placeholder="Enter a drug (e.g. Mandy)"
        templates={{
          inputValue: str => (str ? str.replace(/<\/?span[^>]*>/g, '') : str)
        }}
        displayMenu="overlay"
      />
      <Button className="btn btn--search submit">
        <Icon {...iconSubmit} /> Search
      </Button>
    </div>
  )
}

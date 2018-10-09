import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Main from '../Main/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Button from '../Button/component.jsx'
import Hero from '../Hero/component.jsx'

// @todo @refactor @joel - haul this out of here and into a fixture / Contentful
export default class PageHome extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Main className='homepage'>
          <section className='panel panel--padding-large panel--pink'>
            <Form>
              <FormGroupAutocomplete
                button='true'
                modifiers='form-control--search'
                className='input-group-autocomplete--inverse'
                id='search-a-z'
                label='Search for any drug'
                showContent
                titleClass='h4'
                placeholder='Enter a drug name (e.g. Mandy, Cocaine, Weed)'
                resultsId='body-results'
              />
            </Form>
          </section>
        </Main>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

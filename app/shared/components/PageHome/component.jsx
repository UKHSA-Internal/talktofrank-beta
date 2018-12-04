import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Main from '../Main/component.jsx'
import Footer from '../Footer/component.jsx'
import { GA } from '../GoogleAnalytics/component.jsx'
import Hero from '../Hero/component.jsx'
import CardDeck from '../CardDeck/component.jsx'
import Article from '../Article/component.jsx'
import Grid from '../Grid/component.jsx'
import Button from '../Button/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Accent from '../Accent/component.jsx'
import Form from '../Form/component.jsx'
import Icon from '../Icon/component.jsx'
import FormGroupAutocomplete from '../FormGroupAutocomplete/component.jsx'

export default class PageHome extends React.PureComponent {
  handleSearchSubmit () {
    const searchTerm = encodeURIComponent(
      this.formAutocomplete.searchInput.input.value
        .toLowerCase()
        .trim()
    )
    if (searchTerm !== '') {
      window.location = `/search/${searchTerm}`
    }
  }

  render () {
    let iconSubmit = {
      label: 'Submit search',
      url: '/ui/svg/magnifying-pink.svg'
    }
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Hero {...this.props.hero}/>
        <Accent className='accent--muted' modifier='wrapper--constant constrain'>
          <Form role='search' className='form--search'>
            <FormGroupAutocomplete
             button='true'
             id='homepage-large-search'
             label='Search for any drug…'
             placeholder='Enter a drug (e.g. Mandy)'
             ref={input => { this.formAutocomplete = input }}
             />
             <Button className='btn--flat btn--flat-right submit' clickHandler={this.handleSearchSubmit.bind(this)}><Icon {...iconSubmit}/></Button>
          </Form>
        </Accent>
        <Main>
          {this.props.featuredItemBlock &&
            <section className='wrapper spacing-top--large'>
              <Grid>
                <GridCol className='col-12 col-sm-10 offset-sm-1 list-offset'>
                  <Article {...this.props.featuredItemBlock}/>
                </GridCol>
              </Grid>
            </section>
          }
          {this.props.featuredNewsBlock && <section className='wrapper wrapper--mid'><CardDeck {...this.props.featuredNewsBlock} className='spacing-top--tight'/></section>}
        </Main>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

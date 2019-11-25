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
import WarningBar from '../AlertWarningBar/component.jsx'
import FormGroupAutocomplete from '../FormGroupAutocomplete/component.jsx'
import SiteMessageContainer from '../../containers/SiteMessageContainer/component.jsx'

export default class PageHome extends React.PureComponent {
  render () {
    let iconSubmit = {
      label: 'Submit search',
      url: '/ui/svg/magnifying-pink.svg'
    }
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Main>
          <Hero {...this.props.hero}/>
          <Accent className='accent--muted' modifier='wrapper--constant'>
            <SiteMessageContainer
              path={this.props.location}
              body={true}
            />
            <Form role='search' className='form--search constrain form--search-home'>
              <FormGroupAutocomplete
               button='true'
               id='homepage-large-search'
               className='react-autosuggest__suggestions-container--homepage'
               label='Search for any drug…'
               placeholder='Enter a drug (e.g. Mandy)'
               />
            </Form>
          </Accent>
          {this.props.featuredItemBlock &&
            <section className='wrapper spacing-top--large'>
              <Grid>
                <GridCol className='col-12 col-sm-10 offset-sm-1 list-offset list-offset--single'>
                  <Article {...this.props.featuredItemBlock}/>
                </GridCol>
              </Grid>
            </section>}
          {this.props.featuredNewsBlock && <section className='wrapper spacing--large'><CardDeck {...this.props.featuredNewsBlock} className='spacing-top--tight'/></section>}
          {this.props.commonDrugsBlock &&
            <Accent className='accent--muted'>
              <CardDeck {...this.props.commonDrugsBlock} className='spacing-top--tight card-deck--responsive'/>
            </Accent>}
        </Main>
        <Footer />
        <GA/>
        <SiteMessageContainer
          path={this.props.location}
        />
      </React.Fragment>
    )
  }
}

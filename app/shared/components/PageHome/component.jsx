import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Main from '../Main/component.jsx'
import Heading from '../Heading/component.jsx'
import FormGroupAutocomplete from '../FormGroupAutocomplete/component.jsx'
import Form from '../Form/component.jsx'
import Footer from '../Footer/component.jsx'
import CardDeck from '../CardDeck/component.jsx'
import LinkDeck from '../LinkDeck/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Button from '../Button/component.jsx'

// @todo @refactor @joel - haul this out of here and into a fixture / Contentful
export default class PageHome extends React.PureComponent {
  render () {

    return (
      <React.Fragment>
        <Masthead/>
        <Main>
          <section className='panel panel--padding-large'>
            <Grid>
              <GridCol className='col-12 col-md-6'>
                <Heading text='Honest information about drugs' type='h1' modifiers='display-3 spacing-top--flush'/>
              </GridCol>
            </Grid>
          </section>
        </Main>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

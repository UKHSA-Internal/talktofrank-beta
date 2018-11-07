import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Main from '../Main/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Accent from '../Accent/component.jsx'
import Article from '../Article/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

export default class PageHome extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Hero {...hero}/>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-10 offset-sm-1 list-offset'>
              <Article {...featuredItem}/>
            </GridCol>
          </Grid>
          <CardDeck {...news} className='spacing-top--tight'/>
        </Main>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

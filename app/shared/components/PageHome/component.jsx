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

export default class PageHome extends React.PureComponent {
  render () {
    // @refactor @joel - this image data and heading stuff should be coming form contentful
    let hero = {
      heading: {
        wrapper: 'h1',
        text: 'Honest <br/>information <br/>about drugs'
      },
      url: '/',
      images: {
        400: '/ui/img/hero/hero-small__323x310.jpg',
        600: '/ui/img/hero/hero-medium__882x481.jpg',
        1200: '/ui/img/hero/hero-large__1445x460.jpg'
      }
    }
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Hero {...hero}/>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Main from '../Main/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Button from '../Button/component.jsx'
import Hero from '../Hero/component.jsx'
import CardDeck from '../CardDeck/component.jsx'

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

    //  @refactor @joel - this feature/TTF-583-news-listing
    //
    let news = {
      heading: {
        type: 'h2',
        text: 'Featured news',
        url: '/latest',
        className: 'h3'
      },
      allnews: {
        type: 'h3',
        text: 'All news',
        url: '/latest',
        className: 'h4'
      },
      teasers: [
        {
          url: '/news/something-else',
          className: 'card--quiet',
          imageClass: 'card-img',
          images: {
            400: '/ui/img/content/featured-news-1.jpg'
          },
          category: 'drugs news',
          heading: {
            type: 'h3',
            text: 'Ecstasy - How do I know what I’m taking?',
            className: 'h4 d-inline-block card-title'
          },
          linkLabel: 'Read more'
        },
        {
          url: '/news/something-else',
          className: 'card--quiet',
          imageClass: 'card-img',
          images: {
            400: '/ui/img/content/featured-news-2.jpg'
          },
          category: 'drugs news',
          heading: {
            type: 'h3',
            text: 'The total truth about illegal highs',
            className: 'h4 card-title'
          },
          isSticky: true,
          linkLabel: 'Read more'
        },
        {
          url: '/news/something-else',
          className: 'card--quiet',
          imageClass: 'card-img',
          images: {
            400: '/ui/img/content/featured-news-3.jpg'
          },
          category: 'drugs news',
          heading: {
            type: 'h3',
            text: 'The text of the thing',
            className: 'h4 card-title'
          },
          linkLabel: 'Read more'
        }
      ]
    }

    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Hero {...hero}/>
        <CardDeck {...news} />
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

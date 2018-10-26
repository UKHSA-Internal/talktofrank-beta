import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Main from '../Main/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Button from '../Button/component.jsx'
import Hero from '../Hero/component.jsx'
import CardDeck from '../CardDeck/component.jsx'
import Accent from '../Accent/component.jsx'

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
        <Accent>
          <ul className='list-unstyled list-offset'>{ props.list && props.list.map((item, i) => (
            // eslint-disable-next-line no-self-compare
            <li className={`list-item ${item.fields.image ? ('list-item--has-image' + (item.fields.imagepos & 1 === 1 ? ' list-item--alternate' : '')) : ''} `} key={item.sys.id} >
              <a className='list-item__link' href={`/news/${item.fields.slug}`}>
                {item.fields.image && <Picture {...item.fields.image}/>}
                <div className='list-item__inner'>
                  <h2 className='list-item__title h3 heading-inline'><span>{item.fields.title}</span></h2>
                  <Time time={('Updated at: ' + item.originalPublishDate ? item.originalPublishDateFormatted : item.updatedAtFormatted)} dateTime={item.originalPublishDate ? item.originalPublishDate : item.updatedAt}/>
                  {item.fields.bodyLegacy && !item.fields.image && <Longform text={item.fields.bodyLegacy}/>}
                  {item.fields.summary && !item.fields.image && <Longform text={item.fields.summary}/>}
                  <p className='read-more'>Read more</p>
                </div>
              </a>
            </li>
          ))}
          </ul>
        </Accent>
        <CardDeck {...news} />
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

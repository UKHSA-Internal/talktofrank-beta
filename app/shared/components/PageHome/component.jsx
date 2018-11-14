import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Main from '../Main/component.jsx'
import Footer from '../Footer/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Hero from '../Hero/component.jsx'
import CardDeck from '../CardDeck/component.jsx'
import Article from '../Article/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Header from '../Header/component.jsx'
import { imageMap } from '../../utilities'

export default class PageHome extends React.PureComponent {
  render () {
    const { fields } = this.props
    const { featuredContentBlock, featuredNewsItem, featuredDrugsBlock } = fields
    let featuredNewsBlock = false
    let featuredItemBlock = false
    let commonDrugsBlock = false

    let hero = {
      heading: {
        wrapper: 'h1',
        text: 'Honest <br />information <br />about drugs'
      },
      url: '/'
    }
    if (fields.heroImages) {
      hero.images = imageMap(fields.heroImages)
    }

    if (featuredNewsItem) {
      featuredItemBlock = {
        fields: {
          title: featuredNewsItem.fields.title,
          slug: featuredNewsItem.fields.slug
        }
      }
      if (featuredNewsItem.fields.image) {
        featuredItemBlock.fields.image = imageMap(featuredNewsItem.fields.image)
      }
    }

    if (featuredContentBlock &&
      featuredContentBlock.fields.featuredContentItems &&
      featuredContentBlock.fields.featuredContentItems.length > 0) {
      featuredNewsBlock = {
        heading: {
          type: 'h2',
          text: featuredContentBlock.fields.title,
          url: featuredContentBlock.fields.readMoreLink,
          className: 'h3'
        },
        all: {
          type: 'h3',
          text: featuredContentBlock.fields.readMoreText,
          url: featuredContentBlock.fields.readMoreLink,
          className: 'h4'
        },
        teasers: []
      }
      featuredContentBlock.fields.featuredContentItems
        .map((item, i) => {
          let featuredItem = {
            url: `/news/${item.fields.slug}`,
            className: 'card--quiet',
            category: 'drugs news',
            heading: {
              type: 'h3',
              text: item.fields.title,
              className: 'h4 card-title'
            },
            linkLabel: 'Read more'
          }

          if (item.fields.image) {
            featuredItem.images = imageMap(item.fields.image)
            featuredItem.imageClass = 'card-img'
          }

          // crudely setting 2nd item STICKY
          if (i === 1) {
            featuredItem.sticky = true
          }

          featuredNewsBlock.teasers.push(featuredItem)
        })
    }

    // @joel - common drugs data matches featured news block
    // leaving this out of the markup until it can be styled
    // inspect 'commonDrugsBlock' var for the contents
    if (featuredDrugsBlock &&
      featuredDrugsBlock.fields.featuredContentItems &&
      featuredDrugsBlock.fields.featuredContentItems.length > 0) {
      commonDrugsBlock = {
        heading: {
          type: 'h2',
          text: featuredDrugsBlock.fields.title,
          url: '/drugs-a-z',
          className: 'h3'
        },
        all: {
          type: 'h3',
          text: 'See full drugs A - Z',
          url: '/drugs-a-z',
          className: 'h4'
        },
        teasers: []
      }
      featuredDrugsBlock.fields.featuredContentItems
        .map((item, i) => {
          let featuredItem = {
            url: `/drug/${item.fields.slug}`,
            heading: {
              type: 'h3',
              text: item.fields.drugName
            },
            linkLabel: 'Read more'
          }

          if (item.fields.image) {
            featuredItem.images = imageMap(item.fields.image)
            featuredItem.imageClass = 'card-img'
          }

          // crudely setting 2nd item STICKY
          if (i === 1) {
            featuredItem.sticky = true
          }

          commonDrugsBlock.teasers.push(featuredItem)
        })
    }
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Hero {...hero}/>
        <Main>
          {featuredItemBlock &&
          <Grid>
            <GridCol className='col-12 col-sm-10 offset-sm-1 list-offset'>
              <Article {...featuredItemBlock}/>
            </GridCol>
          </Grid>
          }
          {featuredNewsBlock && <CardDeck {...featuredNewsBlock} className='spacing-top--tight'/>}
          {commonDrugsBlock &&
          <React.Fragment>
            <CardDeck {...commonDrugsBlock} className='spacing-top--tight'/>
          </React.Fragment>}
        </Main>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Main from '../Main/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Hero from '../Hero/component.jsx'
import CardDeck from '../CardDeck/component.jsx'
import Accent from '../Accent/component.jsx'
import Article from '../Article/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

export default class PageHome extends React.PureComponent {
  render () {
    console.log(this.props)

    const { fields } = this.props
    const { featuredContentBlock, featuredNewsItem } = fields

    // @refactor @joel - this image data and heading stuff should be coming form contentful
    let hero = {
      heading: {
        wrapper: 'h1',
        text: fields.strapline
      },
      url: '/',
      images: {
        400: fields.heroImages.fields.imageSmall.fields.file.url,
        600: fields.heroImages.fields.imageMedium.fields.file.url,
        1200: fields.heroImages.fields.imageLarge.fields.file.url
      }
    }

    let featureditemBlock = false
    if(featuredNewsItem) {
      featureditemBlock = {
        fields: {
          title: featuredNewsItem.title,
          slug: `/news/${featuredNewsItem.title}`
        }
      }

//       if (featuredNewsItem.image && featuredNewsItem.image.fields) {
//
//       }
    }


    let featuredNewsBlock = false
    console.log(featuredContentBlock)
//     if(featuredContentBlock &&
//       featuredContentBlock.fields.featuredContentItems &&
//       featuredContentBlock.fields.featuredContentItems.length > 0) {
//
//       featuredNewsBlock = {
//         heading: {
//           type: 'h2',
//           text: featuredContentBlock.fields.title,
//           url: '/latest',
//           className: 'h3'
//         },
//         allnews: {
//           type: 'h3',
//           text: 'All news',
//           url: '/latest',
//           className: 'h4'
//         },
//         teasers: []
//       }
//       featuredContentBlock.fields.featuredContentItems
//         .map((item, i) => {
//           let featuredItem = {
//             url: `/news/${item.fields.slug}`,
//             className: 'card--quiet',
//             imageClass: 'card-img',
//             images: {
//               400: '/ui/img/content/featured-news-2.jpg'
//             },
//             category: 'drugs news',
//             heading: {
//               type: 'h3',
//               text: item.fields.title,
//               className: 'h4 card-title'
//             },
//             linkLabel: 'Read more'
//           }
//
//           if (item.image.fields) {
//             featuredItem.images = {
// //               400: item.image.fields.imageSmall.fields.file.url,
// //               600: item.image.fields.imageMedium.fields.file.url,
// //               1200: item.image.fields.imageLarge.fields.file.url
//             }
//           }
//
//           // crudely setting 2nd item STICKY
//           if (i === 1) {
//             featuredItem.sticky = true
//           }
//
//           featuredNewsBlock.teasers.push(featuredItem)
//         })
//     }

    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Hero {...hero}/>
        <Main>
          {featureditemBlock &&<Grid>
            <GridCol className='col-12 col-sm-10 offset-sm-1 list-offset'>
              <Article {...featureditemBlock}/>
            </GridCol>
          </Grid>}
          {featuredNewsBlock && <CardDeck {...featuredNewsBlock} className='spacing-top--tight'/>}
        </Main>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}

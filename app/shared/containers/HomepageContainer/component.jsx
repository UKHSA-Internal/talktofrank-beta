import { connect } from 'react-redux'
import PageHome from '../../components/PageHome/component.jsx'
import { imageMap, fieldIncludesVideo } from '../../utilities'

const mapStateToProps = (state, ownProps) => {
  const { fields } = state.app.pageData

  const {
    featuredContentBlock,
    featuredNewsItem,
    featuredDrugsBlock,
    drugGrid,
    someFrankAdvice
  } = fields

  let featuredNewsBlock = false
  let featuredItemBlock = false
  let commonDrugsBlock = false
  let frankAdviceBlock = false
  let drugsGrid = false
  let hero = {
    heading: {
      wrapper: 'h1',
      text:
        '<span class="block">Honest information</span><span class="block">about drugs</span>'
    },
    url: '/'
  }

  hero.images = imageMap(fields, 'heroImages')
  if (featuredNewsItem) {
    featuredItemBlock = {
      fields: {
        title: featuredNewsItem.fields.title,
        slug: featuredNewsItem.fields.slug,
        headerVideo:
          fieldIncludesVideo(featuredNewsItem.fields.headerVideo) || null
      },
      date: featuredNewsItem.date,
      dateFormatted: featuredNewsItem.dateFormatted
    }

    featuredItemBlock.fields.image = imageMap(featuredNewsItem.fields)
  }
  if (
    someFrankAdvice &&
    someFrankAdvice.fields &&
    someFrankAdvice.fields.articles
  ) {
    frankAdviceBlock = {}
    frankAdviceBlock.title = someFrankAdvice.fields.title
    frankAdviceBlock.link = someFrankAdvice.fields.viewMoreUrl
    frankAdviceBlock.articles = someFrankAdvice.fields.articles.map(
      article => ({
        fields: {
          heading: {
            type: 'h3',
            text: article.fields.title,
            className: 'h4 card-title'
          },
          url: `/news/${article.fields.slug}`
        },
        date: article.date,
        dateFormatted: article.dateFormatted,
        images: imageMap(article.fields)
      })
    )
  }
  if (
    featuredContentBlock &&
    featuredContentBlock.fields &&
    featuredContentBlock.fields.featuredContentItems &&
    featuredContentBlock.fields.featuredContentItems.length > 0
  ) {
    featuredNewsBlock = {
      heading: {
        type: 'h2',
        text: featuredContentBlock.fields.title,
        url: featuredContentBlock.fields.readMoreLink,
        className: 'h3'
      },
      allnews: {
        type: 'h3',
        text: featuredContentBlock.fields.readMoreText,
        url: featuredContentBlock.fields.readMoreLink,
        className: 'h4'
      },
      teasers: []
    }
    featuredContentBlock.fields.featuredContentItems
      .filter(item => item.fields)
      .map((item, i) => {
        let featuredItem = {
          url: `/news/${item.fields.slug}`,
          className: 'card--quiet',
          datetime: item.date,
          time: item.dateFormatted,
          category: 'drugs news',
          heading: {
            type: 'h3',
            text: item.fields.title,
            className: 'h4 card-title'
          },
          linkLabel: fieldIncludesVideo(item.fields.headerVideo)
            ? 'Watch now'
            : 'Read more'
        }

        featuredItem.images = imageMap(item.fields)
        if (featuredItem.images) {
          featuredItem.imageClass = 'card-img'
        }

        if (fieldIncludesVideo(item.fields.headerVideo)) {
          featuredItem.headerVideo = item.fields.headerVideo.fields
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
  if (
    featuredDrugsBlock &&
    featuredDrugsBlock.fields &&
    featuredDrugsBlock.fields.featuredContentItems &&
    featuredDrugsBlock.fields.featuredContentItems.length > 0
  ) {
    commonDrugsBlock = {
      heading: {
        type: 'h2',
        text: featuredDrugsBlock.fields.title,
        url: '/drugs-a-z',
        className: 'h3'
      },
      allnews: {
        type: 'h3',
        text: 'See full drugs A - Z',
        url: '/drugs-a-z',
        className: 'h4'
      },
      teasers: []
    }
    featuredDrugsBlock.fields.featuredContentItems.map((item, i) => {
      let featuredItem = {
        url: `/drug/${item.fields.slug}`,
        heading: {
          type: 'h3',
          text: item.fields.drugName,
          className: 'h4 card-title'
        },
        linkLabel: null
      }

      featuredItem.images = imageMap(item.fields)
      if (featuredItem.images) {
        featuredItem.imageClass = 'card-img'
      }

      // crudely setting 2nd item STICKY
      if (i === 1) {
        featuredItem.sticky = true
      }

      commonDrugsBlock.teasers.push(featuredItem)
    })
  }
  if (
    drugGrid &&
    drugGrid.fields &&
    drugGrid.fields.drug &&
    drugGrid.fields.drug.length > 0
  ) {
    drugsGrid = drugGrid.fields.drug.map(d => d.fields)
  }
  return {
    hero,
    drugsGrid,
    featuredNewsBlock,
    featuredItemBlock,
    commonDrugsBlock,
    frankAdviceBlock
  }
}

export default connect(mapStateToProps)(PageHome)

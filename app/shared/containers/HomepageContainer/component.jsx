import { connect } from 'react-redux'
import PageHome from '../../components/PageHome/component.jsx'
import { imageMap } from '../../utilities'

const mapStateToProps = (state, ownProps) => {
  const { fields } = state.app.pageData
  const { featuredContentBlock, featuredNewsItem, featuredDrugsBlock } = fields
  let featuredNewsBlock = false
  let featuredItemBlock = false
  let commonDrugsBlock = false

  let hero = {
    heading: {
      wrapper: 'h1',
      text: '<span class="block">Honest</span> <span class="block">information</span> <span class="block">about drugs</span>'
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
      },
      date: featuredNewsItem.date,
      dateFormatted: featuredNewsItem.dateFormatted
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
      allDrugs: {
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

  return { hero, featuredNewsBlock, featuredItemBlock, commonDrugsBlock }
}

export default connect(mapStateToProps)(PageHome)

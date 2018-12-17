import { connect } from 'react-redux'
import { fieldIncludesImages, imageMap } from '../../utilities'

import BlockFeaturedContent from '../../components/BlockFeaturedContent/component.jsx'

const mapStateToProps = (state, ownProps) => {
  let featuredContent = []
  const { featuredBlockData } = state.app

  if (featuredBlockData &&
    featuredBlockData.fields.featuredContentItems &&
    featuredBlockData.fields.featuredContentItems.length > 0) {
    featuredContent = {
      heading: {
        type: 'h2',
        text: featuredBlockData.fields.title,
        url: featuredBlockData.fields.readMoreLink,
        className: 'h3'
      },
      allnews: {
        type: 'h3',
        text: featuredBlockData.fields.readMoreText,
        url: featuredBlockData.fields.readMoreLink,
        className: 'h4'
      },
      teasers: []
    }
    featuredBlockData.fields.featuredContentItems
      .filter(item => item.fields)
      .map((item, i) => {
        let featuredContentItem = {
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

        if (item.fields.image && fieldIncludesImages(item.fields.image)) {
          featuredContentItem.images = imageMap(item.fields.image)
          featuredContentItem.imageClass = 'card-img'
        }

        // crudely setting 2nd item STICKY
        if (i === 1) {
          featuredContentItem.sticky = true
        }

        featuredContent.teasers.push(featuredContentItem)
      })
  }

  return featuredContent
}

export default connect(mapStateToProps)(BlockFeaturedContent)

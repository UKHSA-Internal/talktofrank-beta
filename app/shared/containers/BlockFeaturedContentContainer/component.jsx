import { connect } from 'react-redux'
import { fieldIncludesImages, imageMap } from '../../utilities'

import BlockFeaturedContent from '../../components/BlockFeaturedContent/component.jsx'

const mapStateToProps = (state, ownProps) => {

  if (Object.keys(state.app.relatedContent).length > 0) {
    return null
  }

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
          linkLabel: item.fields.headerVideo ? 'Watch now' : 'Read more'
        }

        featuredContentItem.images = imageMap(item.fields)
        if (featuredContentItem.images) {
          featuredContentItem.imageClass = 'card-img'
        }

        if (item.fields.headerVideo) {
          featuredContentItem.headerVideo = item.fields.headerVideo.fields
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

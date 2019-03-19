import React from 'react'
import { connect } from 'react-redux'
import BlockFeaturedContent from '../../components/BlockFeaturedContent/component.jsx'
import { fetchRelatedContent, setRelatedContent } from '../../actions'

class BlockRelatedContentContainer extends React.PureComponent {
  componentDidMount() {
    if (this.props.tags.length) {
      this.props.fetchRelatedContent(this.props.tags, this.props.id)
    } else {
      this.props.setRelatedContentLoaded()
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.content.teasers.length && <BlockFeaturedContent {...this.props.content} />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let content = {
    heading: {
      type: 'h2',
      text: 'Related News',
      url: '/news',
      className: 'h3'
    },
    allnews: {
      type: 'h3',
      text: 'All news',
      url: '/news',
      className: 'h4'
    },
    teasers: [],
    gridClassName: 'col-md-4'
  }
  let tags = []

  if (state.app.pageData && state.app.pageData.fields.tags) {
    state.app.pageData.fields.tags.map(tag => {
      tags.push(tag.sys.id)
    })
  }

  if (state.app.relatedContent && state.app.relatedContent.list) {
    state.app.relatedContent.list
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

        featuredContentItem.images = item.fields.image
        if (featuredContentItem.images) {
          featuredContentItem.imageClass = 'card-img'
        }

        if (item.fields.headerVideo) {
          featuredContentItem.headerVideo = item.fields.headerVideo.fields
        }

        if (i === 1) {
          featuredContentItem.sticky = true
        }

        content.teasers.push(featuredContentItem)
      })
  }

  return { id: state.app.pageData.sys.id, tags, content }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRelatedContent: (tags, currentId) => {
      dispatch(fetchRelatedContent(tags, currentId))
    },
    setRelatedContentLoaded: () => {
      dispatch(setRelatedContent({list: []}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockRelatedContentContainer)

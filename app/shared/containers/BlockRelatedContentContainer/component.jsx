import React from 'react'
import { connect } from 'react-redux'
import BlockRelatedContent from '../../components/BlockRelatedContent/component.jsx'
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
      <BlockRelatedContent {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let list = []
  let tags = []

  if (state.app.relatedContent && state.app.relatedContent.list) {
    list = state.app.relatedContent.list
  }

  if (state.app.pageData && state.app.pageData.fields.tags) {
    state.app.pageData.fields.tags.map(tag => {
      tags.push(tag.sys.id)
    })
  }

  return { id: state.app.pageData.sys.id, tags, list }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRelatedContent: (tags, currentId) => {
      dispatch(fetchRelatedContent(tags, currentId))
    },
    setRelatedContentLoaded: () => {
      dispatch(setRelatedContent({list: []}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockRelatedContentContainer)

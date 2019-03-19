import { connect } from 'react-redux'
import React from 'react'
import BlockRelatedContentContainer from '../BlockRelatedContentContainer/component'
import BlockFeaturedContentContainer from '../BlockFeaturedContentContainer/component'
import * as actions from '../../actions'

class BlockAdditionalNewsContentContainer extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <BlockRelatedContentContainer />
        {(this.props.relatedContent.relatedContentReadyStatus === actions.REQUEST_RELATED_CONTENT_STATUS_VALID && this.props.relatedContent.list.length === 0) &&
        <BlockFeaturedContentContainer />
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.app
}

export default connect(mapStateToProps)(BlockAdditionalNewsContentContainer)

import React from 'react'
import BlockRelatedContentContainer from '../../containers/BlockRelatedContentContainer/component'
import BlockFeaturedContentContainer from '../../containers/BlockFeaturedContentContainer/component'
import * as actions from '../../actions'

const BlockAdditionalNewsContent = props => {
  console.log(props)
  return (
    <React.Fragment>
      <BlockRelatedContentContainer />
      {props.relatedContent.relatedContentReadyStatus === actions.REQUEST_RELATED_CONTENT_STATUS_VALID && props.relatedContent.list.length === 0 &&
        <BlockFeaturedContentContainer/>
      }
    </React.Fragment>
  )
}

export default BlockAdditionalNewsContent

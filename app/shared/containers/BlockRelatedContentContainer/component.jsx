import { connect } from 'react-redux'

import BlockRelatedContent from '../../components/BlockRelatedContent/component.jsx'
import { fetchRelatedContent } from '../../actions'

class BlockRelatedContentContainer extends React.PureComponent {

  componentDidMount() {
    console.log(this.props)
//     this.props.fetchRelatedContent()
  }

  render() {
    return (
      <BlockRelatedContent />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return { tags: ['test'] }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchRelatedContent: (tags) => {
      dispatch(fetchRelatedContent(tags))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockRelatedContentContainer)

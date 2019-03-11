import { connect } from 'react-redux'

import AmpPageNews from '../../components/AmpPageNews/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

export default connect(mapStateToProps)(AmpPageNews)

import { connect } from 'react-redux'

import AmpPageNews from '../../components/PageNews/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(AmpPageNews)

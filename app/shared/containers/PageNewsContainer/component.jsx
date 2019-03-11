import { connect } from 'react-redux'

import PageNews from '../../components/PageNews/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

export default connect(mapStateToProps)(PageNews)

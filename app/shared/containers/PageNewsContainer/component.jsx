import { connect } from 'react-redux'

import PageNews from '../../components/PageNews/component.jsx'

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return state.app.pageData
}

export default connect(mapStateToProps)(PageNews)

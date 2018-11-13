import { connect } from 'react-redux'

import PageNews from '../../components/PageNews/component.jsx'

const mapStateToProps = (state, ownProps) => {
  console.log(state.app.pageData)
  return state.app.pageData
}

export default connect(mapStateToProps)(PageNews)

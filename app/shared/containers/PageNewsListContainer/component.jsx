import { connect } from 'react-redux'

import PageNewsList from '../../components/PageNewsList/component.jsx'
import { fetchNewsList } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  state.app.pageData['pageNumber'] = ownProps.match.params.number ? parseInt((ownProps.match.params.number - 1), 10) : 0
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchNewsList: (page) => {
      dispatch(fetchNewsList(page))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNewsList)

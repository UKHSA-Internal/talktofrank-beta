import { connect } from 'react-redux'
import { fetchSearchTerm } from '../../actions'

import SearchPage from '../../components/PageSearch/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchSearchTerm: (searchTerm, pageNumber) => {
      dispatch(fetchSearchTerm(searchTerm, pageNumber))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

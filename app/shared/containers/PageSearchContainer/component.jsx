import { connect } from 'react-redux'
import { fetchSearchTerm } from '../../actions'

import SearchPage from '../../components/PageSearch/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    searchForTerm: (searchTerm) => {
      dispatch(fetchSearchTerm(searchTerm))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

import { connect } from 'react-redux'

import PageGeneral from '../../components/PageGeneral/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.app.pageData,
    className: 'col-12 col-sm-7 col-md-6 offset-md-2'
  }
}

export default connect(mapStateToProps)(PageGeneral)

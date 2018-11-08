import { connect } from 'react-redux'
import PageFeedbackForm from '../../components/PageFeedbackForm/component.jsx'
import { submitFeedbackForm } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    submitForm: (data) => {
      dispatch(submitFeedbackForm(data))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PageFeedbackForm)

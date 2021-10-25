import React from 'react'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Heading from '../Heading/component'
import Footer from '../Footer/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Main from '../Main/component'
import Form from '../Form/component.jsx'
import ScrollTo from '../ScrollTo/component.jsx'
import FormGroup from '../FormGroup/component'
import Textarea from '../Textarea/component'
import Button from '../Button/component.jsx'
import Longform from '../Longform/component'
import { ErrorSummary, getErrors } from '../FormErrors/component'
import SiteMessageContainer from '../../containers/SiteMessageContainer/component'
import HelpPanels from '../HelpPanels/component'
import MatomoAnalytics from '../MatomoAnalytics/component'

export default class PageFeedbackForm extends React.Component {
  static defaultProps = {
    errors: [],
    error: false
  }

  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      feedback: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitForm(this.state)
  }

  render() {
    if (this.props.submitted) {
      window.location.href = '/feedback/success'
      return null
    }

    let errors = this.props.error ? getErrors(this.props.errors) : []

    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Main className='main--muted'>
          <Accent className='accent--shallow'>
            <Heading type='h1' className='page-title' text={this.props.pageData.fields.title} />
          </Accent>
          <Accent>
            <Grid>
              <GridCol className='col-12 col-sm-7 col-md-6 offset-md-2'>

                {this.props.pageData.fields.body && <Longform className='spacing-bottom--single' text={this.props.pageData.fields.body}/>}

                {this.props.error &&
                  <ScrollTo>
                    <ErrorSummary ref={this.formMessage} errors={this.props.errors} />
                  </ScrollTo>
                }

                {!this.props.submitted &&
                <Form className='spacing-bottom--large' handleSubmit={this.handleSubmit}>
                  <FormGroup className='form-control--reversed form-control--large' maxLength={100} label='Subject' id='subject' name='subject' value={this.state.subject} onChange={this.handleChange} error={errors.subject} hint='Must be fewer than 100 characters' hintId='subject-hint-id'/>
                  <Textarea label='Feedback' id='feedback' name='feedback' value={this.state.feedback} onChange={this.handleChange} error={errors.feedback} hint='Must be fewer than 500 characters' hintId='feedback-hint-id'/>
                  <Button className='btn--primary' disabled={this.props.loading}>
                    Send feedback
                  </Button>
                </Form>
                }
              </GridCol>
            </Grid>
          </Accent>
          <HelpPanels />
        </Main>
        <Footer />
        <MatomoAnalytics />
        <SiteMessageContainer
          path={this.props.location}
        />
      </React.Fragment>
    )
  }
}

import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Form from '../Form/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import ScrollTo from '../ScrollTo/component.jsx'
import FormHint from '../FormHint/component.jsx'
import Button from '../Button/component.jsx'
import Accent from '../Accent/component.jsx'
import Anchor from '../Anchor/component.jsx'
import Longform from '../Longform/component'
import { GA } from '../GoogleAnalytics/component.jsx'
import Select from '../Select/component.jsx'
import Textarea from '../Textarea/component.jsx'
import { ErrorSummary, ErrorMessage, getErrors } from '../FormErrors/component'
import SiteMessageContainer from '../../containers/SiteMessageContainer/component'
import HelpPanels from '../HelpPanels/component.jsx'

export default class PageContactForm extends React.PureComponent {
  static defaultProps = {
    errors: [],
    error: false
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      nickname: '',
      ageRange: 'Undisclosed',
      gender: 'Undisclosed',
      message: ''
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

  render () {
    if (this.props.submitted) {
      window.location.href = 'contact/success'
      return null
    }

    const message = {
      label: 'Your message',
      id: 'message',
      name: 'message'
    }

    const age = {
      label: 'Your age ',
      supporting: '(optional)',
      selected: '',
      name: 'ageRange',
      id: 'ageRange',
      options: [
        {
          label: 'Please select',
          value: 'Undisclosed'
        },
        {
          label: 'Under 11',
          value: 'Under 11'
        },
        {
          label: '11 - 14',
          value: '11 - 14'
        },
        {
          label: '15 - 18',
          value: '15 - 18'
        },
        {
          label: '19 - 25',
          value: '19 - 25'
        },
        {
          label: '26 - 35',
          value: '26 - 35'
        },
        {
          label: '36 - 45',
          value: '36 - 45'
        },
        {
          label: '46 - 55',
          value: '46 - 55'
        },
        {
          label: '56 - 65',
          value: '56 - 65'
        },
        {
          label: '66 - 75',
          value: '66 - 75'
        },
        {
          label: '75+',
          value: '75+'
        }
      ]
    }

    let errors = this.props.error ? getErrors(this.props.errors) : []

    return (
      <React.Fragment>
        <Masthead/>
        <Main className='main--muted'>
          <Accent className='accent--shallow'>
            <Heading type='h1' className='page-title' text='Contact us via email'/>
          </Accent>
          <Accent modifier='wrapper--constant'>
            <Grid>
              <GridCol className='col-12 col-sm-7 col-md-6 offset-md-2'>

                {this.props.pageData.fields.body && <Longform className='spacing-bottom--single' text={this.props.pageData.fields.body}/>}

                {this.props.error &&
                  <ScrollTo>
                    <ErrorSummary errors={this.props.errors} />
                  </ScrollTo>
                }

                {!this.props.submitted &&
                <Form className='spacing-bottom--large' handleSubmit={this.handleSubmit}>
                  <FormGroup type='email' error={errors.email} hintId={errors.email ? 'email_error' : null} className='form-control--reversed form-control--large' label='Your email' id='email' value={this.state.email} onChange={this.handleChange} name='email'/>
                  <FormGroup type='text' error={errors.nickname} hintId={errors.nickname ? 'nickname_error' : null} className='form-control--reversed form-control--large' label='Your nickname' id='nickname' value={this.state.nickname} onChange={this.handleChange} name='nickname'/>
                  <Select {...age} error={errors.ageRange} onChange={this.handleChange} className='form-control--reversed form-control--large' value={this.state.ageRange}/>
                  <input type='hidden' id='gender' name='gender' value='Undisclosed'/>
                  <Textarea {...message} error={errors.message} hintId={errors.message ? 'message_error' : null} value={this.state.message} onChange={this.handleChange}/>
                  <Button className='btn--primary' disabled={this.props.loading}>
                    Send message
                  </Button>
                </Form>
                }
              </GridCol>
              <GridCol className='col-12 col-sm-5 col-md-4'>
                <Heading className='h4' text='What happens next?'/>
                <p>You’ll receive a reply from frank@talktofrank.com and the subject line won't have your question in it.</p>
                <p>FRANK will only reply to you - you'll never receive emails you didn't ask for.</p>
                <p>If you're worried someone’s reading your messages, you can always call us or set up an alternative email account.</p>
                <p>Learn more about our <a href='/privacy-policy'>privacy policy</a></p>
              </GridCol>
            </Grid>
          </Accent>
          <HelpPanels />
        </Main>
        <Footer/>
        <GA/>
        <SiteMessageContainer
          path={this.props.location}
        />
      </React.Fragment>
    )
  }
}

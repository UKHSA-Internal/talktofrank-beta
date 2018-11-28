import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Form from '../Form/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import Button from '../Button/component.jsx'
import Accent from '../Accent/component.jsx'
import Icon from '../Icon/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Select from '../Select/component.jsx'

export default class PageSupportForm extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onLocationChange = this.onLocationChange.bind(this)
    this.onServiceTypeChange = this.onServiceTypeChange.bind(this)
    this.submitAction = this.submitAction.bind(this)
    this.state = {
      locationValue: '',
      serviceTypeValue: ''
    }
  }

  submitAction(e) {
    if (this.state.locationValue.trim() !== '') {
      window.location = `/treatment-centre?location=${encodeURIComponent(this.state.locationValue)}&serviceType=${encodeURIComponent(this.state.serviceTypeValue)}`
    }
  }

  onLocationChange (e) {
    const newValue = e.target.value
    this.setState({
      locationValue: newValue
    })
  }

  onServiceTypeChange (e) {
    const newValue = e.target.value
    this.setState({
      serviceTypeValue: newValue
    })
  }

  render () {
    let icon = {
      label: 'search',
      url: '/ui/svg/magnifying-reversed.svg'
    }

    const supportOptions = {
      label: 'Choose a service type',
      name: 'support-centre-options',
      id: 'support-centre-options',
      options: [
        {
          'label': 'All Services',
          'value': 'All Services'
        },
        {
          'label': 'Advice & Information',
          'value': 'Advice & Information'
        },
        {
          'label': 'Advocacy',
          'value': 'Advocacy'
        },
        {
          'label': 'Assessment for Treatment',
          'value': 'Assessment for Treatment'
        },
        {
          'label': 'Blood Borne Viruses',
          'value': 'Blood Borne Viruses'
        },
        {
          'label': 'Complementary Therapies',
          'value': 'Complementary Therapies'
        },
        {
          'label': 'Counselling / Therapy',
          'value': 'Counselling / Therapy'
        },
        {
          'label': 'Detox',
          'value': 'Detox'
        },
        {
          'label': 'Drug & Alcohol Action Team',
          'value': 'Drug & Alcohol Action Team'
        },
        {
          'label': 'Dual Diagnosis / Mental Health',
          'value': 'Dual Diagnosis / Mental Health'
        },
        {
          'label': 'Education & Training',
          'value': 'Education & Training'
        },
        {
          'label': 'Harm Reduction',
          'value': 'Harm Reduction'
        },
        {
          'label': 'Needle / Syringe Exchange',
          'value': 'Needle / Syringe Exchange'
        },
        {
          'label': 'Rehab',
          'value': 'Rehab'
        },
        {
          'label': 'Relapse Prevention',
          'value': 'Relapse Prevention'
        },
        {
          'label': 'Services for Adults',
          'value': 'Services for Adults'
        },
        {
          'label': 'Services for Ethnic Minorities',
          'value': 'Services for Ethnic Minorities'
        },
        {
          'label': 'Services for Homeless People',
          'value': 'Services for Homeless People'
        },
        {
          'label': 'Services for Offenders',
          'value': 'Services for Offenders'
        },
        {
          'label': 'Services for Women',
          'value': 'Services for Women'
        },
        {
          'label': 'Services for Young People',
          'value': 'Services for Young People'
        },
        {
          'label': 'Solvent Abuse',
          'value': 'Solvent Abuse'
        },
        {
          'label': 'Specialist Opiate Service',
          'value': 'Specialist Opiate Service'
        },
        {
          'label': 'Specialist Stimulant Service',
          'value': 'Specialist Stimulant Service'
        },
        {
          'label': 'Substitute Prescribing',
          'value': 'Substitute Prescribing'
        },
        {
          'label': 'Support for Alcohol Users',
          'value': 'Support for Alcohol Users'
        },
        {
          'label': 'Support for Drug Users',
          'value': 'Support for Drug Users'
        },
        {
          'label': 'Support for Family & Friends',
          'value': 'Support for Family & Friends'
        },
        {
          'label': 'Treatment for Alcohol Use',
          'value': 'Treatment for Alcohol Use'
        },
        {
          'label': 'Treatment for Drug Use',
          'value': 'Treatment for Drug Use'
        }
      ]
    }

    const { locationValue, serviceTypeValue } = this.state

    return (
      <React.Fragment>
        <Masthead/>
        <Main className='main--muted'>
          <Accent className='accent--shallow'>
            <Heading type='h1' className='page-title' text='Find support near you'/>
          </Accent>
          <Accent>
            <Grid>
              <GridCol className='col-12 col-sm-7 col-md-6 offset-md-2'>
                <p className='lead spacing--single'>Find details of local and national services that provide counselling and treatment in England.</p>
                <Form className='spacing--single'>
                  <FormGroup onChange={this.onLocationChange} value={locationValue} className='form-control--reversed form-control--large' name='support-centre-postcode' label='Please enter a full postcode or place name' id='support-centre-postcode' placeholder=''/>
                  <Select {...supportOptions} onChange={this.onServiceTypeChange} selected={serviceTypeValue} className='form-control--reversed form-control--large'/>
                  <Button className='btn--primary' clickHandler={this.submitAction}>
                    Search
                    <Icon className='spacing-left' {...icon}/>
                  </Button>
                </Form>
              </GridCol>
              <GridCol className='col-12 col-sm-5 col-md-3 offset-md-1'>
                <Heading className='h4' text={`If you don't live in England`}/>
                <ul className='list-unstyled link-list link-list--reversed link-list--has-arrow'>
                  <li className='link-list__item'>
                  <a href='http://www.scottishdrugservices.com/' className='link-list__link'>Scotland</a>
                  </li>
                  <li className='link-list__item'>
                  <a href='http://www.dan247.org.uk/Services_Drugs_Alcohol.asp' className='link-list__link'>Wales</a>
                  </li>
                  <li className='link-list__item'>
                  <a href='http://www.publichealth.hscni.net/publications/drug-and-alcohol-directories-services' className='link-list__link'>Northern Ireland</a>
                  </li>
                </ul>
              </GridCol>
            </Grid>
          </Accent>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

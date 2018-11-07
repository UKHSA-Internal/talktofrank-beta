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
          label: 'Select one',
          value: ''
        },
        {
          label: 'Aberystwith',
          value: 'aber'
        },
        {
          label: 'Tyneside',
          value: 'Tyneside'
        },
        {
          label: 'London',
          value: 'London'
        }
      ]
    }

    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text='Find support near you'/>
        </Accent>
        <Main className='main--muted main--full-width'>
          <Accent>
            <Grid>
              <GridCol className='col-12 col-sm-7 col-md-6 offset-md-2'>
                <p className='lead'>Find details of local and national services that provide counselling and treatment in England.</p>
                <Form className='spacing--large'>
                  <FormGroup className='form-control--reversed form-control--large' name='support-centre-postcode' label='Please enter your full postcode' id='support-centre-postcode' placeholder=''/>
                  <Select {...supportOptions} className='form-control--reversed form-control--large'/>
                  <Button className='btn--primary'>
                    Search
                    <Icon {...icon}/>
                  </Button>
                </Form>
              </GridCol>
              <GridCol className='col-12 col-sm-5 col-md-3 offset-md-1'>
                <Heading className='h4' text={`If you don't live in England`}/>
                <ul className='list-unstyled link-list link-list--reversed link-list--has-arrow'>
                  <li className='link-list__item'>
                  <a href='#' className='link-list__link'>Scotland</a>
                  </li>
                  <li className='link-list__item'>
                  <a href='#' className='link-list__link'>Wales</a>
                  </li>
                  <li className='link-list__item'>
                  <a href='#' className='link-list__link'>Northern Ireland</a>
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

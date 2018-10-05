import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/component.jsx'
import Button from '../Button/component.jsx'
import FormGroupAutocomplete from '../FormGroupAutocomplete/component.jsx'
import Form from '../Form/component.jsx'
import Nav from '../Nav/component.jsx'
import { primary } from '../../fixtures/navigation.js'

export default class Masthead extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      mobileMenuOpen: false
    }
  }

  handleMenuClick () {
    this.setState({
      mobileMenuOpen: !this.state.mobileMenuOpen
    })
  }

  render () {
    let classes = classNames('masthead', this.props.className)
    let navClasses = classNames('navbar-expand-md', {
      'd-none': !this.state.mobileMenuOpen
    })

    return (
      <section className={classes} role='banner'>
        <div className='masthead__inner'>
          <section className='navigation-wrapper'>
            <Logo url='/ui/svg/logo-frank.svg' alt=''/>
            <Nav className={navClasses} id='navigation-primary' navigation={primary} current={this.props.path.pathname}/>
            <Form className='ml-auto'>
              <FormGroupAutocomplete
                button='true'
                modifiers='form-control--search'
                className='input-group-autocomplete--inverse'
                id='search-masthead'
                label='Search for any drug'
                labelHidden='true'
                showContent={false}
                placeholder='Enter drug name (e.g. Mandy)'
              />
          </Form>
          </section>
        </div>
      </section>
    )
  }
}

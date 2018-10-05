import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/component.jsx'
import Button from '../Button/component.jsx'
// import FormGroupAutocomplete from '../FormGroupAutocomplete/component.jsx'
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
          <Button className='navbar-toggler' aria-controls='navigation' aria-expanded={this.state.mobileMenuOpen} aria-label={this.state.mobileMenuOpen ? 'Hide navigation' : 'Reveal navigation'} clickHandler={this.handleMenuClick.bind(this)}>
            <span className='sr-only'>Menu</span>
          </Button>
          <Logo url='/ui/svg/logo-frank.svg' alt=''/>
          <Nav className={navClasses} id='navigation' navigation={primary} current={this.props.path.pathname}/>
        </div>
      </section>
    )
  }
}

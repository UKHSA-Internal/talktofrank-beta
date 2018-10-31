import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/component.jsx'
import Button from '../Button/component.jsx'
import ButtonGroup from '../ButtonGroup/component.jsx'
import FormGroupAutocomplete from '../FormGroupAutocomplete/component.jsx'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Form from '../Form/component.jsx'
import Nav from '../Nav/component.jsx'
import Icon from '../Icon/component.jsx'
import { primary } from '../../fixtures/navigation.js'
import { ViewportMobile, ViewportDefault } from '../Breakpoints/component.jsx'

export default class Masthead extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      mobileMenuOpen: false,
      takeover: false
    }
  }

  handleSearchClick () {
    const el = document.documentElement.classList
    this.setState({
      takeover: !this.state.takeover
    })
    // ugh add a class to the html element - redux doesn't reach this far up
    this.state.takeover ? el.remove('html-takeover') : el.add('html-takeover')
  }

  handleMenuClick () {
    this.setState({
      mobileMenuOpen: !this.state.mobileMenuOpen
    })
  }

  render () {
    // @joel @refactor - remove this into container
    let icon = {
      label: 'search',
      url: '/ui/svg/magnifying.svg'
    }
    let iconClose = {
      label: 'close',
      url: '/ui/svg/cross.svg'
    }
    let classes = classNames('masthead', this.props.className)
    let navClasses = classNames('navbar-primary navbar-expand-md', {
      'd-none': !this.state.mobileMenuOpen
    })

    return (
      <header className={classes} role='banner'>
        <div className='masthead__inner'>
          <section className='navigation-wrapper'>
            <Button className={this.state.mobileMenuOpen ? 'navbar-toggler active' : 'navbar-toggler'} aria-controls='navigation' aria-haspopup={!this.state.mobileMenuOpen} aria-expanded={this.state.mobileMenuOpen} aria-label={this.state.mobileMenuOpen ? 'Hide navigation' : 'Show navigation'} clickHandler={this.handleMenuClick.bind(this)}>
              {this.state.mobileMenuOpen ? 'Close' : 'Menu'}
            </Button>
            <Logo url='/ui/svg/logo-frank--alt.svg' alt=''/>
            <ViewportMobile>
              <Nav className={navClasses} menu-open={this.state.mobileMenuOpen} id='navigation-primary' navigation={primary} current={this.props.path.pathname} aria-label='Main Menu' role='menubar' type='nav'/>
            </ViewportMobile>
            <ViewportDefault>
              <Nav className={navClasses} hasPopup={true} menu-open={true} id='navigation-primary' navigation={primary} current={this.props.path.pathname} aria-label='Main Menu' role='menubar' type='nav'/>
            </ViewportDefault>
          </section>
          <ButtonGroup className='button-group--static'>
            <Button className='btn--flat btn--small' clickHandler={this.handleSearchClick.bind(this)}><span className='hidden--md'>Search </span><Icon {...icon}/></Button>
            <Button className='btn--alink btn--small hidden--rg' url='tel:03001236600'><span className='nav-link'>0300 1236600</span></Button>
          </ButtonGroup>
        </div>
        {this.state.takeover && <section className='masthead__takeover'>
          <div className='masthead__takeover__inner'>
            <Form className='form--search'>
              <FormGroupAutocomplete
                button='true'
                modifiers='form-control--search'
                className='input-group-autocomplete'
                id='search-masthead'
                label='Search for any drug'
                labelHidden='true'
                showContent={false}
                placeholder='Enter drug name (e.g. Mandy)'
              />
            </Form>
            <Button className='btn--flat active close' clickHandler={this.handleSearchClick.bind(this)}><Icon {...iconClose}/></Button>
          </div>
        </section>}
        {this.state.takeover && <div className='takeover-bg'/>}
      </header>
    )
  }
}

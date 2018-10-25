import React from 'react'
import classNames from 'classnames'
import ReactGA from 'react-ga'
import Heading from '../Heading/component.jsx'
import Icon from '../Icon/component.jsx'

class LinkItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  clickHandler(e) {
    e.preventDefault()
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    let label = this.props.icon ? <span className='btn__text'>{this.props.label}</span> : this.props.label

    let classes = {
      'nav-item--has-dropdown': this.props.hasDropdown,
      'nav-item--dropdown-active': this.state.menuOpen
    }

    let linkClasses = classNames('nav-link', classes)
    let liClasses = classNames(this.props.className, classes)

    return (
      <li className={liClasses} >
        <a className={linkClasses} role="menuitem" href={this.props.url} onClick={this.clickHandler.bind(this)}>{this.props.icon && <Icon {...this.props.icon}/>}{label}</a>
        {this.props.subnav}
      </li>
    )
  }
}

export default class Nav extends React.PureComponent {
  static defaultProps = {
    'menu-open': false
  }

  constructor (props) {
    super(props)
    this.dropDown = this.dropDown.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)

    this.state = {
      dropDown: false
    }
  }

  dropDown (e, event) {
    if (window.innerWidth > 767) {
      event.preventDefault()

      if (!this.state.dropDown) {
        document.addEventListener('click', this.handleOutsideClick, false)
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false)
      }

      this.setState({
        dropDown: !this.state.dropDown
      })
    }
    this.handleItemClick(e)
  }

  setWrapperRef (node) {
    this.wrapperRef = node
  }

  handleOutsideClick (event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        dropDown: false
      })
    }
  }

  handleItemClick (e) {
    ReactGA.event({
      category: e.category,
      action: e.action,
      label: e.label
    })
  }

  render () {
    let classes = classNames('navbar', this.props.className)
    let role = this.props.role ? {'role': this.props.role} : null
    let aria = {}

    const Wrapper = `${this.props.type || 'section'}`

    for (const prop in this.props) {
      if (/^aria-/.test(prop)) {
        aria[prop] = this.props[prop]
      }
    }

    return (
      <Wrapper className={classes} ref={this.setWrapperRef}>
        {this.props.labelledBy && <Heading id={this.props.id} className='visually-hidden' text='Drugs A to Z navigation'/>}
        <ul className='navbar-nav' aria-hidden={!this.props['menu-open']} {...aria} {...role}>
          {this.props.navigation && this.props.navigation.map((item, i) => {
            let icon = item.icon || null
            let linkClass = classNames('nav-item', item.modifier, {
              'nav-item--active': item.url === this.props.current
            })

            if (!item.subnavigation) {
              return <LinkItem key={i} url={item.url} icon={icon} className={linkClass} label={item.label} clickHandler={this.handleItemClick} tracking={item.tracking}/>
            } else {
              let subnav = <ul className='navbar-dropdown list-unstyled' role="menu">{item.subnavigation.map((v, j) => {
                return <LinkItem key={j} url={v.url} className='nav-item' label={v.label} clickHandler={this.handleItemClick} tracking={v.tracking}/>
              })}</ul>
              return <LinkItem key={i} url={item.url} ref={this.setWrapperRef} hasDropdown={true} className={'nav-item'} label={item.label} clickHandler={this.dropDown} tracking={item.tracking} subnav={subnav}/>
            }
          })}
        </ul>
      </Wrapper>
    )
  }
}

import React from 'react'
import classNames from 'classnames'
import ReactGA from 'react-ga'
import Heading from '../Heading/component.jsx'
import Icon from '../Icon/component.jsx'

const LinkItem = props => {
  let label = props.icon ? <span className='btn__text'>{props.label}</span> : props.label

  return (
    <li className={props.className}>
      <a className='nav-link' href={props.url} onClick={(e) => props.clickHandler(props.tracking, e)}>{props.icon && <Icon {...props.icon}/>}{label}</a>
      {props.subnav}
    </li>
  )
}

export default class Nav extends React.PureComponent {
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
    let aria = this.props.labelledBy ? {'aria-labelledby': this.props.labelledBy} : null
    let role = this.props.role ? {'role': this.props.role} : null
    const Wrapper = `${this.props.type || 'section'}`

    return (
      <Wrapper className={classes} {...aria} ref={this.setWrapperRef}>
        {this.props.labelledBy && <Heading id={this.props.id} className='visually-hidden' text='Drugs A to Z navigation'/>}
        <ul className='navbar-nav' {...role}>
          {this.props.navigation && this.props.navigation.map((item, i) => {
            let icon = item.icon || null
            let linkClass = classNames('nav-item', item.modifier, {
              'nav-item--active': item.url === this.props.current
            })

            if (!item.subnavigation) {
              return <LinkItem key={i} url={item.url} icon={icon} className={linkClass} label={item.label} clickHandler={this.handleItemClick} tracking={item.tracking}/>
            } else {
              let subnav = <ul className='navbar-dropdown list-unstyled'>{item.subnavigation.map((v, j) => {
                return <LinkItem key={j} url={v.url} className='nav-item' label={v.label} clickHandler={this.handleItemClick} tracking={v.tracking}/>
              })}</ul>
              return <LinkItem key={i} url={item.url} ref={this.setWrapperRef} className={'nav-item nav-item--has-dropdown' + (this.state.dropDown === true ? ' nav-item--dropdown-active' : '')} label={item.label} clickHandler={this.dropDown} tracking={item.tracking} subnav={subnav}/>
            }
          })}
        </ul>
      </Wrapper>
    )
  }
}

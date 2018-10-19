import React from 'react'
import classNames from 'classnames'
import ReactGA from 'react-ga'
import Heading from '../Heading/component.jsx'
import Icon from '../Icon/component.jsx'

function handleItemClick (e) {
  ReactGA.event({
    category: e.category,
    action: e.action,
    label: e.label
  })
}

const LinkItem = props => {
  let label = props.icon ? <span className='btn__text'>{props.label}</span> : props.label

  return (
    <li className={props.className}>
      <a className='nav-link' href={props.url} onClick={(e) => props.clickHandler(props.tracking, e)}>{props.icon && <Icon {...props.icon}/>}{label}</a>
    </li>
  )
}

const Nav = props => {
  let classes = classNames('navbar', props.className)
  let aria = props.labelledBy ? {'aria-labelledby': props.labelledBy} : null
  let role = props.role ? {'role': props.role} : null
  const Wrapper = `${props.type || 'section'}`

  return (
    <Wrapper className={classes} {...aria}>
      {props.labelledBy && <Heading id={props.id} className='visually-hidden' text='Drugs A to Z navigation'/>}
      <ul className='navbar-nav' {...role}>
        {props.navigation && props.navigation.map((item, i) => {
          let icon = item.icon || null
          let linkClass = classNames('nav-item', item.modifier, {
            'nav-item--active': item.url === props.current
          })
          return <LinkItem key={i} url={item.url}  icon={icon} className={linkClass} label={item.label} clickHandler={handleItemClick} tracking={item.tracking}/>
        })}
      </ul>
    </Wrapper>
  )
}
export default Nav

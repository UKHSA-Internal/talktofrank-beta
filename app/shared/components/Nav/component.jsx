import React from 'react'
import classNames from 'classnames'
import LinkItem from '../LinkItem/component.jsx'
import ReactGA from 'react-ga'
import Heading from '../Heading/component.jsx'

function handleItemClick (e) {
  ReactGA.event({
    category: e.category,
    action: e.action,
    label: e.label
  })
}

const Nav = props => {
  let classes = classNames('navbar', props.className)
  let aria = props.labelledBy ? {'aria-labelledby': props.labelledBy} : null
  return (
    <nav className={classes} {...aria}>
      {props.labelledBy && <Heading id={props.id} className='visually-hidden' text='Drugs A to Z navigation'/>}
      <ul className='navbar-nav' role='menu'>
        {props.navigation && props.navigation.map((item, i) => {
          // @todo @refactor - @joel - make a more bombproof active nav item check
          let linkClass = classNames('nav-item', item.modifier, {
            'nav-item--active': item.url === props.current
          })
          return <LinkItem key={i} url={item.url} className={linkClass} label={item.label} clickHandler={handleItemClick} tracking={item.tracking}/>
        })}
      </ul>
    </nav>
  )
}
export default Nav

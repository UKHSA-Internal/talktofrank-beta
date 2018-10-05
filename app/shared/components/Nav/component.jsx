import React from 'react'
import classNames from 'classnames'
import LinkItem from '../LinkItem/component.jsx'
import ReactGA from 'react-ga'

function handleItemClick (e) {
  ReactGA.event({
    category: e.category,
    action: e.action,
    label: e.label
  })
}

const Nav = props => {
  let classes = classNames('navbar', props.className)
  return (
    <nav className={classes} id={props.id}>
      <ul className='navbar-nav' role='menu'>
        {props.navigation && props.navigation.map((item, i) => {
          // @todo @refactor - @joel - make a more bombproof active nav item check
          let linkClass = classNames('nav-item', item.modifier, {
            'nav-item--active': item.url === props.current
          })
          return <LinkItem key={i} url={item.url} className={linkClass} role='menuitem' label={item.label} clickHandler={handleItemClick} tracking={item.tracking}/>
        })}
      </ul>
    </nav>
  )
}
export default Nav

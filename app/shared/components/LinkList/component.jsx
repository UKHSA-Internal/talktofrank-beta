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

const LinkList = props => {
  let classes = classNames('navbar', props.className)
  return (
    <section className={classes}>
      <ul className='navbar-nav' role='navigation'>
        {props.navigation && props.navigation.map((item, i) => {
          let icon = item.icon || null
          return <LinkItem key={i} icon={icon} url={item.url} label={item.label} clickHandler={handleItemClick} tracking={item.tracking} role={null}/>
        })}
      </ul>
    </section>
  )
}
export default LinkList

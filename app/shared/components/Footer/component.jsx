import React from 'react'
import Button from '../Button/component.jsx'
import Nav from '../Nav/component.jsx'
import { footer } from '../../fixtures/navigation.js'

const Footer = props => {
  return (
    <footer className='footer spacing-bottom--large' role='contentinfo'>
      <section className='footer__inner'>
        <Nav className='nav-footer' id='navigation-footer' navigation={footer}/>
      </section>
    </footer>
  )
}
export default Footer

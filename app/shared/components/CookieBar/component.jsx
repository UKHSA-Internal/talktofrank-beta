import React from 'react'
// import {Cookies} from 'react-cookie'
import Accent from '../Accent/component'
import Svg from '../Svg/component'
import Anchor from '../Anchor/component'
import { ClientOnly } from '../ClientOnly/component'
import { getCookie, setCookie } from '../../lib/cookie.js'

export default class CookieBar extends React.Component {
  componentWillMount() {
    let cookieValue = getCookie('ttf-cookies')
    this.state = {
      visible: !cookieValue
    }
  }

  closeMessage() {
    this.setState({
      visible: false
    })
    setCookie('ttf-cookies', 1, 365)
  }

  render() {
    return (
      <ClientOnly>
       {this.state.visible &&
       <Accent className='accent--muted accent--shallow' modifier='wrapper--tight'>
        <p className='has-icon'>
          This website uses cookies to make it simpler to use. <Anchor href='/cookie-policy' text='Find out more about cookies'/>
          <button type='button'
             className='btn btn--flat btn--static spacing-left'
             aria-label='Close cookie bar panel'
             onClick={this.closeMessage.bind(this)}>
             <Svg url='/ui/svg/cross-red.svg' alt='' />
          </button>
        </p>
       </Accent>
       }
      </ClientOnly>
    )
  }
}

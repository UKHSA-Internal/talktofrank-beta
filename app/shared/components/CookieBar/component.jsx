import React from 'react'
// import {Cookies} from 'react-cookie'
import Accent from '../Accent/component'
import Svg from '../Svg/component'
import Anchor from '../Anchor/component'

export default class CookieBar extends React.Component {
  componentWillMount() {
    // let showBar = (Cookies.get('notification_dismissed') == 1) ? false : true
    this.state = {
      visible: true
    }
  }

  closeMessage() {
    this.setState({
      visible: false
    })
    // Cookies.set('notification_dismissed', 1, {
    //   'path': '/'
    // })
  }

  render() {
    return (
      <React.Fragment>
       {this.state.visible &&
       <Accent className='accent--muted accent--shallow'>
        <p className='has-icon'>
          This website uses cookies to make it simpler to use. <Anchor href='/cookie-policy' text='Find out more about cookies'/>
          <button type='button'
             className='btn btn--flat btn--static spacing-left'
             aria-label='Close'
             onClick={this.closeMessage.bind(this)}>
             <Svg url='/ui/svg/cross-red.svg' alt='Close' />
          </button>
        </p>
       </Accent>
       }
      </React.Fragment>
    )
  }
}

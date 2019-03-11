import React from 'react'
import Accent from '../Accent/component'
import Svg from '../Svg/component'
import { ClientOnly } from '../ClientOnly/component'
import { getCookie, setCookie } from '../../lib/cookie.js'

export default class WarningBar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    let cookieValue = getCookie(`ttf-message-bar-${this.props.alertId}`)
    if (!cookieValue) {
      setTimeout(() => {
        this.setState({
          visible: true
        })
      }, this.props.delay)
    }
  }

  handleClick(ev) {
    ev.preventDefault()
    setCookie(`ttf-message-bar-${this.props.alertId}`, 1, 365)
  }

  closeMessage() {
    this.setState({
      visible: false
    })
    setCookie(`ttf-message-bar-${this.props.alertId}`, 1, 365)
  }

  render() {
    return (
      <ClientOnly>
        {this.state.visible &&
          <Accent className='accent--fixed accent--bottom' modifier='wrapper--constant'>
            {this.props.children}
            <button type='button'
             className='btn btn--flat btn--fixed'
             aria-label='Dismiss drug warning panel'
             onClick={this.closeMessage.bind(this)}>
             <Svg url='/ui/svg/cross-red.svg' alt='Close' />
            </button>
          </Accent>
        }
      </ClientOnly>
    )
  }
}

WarningBar.defaultProps = {
  delay: 0
}

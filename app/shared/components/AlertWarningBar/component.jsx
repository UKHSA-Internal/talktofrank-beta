import React from 'react'
import Accent from '../Accent/component'
import Svg from '../Svg/component'
import { ClientOnly } from '../ClientOnly/component'
import { getCookie, setCookie } from '../../lib/cookie.js'

export default class AlertWarningBar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.closeMessage = this.closeMessage.bind(this)
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    let cookieValue = getCookie(`ttf-warning-bar-${this.props.alertId}`)
    if (!cookieValue) {
      setTimeout(() => {
        this.setState({
          visible: true
        })
      }, this.props.delay)
    }
  }

  closeMessage() {
    this.setState({
      visible: false
    })
    setCookie(`ttf-warning-bar-${this.props.alertId}`, 1, 365)
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

AlertWarningBar.defaultProps = {
  delay: 0
}

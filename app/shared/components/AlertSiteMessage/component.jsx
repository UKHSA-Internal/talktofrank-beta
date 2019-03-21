import React from 'react'
import Accent from '../Accent/component'
import Svg from '../Svg/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Anchor from '../Anchor/component'
import { ClientOnly } from '../ClientOnly/component'
import { getCookie, setCookie } from '../../lib/cookie.js'

export default class AlertSiteMessage extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.closeMessage = this.closeMessage.bind(this)
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
    window.location.href = this.props.url
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
          <Accent className='accent--loud accent--fixed' modifier='wrapper--constant'>
            <Grid>
              <GridCol className='col-2 col-sm-1 order-2'>
                <button type='button'
                 className='btn btn--flat'
                 aria-label='Close pop up message'
                 onClick={this.closeMessage.bind(this)}>
                 <Svg url='/ui/svg/cross-white.svg' alt='Close' />
                </button>
              </GridCol>
              <GridCol className='col-10 col-sm-11 order-1'>
                <Grid>
                  <GridCol className='col-12 col-sm-8'>
                    { this.props.message }
                  </GridCol>
                  {this.props.alertButtonLabel && this.props.alertButtonText &&
                  <GridCol className='col-12 col-sm-4'>
                    <Anchor
                      className='btn btn--secondary spacing-top--single sm-spacing-top--flush has-arrow'
                      target='_blank' onClick={this.handleClick} href='#'
                      text={this.props.alertButtonText}
                      label={this.props.alertButtonLabel} />
                  </GridCol>
                  }
                </Grid>
              </GridCol>
            </Grid>
          </Accent>
        }
      </ClientOnly>
    )
  }
}

AlertSiteMessage.defaultProps = {
  delay: 30000
}

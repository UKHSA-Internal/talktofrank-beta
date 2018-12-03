import React from 'react'
import Accent from '../Accent/component'
import Svg from '../Svg/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Anchor from '../Anchor/component'
import ClientOnly from '../ClientOnly/component'
import { getCookie, setCookie } from '../../lib/cookie.js'

export default class SatisfactionBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    let cookieValue = getCookie('ttf-survey')
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
    setCookie('ttf-survey', 1, 365)
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
                 aria-label='Close satisfaction survey panel'
                 onClick={this.closeMessage.bind(this)}>
                 <Svg url='/ui/svg/cross-white.svg' alt='Close' />
                </button>
              </GridCol>
              <GridCol className='col-10 col-sm-11 order-1'>
                <Grid>
                  <GridCol className='col-12 col-sm-8'>
                    <p>
                      We want to know what you think of our site.
                    </p>
                    <small>Help us improve your FRANK website experience</small>
                  </GridCol>
                  <GridCol className='col-12 col-sm-4'>
                    <Anchor className='btn btn--secondary spacing-top--single sm-spacing-top--flush has-arrow' target='_blank' href='#' text='Take survey' label='Take our satisfaction survey (will open in new window)'/>
                  </GridCol>
                </Grid>
              </GridCol>
            </Grid>
          </Accent>
        }
      </ClientOnly>
    )
  }
}

SatisfactionBar.defaultProps = {
  delay: 0
}

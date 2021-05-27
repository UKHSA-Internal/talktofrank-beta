import React from 'react'
import classNames from 'classnames'
import SplitText from '../SplitText/component.jsx'
import Picture from '../Picture/component.jsx'
import Attribution from '../Attribution/component.jsx'
import { isInBrowser } from '../../utilities.js'

export default class Hero extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      heading: { ...this.props.heading },
      isDesktop: true
    }
  }
  handleResize = () => {
    if (window.innerWidth >= 768 && !this.state.isDesktop) {
      this.setState({ isDesktop: true })
    } else if (window.innerWidth <= 768 && this.state.isDesktop) {
      this.setState({ isDesktop: false })
    }
  }

  componentDidMount() {
    if (isInBrowser()) {
      window.addEventListener('resize', this.handleResize)
      if (window.innerWidth <= 768 && this.state.isDesktop) {
        this.setState({ isDesktop: false })
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    return (
      <section className={classNames('hero', this.props.className)}>
        {this.props.images && <Picture {...this.props.images} noAlt />}
        <div className="constrain-narrow">
          <div className="hero__inner hero__inner--constrained">
            <SplitText
              wrapper={this.state.heading.wrapper}
              text={
                this.state.isDesktop
                  ? this.state.heading.text.desktop
                  : this.state.heading.text.mobile
              }
            />
          </div>
        </div>
      </section>
    )
  }
}

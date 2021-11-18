import React from 'react'
import classNames from 'classnames'
import { scrollIntoView, scrollIntoViewFromCurrent, isInBrowser } from '../../utilities'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import { trackEvent } from '../../utilities'

export default class Toggle extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.open ||
        this.props.className === 'collapsible_trigger--active'
    }
  }

  toggle(itemid) {
    const id = `#${itemid}`
    if (!this.state.visible) this.trackAccordionClick(itemid)
    this.setState({ visible: !this.state.visible })

    if (this.props.history) {
      if (isInBrowser()) {
        let path =
          window.location.hash === id ? this.props.history.pathname : id
        window.history.replaceState({}, document.title, path)
      }
    }
  }

  componentDidMount() {
    if (this.props.history.hash === '#' + this.returnId()) {
      this.setState({ visible: true })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.open !== prevProps.open) {
      if (this.props.open === true) {
        this.setState({ visible: true })
      } else {
        this.setState({ visible: false })
      }
    }
    if (prevState.visible !== this.state.visible) {
      if (this.props.open === true) {
        scrollIntoViewFromCurrent(this.node)
      }
    }
  }

  trackAccordionClick = itemid => {
    trackEvent({
      category: 'Click',
      action: 'Accordion Click',
      name: itemid
    })
  }

  returnId() {
    return this.props.text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]|_/g, '')
      .replace(/ /g, '-')
  }

  render() {
    const id = this.returnId()
    let text = this.props.text
    let classes = classNames('collapsible', this.props.className, {
      'collapsible--active': this.state.visible
    })
    let contentClasses = classNames('collapsible__content', {
      'collapsible__content--active': this.state.visible,
      'has-unordered': this.props.toggleFancyList
    })
    let toggleClass = classNames('collapsible__trigger', {
      'collapsible__trigger--active': this.state.visible
    })

    return (
      <div
        className={classes}
        id={id}
        ref={node => {
          this.node = node
        }}
      >
        <div className="wrapper">
          <Grid>
            <GridCol className="col-12 col-md-7 offset-md-3 bordered">
              <h2 className="h4">
                <button
                  className={toggleClass}
                  onClick={this.toggle.bind(this, id)}
                  aria-expanded={this.state.visible}
                  aria-controls={`section-${id}`}
                >
                  {text}
                </button>
              </h2>
              <div
                className={contentClasses}
                aria-hidden={!this.state.visible}
                id={`section-${id}`}
              >
                {this.props.children}
              </div>
            </GridCol>
          </Grid>
        </div>
      </div>
    )
  }
}

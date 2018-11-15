import React from 'react'
import classNames from 'classnames'
import Heading from '../Heading/component.jsx'
import { scrollIntoView } from '../../utilities'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

export default class Toggle extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: this.props.open || this.props.className === 'collapsible_trigger--active'
    }
  }

  toggle (event) {
    event.preventDefault()
    this.setState({ visible: !this.state.visible })

    if (this.props.history) {
      if ('replaceState' in history) {
        let path = (window.location.hash === event.target.getAttribute('data-target')) ? this.props.history.pathname : event.target.href
        window.history.replaceState({}, document.title, path)
      }
    }
  }

  componentDidMount () {
    if (this.props.history.hash === '#' + this.returnId()) {
      this.setState({ visible: true })
      scrollIntoView(this.node)
    }
  }

  returnId () {
    return this.props.text.toLowerCase().trim().replace(/[^\w\s]|_/g, '').replace(/ /g, '-')
  }

  render () {
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
      <div className={classes} id={id} ref={node => { this.node = node }}>
        <div className='constrain-narrow'>
          <Grid>
            <GridCol className='col-12 col-md-7 offset-md-3 bordered'>
              <h2 className='h4'>
                <a role='button' href={`#${id}`} data-target={`#${id}`} className={toggleClass} onClick={this.toggle.bind(this)} aria-expanded={this.state.visible} aria-controls={`section-${id}`}>
                {text}
                </a>
              </h2>
              <div className={contentClasses} aria-hidden={!this.state.visible} id={`section-${id}`}>
                {this.props.children}
              </div>
            </GridCol>
          </Grid>
        </div>
      </div>
    )
  }
}

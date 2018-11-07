import React from 'react'
import classNames from 'classnames'
import Heading from '../Heading/component.jsx'

export default class Collapsible extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: this.props.open || this.props.className === 'collapsible_trigger--active'
    }
  }

  toggle (event) {
    event.preventDefault()
    this.setState({ visible: !this.state.visible })
  }

  render () {
    let { text, id } = this.props
    let classes = classNames('toggle', this.props.className, {
      'toggle--active': this.state.visible
    })
    let contentClasses = classNames('toggle__content', {
      'toggle__content--active': this.state.visible
    })
    let toggleClass = classNames('toggle__trigger', {
      'toggle__trigger--active': this.state.visible
    })

    return (
      <div className={classes} id={id}>
        <h3 className='h4'>
          <a role='button' href={`#${id}`} data-target={`#${id}`} className={toggleClass} onClick={this.toggle.bind(this)} aria-expanded={this.state.visible} aria-controls={`section-${id}`}>
          {text}
          </a>
        </h3>
        <div className={contentClasses} aria-hidden={!this.state.visible} id={`section-${id}`}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

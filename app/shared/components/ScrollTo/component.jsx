import React from 'react'
import { scrollIntoView } from '../../../shared/utilities'

const offset = (el) => {
  let rect = el.getBoundingClientRect()
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop

  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

export default class ScrollTo extends React.Component {
  constructor(props) {
    super(props)
    this.panel = React.createRef()
  }

  componentDidMount() {
    scrollIntoView(this.panel.current)
  }

  render() {
    return (
      <div ref={this.panel}>
        {this.props.children}
      </div>
    )
  }
}

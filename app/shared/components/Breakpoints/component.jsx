import React from 'react'

/**
 * This does not respond to viewport resize
 */
const getComponent = (component, componentVisibleBreakpoint) => {

  let viewPortBreakpoint = 'default'
  const isSSR = typeof window === 'undefined' ? true : false

  /*
   * If serverside, only render default
   */
  if ( isSSR ) {
    if (componentVisibleBreakpoint !== 'default') {
      // force server side to render default
      //viewPortBreakpoint = 'default'
      return null
    }
  }
  else {
    viewPortBreakpoint = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/"/g, '')
  }

  // if null, then the default breakpoint is being rendered
  if (viewPortBreakpoint === componentVisibleBreakpoint) {
    return component
  }

  return null
}

// mobile matches css 'content' value
export const ViewportMobile = props => getComponent(props.children, 'mobile')
export const ViewportDefault = props => getComponent(props.children, 'default')

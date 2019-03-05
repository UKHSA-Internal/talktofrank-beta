import React from 'react'
import Longform from './components/Longform/component'
import Heading from './components/Heading/component'
const marked = require('marked')

export function factory (pageData) {
  let contentItems = pageData.fields.content

  if (!contentItems || contentItems.length === 0) {
    return
  }

  let reactComponents = []

  for (let i = 0; i < contentItems.length; i++) {
    let item = contentItems[i].fields
    let reactComponent

    Object.keys(item)
      .filter(itemType => itemType !== 'name')
      .map(itemType => {
        switch (itemType) {
          case 'heading':
            reactComponent = <Heading
              text={contentItems[i].fields[itemType]}
              key={`${itemType}-${i}`}
            />
            break
          case 'text':
            reactComponent = <Longform
              text={marked(contentItems[i].fields[itemType])}
              key={`${itemType}-${i}`}
            />
            break
          default:
            console.error('Could not match ' + item.contentType)
        }
        reactComponents.push(reactComponent)
      })
  }
  return reactComponents
}

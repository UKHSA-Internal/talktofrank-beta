import React from 'react'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { renderToString } from 'react-dom/server'
import Heading from './components/Heading/component'
import Divider from './components/Divider/component'
import { config } from 'config'
const marked = require('marked')

export const contentFulFactory = () => {
  /*
    Remaining options
    [BLOCKS.DOCUMENT]
    [BLOCKS.UL_LIST]
    [BLOCKS.OL_LIST]
    [BLOCKS.LIST_ITEM]
    [BLOCKS.QUOTE]
    [INLINES.EMBEDDED_ENTRY]
    [INLINES.ENTRY_HYPERLINK]
    [INLINES.ASSET_HYPERLINK]
    [MARKS.ITALIC]
    [MARKS.UNDERLINE]
    [MARKS.CODE]
    [BLOCKS.EMBEDDED_ENTRY]
   */
  return {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) => renderToString(<Heading
        text={next(node.content)} type='h1'/>),
      [BLOCKS.HEADING_2]: (node, next) => renderToString(<Heading
        text={next(node.content)} type='h2'/>),
      [BLOCKS.HEADING_3]: (node, next) => renderToString(<Heading
        text={next(node.content)} type='h3'/>),
      [BLOCKS.HEADING_4]: (node, next) => renderToString(<Heading
        text={next(node.content)} type='h4'/>),
      [BLOCKS.HEADING_5]: (node, next) => renderToString(<Heading
        text={next(node.content)} type='h5'/>),
      [BLOCKS.HEADING_6]: (node, next) => renderToString(<Heading
        text={next(node.content)} type='h6'/>),
      [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
      [BLOCKS.HR]: () => renderToString(<Divider className='hr--muted hr--large'/>),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        let image = `<img role='presentation' src='${node.data.target.fields.file.url}' alt='' />`
        if (node.data.target.fields.description) {
          return `<figure>${image}<figcaption aria-hidden='true'>${node.data.target.fields.description}</figcaption></figure>`
        } else {
          return image
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
        // Allow embed of text block contents
        if (node.data.target.sys) {
          if (node.data.target.sys.contentType.sys.id === 'textBlocks') {
            return marked(node.data.target.fields.text)
          } else if (node.data.target.sys.contentType.sys.id === 'video') {
            return renderToString(
              // to be replaced with video component
              <p>Embedded video component goes here<br />
                <strong>title</strong>: {node.data.target.fields.title}<br />
                <strong>url</strong>: {node.data.target.fields.embedUrl}
              </p>
              // end to be replace
            )
          }
        }
      },
      [INLINES.HYPERLINK]: (node, next) => renderToString(
        <a href={cleanLink(node.data.uri)}>{next(node.content)}</a>)
    },
    renderMark: {
      [MARKS.BOLD]: text => `<strong>${text}</strong>`

    }
  }
}

// This is a bug with contentful, removing link prefix here & this should
// continue to work once the issue is fixed on their side
const cleanLink = (link) => {
  link = link.replace(/http(s?):\/\/app\.contentful\.com\/|&quot;/ig, '')
  if (link.charAt(link.length - 1) === '/' ||
    link.charAt(link.length - 1) === '\\') {
    link = link.slice(0, -1)
  }
  return link
}

export const sortByDateWithFallback = (field, fallback) => {
  return (val1, val2) => {
    const a = val1.fields[field] ? val1.fields[field] : val1.sys[fallback]
    const b = val2.fields[field] ? val2.fields[field] : val2.sys[fallback]
    return Date.parse(a) < Date.parse(b)
  }
}

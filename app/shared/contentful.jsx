import React from 'react'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { renderToString } from 'react-dom/server'
import Heading from './components/Heading/component'
import Divider from './components/Divider/component'
import { config } from 'config'

export const contentFulFactory = () => {
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
//     [BLOCKS.DOCUMENT]: (node, next) => `${next(node.content)}`,

//     [BLOCKS.UL_LIST]: (node, next) => `${next(node.content)}`,
//     [BLOCKS.OL_LIST]: (node, next) => `${next(node.content)}`,
//     [BLOCKS.LIST_ITEM]: (node, next) => `${next(node.content)}`,
//     [BLOCKS.QUOTE]: (node, next) => `${next(node.content)}`,
      [BLOCKS.HR]: (node, next) => renderToString(<Divider className='hr--muted hr--large'/>),
//     [BLOCKS.EMBEDDED_ENTRY]: (node, next) => `${next(node.content)}`,
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        let image = `<img src='${node.data.target.fields.file.url}' alt='${node.data.target.fields.title ? node.data.target.fields.title : null}' />`
        if (node.data.target.fields.description) {
          return `<figure>${image}<figcaption>${node.data.target.fields.description}</figcaption></figure>`
        } else {
          return image
        }
      },
//     [INLINES.EMBEDDED_ENTRY]: (node,next) => `${next(node.content)}`,
      [INLINES.HYPERLINK]: (node, next) => renderToString(
        <a href={cleanLink(node.data.uri)}>{next(node.content)}</a>)
//     [INLINES.ENTRY_HYPERLINK]: (node,next) => `${next(node.content)}`,
//     [INLINES.ASSET_HYPERLINK]: (node,next) => `${next(node.content)}`

    },
    renderMark: {
      [MARKS.BOLD]: text => `<strong>${text}</strong>`
//     [MARKS.ITALIC]: text => `${text}`,
//     [MARKS.UNDERLINE]: text => `${text}`,
//     [MARKS.CODE]: text => `${text}`
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

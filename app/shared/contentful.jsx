import React from 'react'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { renderToString } from 'react-dom/server'
import Heading from './components/Heading/component'

export const contentFulFactory = () => {
  return {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) => renderToString(<Heading
        text={next(node.content)} type="h1"/>),
      [BLOCKS.HEADING_2]: (node, next) => renderToString(<Heading
        text={next(node.content)} type="h2"/>),
      [BLOCKS.HEADING_3]: (node, next) => renderToString(<Heading
        text={next(node.content)} type="h3"/>),
      [BLOCKS.HEADING_4]: (node, next) => renderToString(<Heading
        text={next(node.content)} type="h4"/>),
      [BLOCKS.HEADING_5]: (node, next) => renderToString(<Heading
        text={next(node.content)} type="h5"/>),
      [BLOCKS.HEADING_6]: (node, next) => renderToString(<Heading
        text={next(node.content)} type="h6"/>)
//     [BLOCKS.DOCUMENT]: (node, next) => `${next(node.content)}`,
//     [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
//     [BLOCKS.UL_LIST]: (node, next) => `${next(node.content)}`,
//     [BLOCKS.OL_LIST]: (node, next) => `${next(node.content)}`,
//     [BLOCKS.LIST_ITEM]: (node, next) => `${next(node.content)}`,
//     [BLOCKS.QUOTE]: (node, next) => `${next(node.content)}`,
//     [BLOCKS.HR]: (node, next) => `${next(node.content)}`,
//     [BLOCKS.EMBEDDED_ENTRY]: (node, next) => `${next(node.content)}`,
//     [INLINES.EMBEDDED_ENTRY]: (node,next) => `${next(node.content)}`,
//     [INLINES.HYPERLINK]: (node,next) => `${next(node.content)}`,
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

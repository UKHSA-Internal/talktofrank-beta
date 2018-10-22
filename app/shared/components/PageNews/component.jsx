import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Divider from '../Divider/component.jsx'
import Accent from '../Accent/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { renderToString } from 'react-dom/server'

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, next) => renderToString(<Heading text={next(node.content)} type="h1" />),
    [BLOCKS.HEADING_2]: (node, next) => renderToString(<Heading text={next(node.content)} type="h2" />),
    [BLOCKS.HEADING_3]: (node, next) => renderToString(<Heading text={next(node.content)} type="h3" />),
    [BLOCKS.HEADING_4]: (node, next) => renderToString(<Heading text={next(node.content)} type="h4" />),
    [BLOCKS.HEADING_5]: (node, next) => renderToString(<Heading text={next(node.content)} type="h5" />),
    [BLOCKS.HEADING_6]: (node, next) => renderToString(<Heading text={next(node.content)} type="h6" />),
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
    [MARKS.BOLD]: text => `<strong>${text}</strong>`,
//     [MARKS.ITALIC]: text => `${text}`,
//     [MARKS.UNDERLINE]: text => `${text}`,
//     [MARKS.CODE]: text => `${text}`
  },
}

const PageNews = props => (
  <React.Fragment>
    <Masthead path={props.location}/>
    <Accent className='accent--shallow'>
      <Heading type='h1' className='h2 inverted spacing-left spacing--single' text={props.title} />
    </Accent>
    <Divider className='hr--muted' />
    <Main>
      <Grid>
        <GridCol className='col-12 col-md-8'>
          <div dangerouslySetInnerHTML={{
            __html: documentToHtmlString(props.fields.body, options)
          }} />
        </GridCol>
      </Grid>
    </Main>
    <Footer />
    <GA />
  </React.Fragment>
)

export default PageNews


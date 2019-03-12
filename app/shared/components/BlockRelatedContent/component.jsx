import React from 'react'
import Article from '../Article/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

const BlockFeaturedContent = props => {
  const list = []
  return (
    <Grid>
      <GridCol className='col-12 col-sm-10 offset-sm-1'>
        <ul
          className='list-unstyled list-offset'>
          {list && list
            .map((item, i) => {
              item['type'] = 'li'
              return <Article {...item} key={item.sys.id}/>
            })}
        </ul>
      </GridCol>
    </Grid>
  )
}

export default BlockFeaturedContent

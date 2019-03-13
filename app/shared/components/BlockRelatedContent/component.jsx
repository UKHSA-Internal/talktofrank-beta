import React from 'react'
import Article from '../Article/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Header from '../Header/component.jsx'
import Heading from '../Heading/component.jsx'

const BlockRelatedContent = props => {
  console.log(props)
  if (!props.list.length) {
    return null
  }

  return (
    <section className='wrapper wrapper--mid spacing-top--large'>
      <Header>
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <Heading type={'h3'} text={'Related News'}/>
          </GridCol>
        </Grid>
      </Header>
      <Grid>
        <GridCol className='col-12 col-sm-10 offset-sm-1'>
          <ul
            className='list-unstyled list-offset'>
            {props.list && props.list
              .map((item, i) => {
                item['type'] = 'li'
                return <Article {...item} key={item.sys.id}/>
              })}
          </ul>
        </GridCol>
      </Grid>
    </section>
  )
}

export default BlockRelatedContent

import React from 'react'
import CardDeck from '../CardDeck/component.jsx'

const BlockFeaturedContent = props => (
  <section className='wrapper wrapper--mid spacing-top--large'>
    <CardDeck {...props} className='spacing-top--tight'/>
  </section>
)

export default BlockFeaturedContent

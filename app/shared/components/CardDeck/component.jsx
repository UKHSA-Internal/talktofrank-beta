import React from 'react'
import Card from '../Card/component.jsx'
import Heading from '../Heading/component.jsx'
import Header from '../Header/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

const CardDeck = props => {
  return (
    <section className={props.className}>
      {props.heading && <Header><Grid><GridCol className='col-12 col-sm-8'><Heading {...props.heading}/></GridCol><GridCol className='col-12 col-sm-4 align-right--sm'><a href={props.allnews.url} className='spacing-top--tight hidden--sm link-text'>{props.allnews.text}</a></GridCol></Grid></Header>}
      <div className={`card-deck ${props.className}`}>
        {props.teasers && props.teasers.map((val, i) => <Card key={i} {...val}/>)}
      </div>
    </section>
  )
}

CardDeck.defaultProps = {
  className: ''
}

export default CardDeck

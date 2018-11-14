import React from 'react'
import Card from '../Card/component.jsx'
import Header from '../Header/component.jsx'

const CardDeck = props => {
  return (
    <section className={`constrain-narrow ${props.className || null}`}>
      {props.heading && <Header heading={props.heading} href={props.all.url} text={props.all.text}/>}
      <div className={`card-deck ${props.className || ''}`}>
        {props.teasers && props.teasers.map((val, i) => <Card key={i} {...val}/>)}
      </div>
    </section>
  )
}

export default CardDeck

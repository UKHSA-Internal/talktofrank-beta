import React from 'react'

const SplitText = ({text, wrapper, modifiers = 'heading-inverted--inline', highlight}) => {
  // let str = text.split(' ')
  let str = text // for the moment - just do this
  let Wrapper = `${wrapper || 'h2'}`
  // str = str.map((item, i) => {
  //   let high = highlight && highlight.indexOf(i) !== -1 ? 'highlighted' : null
  //   return <span key={i} className={high}>{item} </span>
  // })
  return <Wrapper className={modifiers}><span dangerouslySetInnerHTML={{__html: str}} /></Wrapper>
}
export default SplitText

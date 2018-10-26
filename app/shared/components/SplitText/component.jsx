import React from 'react'

const SplitText = ({text, wrapper, modifiers = 'heading-inline heading-inverted--inline'}) => {
  // this has been reworked - grab the old one from Github history
  let Wrapper = `${wrapper || 'h2'}`
  return <Wrapper className={modifiers}><span dangerouslySetInnerHTML={{__html: text}} /></Wrapper>
}
export default SplitText

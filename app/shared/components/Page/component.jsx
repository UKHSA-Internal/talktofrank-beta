import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Longform from '../Longform/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Toggle from '../Toggle/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Accent from '../Accent/component.jsx'
import Picture from '../Picture/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'

const Page = props => {
  const modifiers = {
    type: 'p',
    className: 'h5 spacing-top--single'
  }
  const name = props.fields.drugName && props.fields.drugName.toLowerCase()

  // @refactor - this will be wired up to contentful
  let images = {
    300: '//images.ctfassets.net/ip74mqmfgvqf/1hvzrLAx0Oa64Wk0SmYY4C/cf0b27e5fcbbc8f689b7a87953cffa16/Cannabis.jpg'
  }

  return (
    <React.Fragment>
      <Masthead path={props.location}/>
      <Main className='main--full-width'>
        <Accent>
          <Grid>
            {props.fields.image && <GridCol className='col-12 col-md-3'>
              <Picture {...images} />
            </GridCol>}
            <GridCol className={'col-12 col-md-8 ' + (!props.fields.image ? 'offset-md-3' : null)}>
              <Heading type='h1' text={props.fields.drugName} className='h2 inverted spacing-bottom--single'/>
              {props.fields.synonyms && <p className='lead'>Also called:</p>}
              <ul className='list-unstyled list-inline'>{props.fields.synonyms && props.fields.synonyms.map((item, i) => <li className='list-inline-item inverted inverted--quiet' key={i}>{item}</li>)}</ul>
              <Longform text={props.fields.description} className='spacing-bottom--single'/>
            </GridCol>
          </Grid>
        </Accent>
        <section className='section section--has-toggle'>
          <Toggle text='How it looks, tastes and smells' className='collapsible--chevron' history={props.location}>
            {props.fields.qualitiesAppearance && <React.Fragment><Heading {...modifiers} text='What does it look like?'/>
              <Longform text={props.fields.qualitiesAppearance}/></React.Fragment>
            }
            {props.fields.qualitiesTaste && <React.Fragment><Heading {...modifiers} text='What does it taste/smell like?'/>
              <Longform text={props.fields.qualitiesTaste}/></React.Fragment>
            }
            {props.fields.qualitiesAdministered && <React.Fragment><Heading {...modifiers} text='How do people take it?'/><Longform text={props.fields.qualitiesAdministered} /></React.Fragment>
            }
          </Toggle>
        </section>
        <section className='section section--has-toggle'>
          <Toggle text='How it feels' className='collapsible--chevron' history={props.location}>
            {props.fields.effectsFeeling && <React.Fragment><Heading {...modifiers} text='How does it make you feel?'/><Longform text={props.fields.effectsFeeling} /></React.Fragment>
            }
             {props.fields.effects_whatAreThePhysicalEffects && <React.Fragment><Heading {...modifiers} text={`What are the physical effects of ${name}?`}/><Longform text={props.fields.effects_whatAreThePhysicalEffects} /></React.Fragment>
            }
            {props.fields.effectsBehaviour && <React.Fragment><Heading {...modifiers} text={`How does it make people behave?`}/><Longform text={props.fields.effectsBehaviour} /></React.Fragment>
            }
          </Toggle>
        </section>
        <section className='section section--has-toggle'>
          <Toggle text='Duration' className='collapsible--chevron' history={props.location}>
            {props.fields.durationDefault && <React.Fragment><Heading {...modifiers} text={props.fields.durationDefault.fields.name}/><Longform text={props.fields.durationDefault.fields.text} /></React.Fragment>}

            {props.fields.durationMethodOfTaking && props.fields.durationMethodOfTaking.map((v, i) => {
              return (
                <article className='article' key={i}>
                  <Heading type='h3' text={v.fields.methodName} className='h4 heading-inverted displaced-top'/>
                  <dl className='definition-list'>
                    <dt>Start to feel effects:</dt><Heading type='dd' text={v.fields.methodEffectsStart}/>
                    <dt>The effects last for:</dt><Heading type='dd' text={v.fields.methodEffectsDuration}/>
                    <dt>After effects:</dt><Heading type='dd' text={v.fields.methodAfterEffects}/>
                  </dl>
                </article>
              )
            })}
            {props.fields.durationDetail && <React.Fragment><Heading {...modifiers} text='Detail'/><Longform text={props.fields.durationDetail} /></React.Fragment>
            }
            {props.fields.durationDetectable && <React.Fragment><Heading {...modifiers} text='How long will it be detectable?'/><Longform text={props.fields.durationDetectable} /></React.Fragment>
            }
          </Toggle>
        </section>
        <section className='section section--has-toggle'>
          <Toggle text='The risks' className='collapsible--chevron' history={props.location}>
            {props.fields.risksHealthMental && <React.Fragment><Heading {...modifiers} text={`Mental health risks of ${name}?`}/><Longform text={props.fields.risksHealthMental} /></React.Fragment>
            }
            {props.fields.risksPhysicalHealth && <React.Fragment><Heading {...modifiers} text={`Physical health risks of ${name}?`}/><Longform text={props.fields.risksPhysicalHealth} /></React.Fragment>
            }
            {props.fields.risksCutWith && <React.Fragment><Heading {...modifiers} text={`What is ${name} cut with?`}/><Longform text={props.fields.risksCutWith} /></React.Fragment>}
          </Toggle>
        </section>
        <section className='section section--has-toggle'>
          <Toggle text='Mixing' className='collapsible--chevron' history={props.location}>
            {props.fields.mixingDangers && <React.Fragment><Heading {...modifiers} text={`Is ${name} dangerous to mix with other drugs?`}/><Longform text={props.fields.mixingDangers} /></React.Fragment>
            }
          </Toggle>
        </section>
        <section className='section section--has-toggle'>
          <Toggle text='Addiction' className='collapsible--chevron' history={props.location}>
            {props.fields.addiction && <React.Fragment><Heading {...modifiers} text={`Can you get addicted to ${name}?`}/><Longform text={props.fields.addiction} /></React.Fragment>
            }
          </Toggle>
        </section>
        <section className='section section--has-toggle'>
          <Toggle text='The law' className='collapsible--chevron' history={props.location}>
            {props.fields.lawClass && <React.Fragment><Heading {...modifiers} text={`What is the drug classification of ${name}?`}/>
              <Longform text={props.fields.lawClass.fields.class} />
              <Longform text={props.fields.lawClass.fields.dealersSupplying}/>
              <Longform text={props.fields.lawClass.fields.driving} />
              <Longform text={props.fields.lawClass.fields.possesion} />
              <Longform text={props.fields.lawClass.fields.supplying} />
            </React.Fragment>
            }
          </Toggle>
        </section>
        <section className='section section--has-toggle'>
          <Toggle text={`Worried about ${name} use?`} className='collapsible--chevron' history={props.location}>
            {props.fields.worried_iFeelPressuredIntoTakingItWhatCanIDo && <React.Fragment><Heading {...modifiers} text={'I feel pressured into taking it, what can I do?'}/><Longform text={props.fields.worried_iFeelPressuredIntoTakingItWhatCanIDo} /></React.Fragment>
            }
            {props.fields.worried_howCanIHelpMyFriendWithTheirUse && <React.Fragment><Heading {...modifiers} text={'How can I help my friend with their use?'}/><Longform text={props.fields.worried_howCanIHelpMyFriendWithTheirUse} /></React.Fragment>
            }
            {props.fields.worried_iveSpentAllMyMoneyOnItWhatCanIDo && <React.Fragment><Heading {...modifiers} text={'I`ve spent all my money on it, what can I do'}/><Longform text={props.fields.worried_iveSpentAllMyMoneyOnItWhatCanIDo} /></React.Fragment>
            }
            <p className='muted'>If you are worried about your {props.fields.name} use, you can call FRANK on <a href='tel:0800776600'>0800 77 66 00</a> for friendly, confidential advice.</p>
          </Toggle>
        </section>

      </Main>
      <Footer />
      <GA/>
    </React.Fragment>
  )
}
export default Page

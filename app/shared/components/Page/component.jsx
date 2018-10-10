import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Longform from '../Longform/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Toggle from '../Toggle/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'

const Page = props => {
  const modifiers = {
    type: 'p',
    className: 'h6'
  }
  const name = props.fields.drugName && props.fields.drugName.toLowerCase()

  console.log(props)

  return (
    <React.Fragment>
      <Masthead path={props.location}/>
      <Main>
        <Heading text={props.fields.drugName} className='inverted'/>
        <p className='lead muted'>{props.fields.synonyms}</p>
        <Longform text={props.fields.description} className='spacing-bottom--large'/>
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <section className='section section--has-toggle'>
              <Heading className='h3 spacing--single sm-spacing--tight' text={`How it looks, tastes and smells`}/>
              <Toggle text={`How to recognise ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.fields.qualitiesAppearance && <React.Fragment><Heading {...modifiers} text={`What does ${name} look like?`}/>
                  <Longform text={props.fields.qualitiesAppearance}/></React.Fragment>
                }
                {props.fields.qualitiesTaste && <React.Fragment><Heading {...modifiers} text={`What does ${name} taste/smell like?`}/>
                  <Longform text={props.fields.qualitiesTaste}/></React.Fragment>
                }
                {props.fields.qualitiesAdministered && <React.Fragment><Heading {...modifiers} text={`How do people take ${name}?`}/><Longform text={props.fields.qualitiesAdministered} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Heading className='h3 spacing--single sm-spacing--tight' text={`How it feels`}/>
              <Toggle text={`How does ${name} feel`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.fields.effectsFeeling && <React.Fragment><Heading {...modifiers} text={`How does ${name} make you feel?`}/><Longform text={props.fields.effectsFeeling} /></React.Fragment>
                }
                 {props.fields.effects_whatAreThePhysicalEffects && <React.Fragment><Heading {...modifiers} text={`What are the physical effects of ${name}?`}/><Longform text={props.fields.effects_whatAreThePhysicalEffects} /></React.Fragment>
                }
                {props.fields.effectsBehaviour && <React.Fragment><Heading {...modifiers} text={`How does ${name} make people behave?`}/><Longform text={props.fields.effectsBehaviour} /></React.Fragment>
                }
              </Toggle>
            </section>

            <section className='section section--has-toggle'>
              <Heading className='h3 spacing--single sm-spacing--tight' text='Duration'/>
              <Toggle text={`Duration of ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.fields.durationDefault && <Longform text={props.fields.durationDefault} />}

                {props.fields.durationDetectable && <React.Fragment><Heading {...modifiers} text={`How long does ${name} stay in your body?`}/><Longform text={props.fields.durationDetectable} /></React.Fragment>
                }
                {props.fields.effects_whatIsTheComedownLike && <React.Fragment><Heading {...modifiers} text={`What is the comedown off ${name} like?`}/><Longform text={props.fields.effects_whatIsTheComedownLike} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Heading className='h3 spacing--single sm-spacing--tight' text={`The risks`}/>
              <Toggle text={`Risks of ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.fields.risksHealthMental && <React.Fragment><Heading {...modifiers} text={`Mental health risks of ${name}?`}/><Longform text={props.fields.risksHealthMental} /></React.Fragment>
                }
                {props.fields.risksPhysicalHealth && <React.Fragment><Heading {...modifiers} text={`Physical health risks of ${name}?`}/><Longform text={props.fields.risksPhysicalHealth} /></React.Fragment>
                }
                {props.fields.risksCutWith && <React.Fragment><Heading {...modifiers} text={`What is ${name} cut with?`}/><Longform text={props.fields.risksCutWith} /></React.Fragment>}
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Heading className='h3 spacing--single sm-spacing--tight' text='Mixing'/>
              <Toggle text={`Risks of mixing with ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.fields.mixingDangers && <React.Fragment><Heading {...modifiers} text={`Is ${name} dangerous to mix with other drugs?`}/><Longform text={props.fields.mixingDangers} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Heading className='h3 spacing--single sm-spacing--tight' text='Addiction'/>
              <Toggle text={`Addiction risks of ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.fields.addiction && <React.Fragment><Heading {...modifiers} text={`Can you get addicted to ${name}?`}/><Longform text={props.fields.addiction} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Heading className='h3 spacing--single sm-spacing--tight' text={`The law`}/>
              <Toggle text={`Legal status of ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.fields.lawClass && <React.Fragment><Heading {...modifiers} text={`What is the drug classification of ${name}?`}/>
                  {props.fields.lawClass.fields.class}
                  {props.fields.lawClass.fields.dealersSupplying}
                  {props.fields.lawClass.fields.driving}
                  {props.fields.lawClass.fields.possesion}
                  {props.fields.lawClass.fields.supplying}
                </React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Heading className='h3 spacing--single sm-spacing--tight' text={`Worried about ${name} use?`}/>
              <p className='muted'>If you are worried about your {props.fields.name} use, you can call FRANK on <a href='tel:0800776600'>0800 77 66 00</a> for friendly, confidential advice.</p>
              <Toggle text={`Worried about ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.fields.worried_iFeelPressuredIntoTakingItWhatCanIDo && <React.Fragment><Heading {...modifiers} text={'I feel pressured into taking it, what can I do?'}/><Longform text={props.fields.worried_iFeelPressuredIntoTakingItWhatCanIDo} /></React.Fragment>
                }
                {props.fields.worried_howCanIHelpMyFriendWithTheirUse && <React.Fragment><Heading {...modifiers} text={'How can I help my friend with their use?'}/><Longform text={props.fields.worried_howCanIHelpMyFriendWithTheirUse} /></React.Fragment>
                }
                {props.fields.worried_iveSpentAllMyMoneyOnItWhatCanIDo && <React.Fragment><Heading {...modifiers} text={'I`ve spent all my money on it, what can I do'}/><Longform text={props.fields.worried_iveSpentAllMyMoneyOnItWhatCanIDo} /></React.Fragment>
                }
              </Toggle>
            </section>
          </GridCol>
        </Grid>
      </Main>
      <Footer />
      <GA/>
    </React.Fragment>
  )
}
export default Page

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
import { imageMap } from '../../utilities'
import SatisfactionBar from '../SatisfactionBar/component.jsx'
import BlockFeaturedContent from '../../containers/BlockFeaturedContentContainer/component'

const Page = props => {
  const modifiers = {
    type: 'h3',
    className: 'h5'
  }

  const name = props.fields.drugActualName || props.fields.drugName
  const syn = props.location.search ? decodeURIComponent(props.location.search.split('=')[1]) : null

  return (
    <React.Fragment>
      <Masthead path={props.location}/>
      <Main>
        {props.fields.schemaDefinitions &&
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(props.fields.schemaDefinitions) }}/>
        }
        <Accent>
          <Grid>
            {props.fields.image && <GridCol className='col-12 col-md-3'>
              <Picture {...imageMap(props.fields.image)} />
            </GridCol>}
            <GridCol className={'col-12 col-md-7 ' + (!props.fields.image ? 'offset-md-3' : '')}>
              <Heading type='h1' text={props.fields.drugName} className={`h2 inverted spacing-bottom--single ${props.fields.image ? 'has-image' : ''}`}/>
              {props.fields.synonyms && props.fields.synonyms[0] !== '' && <React.Fragment><p className='lead bold'>Also called:</p>
              <ul className='list-unstyled spacing-bottom--tight'>{props.fields.synonyms && props.fields.synonyms.map((item, i) => <li className={'list-inline-item inverted bold' + (syn !== item ? ' inverted--quiet' : '')} key={i}>{item}</li>)}</ul></React.Fragment>}
              <Longform text={props.fields.description} className='spacing-bottom--single'/>
            </GridCol>
          </Grid>
        </Accent>
        {(props.fields.qualitiesAppearance || props.fields.qualitiesTaste) && <section className='section section--has-toggle'>
          <Toggle text='How it looks, tastes and smells' className='collapsible--chevron collapsible--first' history={props.location}>
            {props.fields.qualitiesAppearance && <React.Fragment><Heading {...modifiers} text='What does it look like?'/>
              <Longform text={props.fields.qualitiesAppearance}/></React.Fragment>
            }
            {props.fields.qualitiesTaste && <React.Fragment><Heading {...modifiers} text='What does it taste/smell like?'/>
              <Longform text={props.fields.qualitiesTaste}/></React.Fragment>
            }
          </Toggle>
        </section>}
        {props.fields.qualitiesAdministered && <section className='section section--has-toggle'>
          <Toggle text='How do people take it?' className='collapsible--chevron' history={props.location}>
            <Longform text={props.fields.qualitiesAdministered} />
          </Toggle>
        </section>}
        {(props.fields.category || props.fields.effectsFeeling || props.fields.effectsBehaviour) && <section className='section section--has-toggle'>
          <Toggle text='How it feels' className='collapsible--chevron' history={props.location}>
            {props.fields.category && props.fields.category.toLowerCase() !== 'none' && <Heading type='p' className='h3 inverted' text={props.fields.category} />}
            {props.fields.effectsFeeling && <React.Fragment><Heading {...modifiers} text='How does it make you feel?'/><Longform text={props.fields.effectsFeeling} /></React.Fragment>
            }
            {props.fields.effectsBehaviour && <React.Fragment><Heading {...modifiers} text={`How does it make people behave?`}/><Longform text={props.fields.effectsBehaviour} /></React.Fragment>
            }
          </Toggle>
        </section>}
        {props.fields.durationDefault && <section className='section section--has-toggle'>
          <Toggle text='Duration' className='collapsible--chevron' history={props.location}>
            {props.fields.durationDefault && <Longform text={props.fields.durationDefault.fields.text} />}
            {props.fields.durationDetail && <Longform text={props.fields.durationDetail} />}
            {props.fields.durationDetectable &&
              <React.Fragment>
                <Heading {...modifiers} text='How long will it be detectable?'/>
                <Longform text={props.fields.durationDetectable} />
                {props.fields.durationDetectableDefault && <Longform text={props.fields.durationDetectableDefault.fields.text} />}
              </React.Fragment>
            }
          </Toggle>
        </section>}
        {(props.fields.risksHealthMental || props.fields.risksPhysicalHealth || props.fields.risksCutWith) && <section className='section section--has-toggle'>
          <Toggle text='The risks' className='collapsible--chevron' history={props.location}>
            {props.fields.risksPhysicalHealth && <React.Fragment><Heading {...modifiers} text={`Physical health risks`}/><Longform className='has-unordered' text={props.fields.risksPhysicalHealth} /></React.Fragment>
            }
            {props.fields.risksHealthMental && <React.Fragment><Heading {...modifiers} text={`Mental health risks`}/><Longform className='has-unordered' text={props.fields.risksHealthMental} /></React.Fragment>
            }
            {props.fields.risksCutWith && <React.Fragment><Heading {...modifiers} text={`What is ${name} cut with?`}/><Longform className='has-unordered' text={props.fields.risksCutWith} /></React.Fragment>}
          </Toggle>
        </section>}
        {props.fields.mixingDangers &&
          <section className='section section--has-toggle'>
            <Toggle text='Mixing' className='collapsible--chevron' history={props.location}>
              <React.Fragment><Heading {...modifiers} text={`Is it dangerous to mix with other drugs?`}/><Longform text={props.fields.mixingDangers} /></React.Fragment>
            </Toggle>
          </section>
        }
        {props.fields.addiction &&
          <section className='section section--has-toggle'>
            <Toggle text='Addiction' className='collapsible--chevron' history={props.location}>
              {props.fields.addiction && <React.Fragment><Heading {...modifiers} text={`Can you get addicted?`}/><Longform text={props.fields.addiction} /></React.Fragment>
              }
            </Toggle>
          </section>
        }
        {props.fields.lawClass && <section className='section section--has-toggle'>
          <Toggle text='The law' className='collapsible--chevron' history={props.location}>
            <React.Fragment>
              {props.fields.lawClass.fields.class && props.fields.lawClass.fields.class.toLowerCase() !== 'none' && <Heading type='p' className='h3 inverted spacing-bottom--single' text={props.fields.lawClass.fields.class} />}
              <div className='long-form has-unordered'>
                <ul>
                  <Heading type='li' text={props.fields.lawClass.fields.description}/>
                  <Heading type='li' text={props.fields.lawClass.fields.possesion}/>
                  <Heading type='li' text={props.fields.lawClass.fields.supplying}/>
                </ul>
              </div>
              <Longform text={props.fields.lawClass.fields.driving} />
              <Longform text={props.fields.lawClass.fields.dealersSupplying}/>
            </React.Fragment>
            {props.fields.lawDetail && <React.Fragment><Heading {...modifiers} text='Additional law details'/><Longform text={props.fields.lawDetail} /></React.Fragment>}
            {props.fields.lawCaught && <React.Fragment><Heading {...modifiers} text='What if you are caught?'/><Longform text={props.fields.lawCaught.fields.text} /></React.Fragment>}
          </Toggle>
        </section>}
        <section className='section section--has-toggle'>
          <Toggle text={`Worried about ${name} use?`} className='collapsible--chevron' history={props.location}>

            <p>If you are worried about your {props.fields.name} use, you can call FRANK on <a href='tel:03001236600'>0300 1236600</a> for friendly, confidential advice.</p>
            <ul className='list-unstyled link-list link-list--spaced link-list--has-arrow'>
              <li className='link-list__item'>
                <a href='/get-help/worried-about-a-friend' className='link-list__link'>Worried about a friend?</a>
              </li>
              <li className='link-list__item'>
                <a href='/get-help/worried-about-a-child' className='link-list__link'>Worried about a child?</a>
              </li>
              <li className='link-list__item'>
                <a href='/get-help/dealing-with-peer-pressure' className='link-list__link'>Feeling pressured to take drugs?</a>
              </li>
            </ul>
            {props.fields.additional && <React.Fragment><Heading {...modifiers} text={`Frequently asked questions about ${name}`}/><Longform text={props.fields.additional} /></React.Fragment>
            }
          </Toggle>
        </section>
        <BlockFeaturedContent />
      </Main>
      <Footer>
        <SatisfactionBar />
      </Footer>
      <GA/>
    </React.Fragment>
  )
}
export default Page

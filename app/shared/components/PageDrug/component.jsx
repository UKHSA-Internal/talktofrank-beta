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
import { GA } from '../GoogleAnalytics/component.jsx'
import { imageMap, fieldIncludesImages } from '../../utilities'
import BlockFeaturedContent from '../../containers/BlockFeaturedContentContainer/component'

const Page = props => {
  const modifiers = {
    type: 'h3',
    className: 'h5'
  }

  const { pageData, location, siteSettings } = props

//   console.log(props)
//   console.log('Drug page page data', pageData)
//   console.log('Site settings', siteSettings)

  console.log('Here')
  console.log(pageData.fields)

  const name = pageData.fields.drugActualName || pageData.fields.drugName
  const syn = location.search ? decodeURIComponent(location.search.split('=')[1]) : null
  let hasImage = pageData.fields.image && fieldIncludesImages(pageData.fields.image)

  console.log('Here 1')

  return (
    <React.Fragment>
      <Masthead path={location}/>
      <Main>
        {pageData.fields.schemaDefinitions &&
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageData.fields.schemaDefinitions) }}/>
        }
        <Accent>
          <Grid>
            {hasImage && <GridCol className='col-12 col-md-3'>
              <Picture {...imageMap(pageData.fields)} />
            </GridCol>}
            <GridCol className={'col-12 col-md-7 ' + (!hasImage ? 'offset-md-3' : '')}>
              <Heading type='h1' text={pageData.fields.drugName} className={`h2 inverted spacing-bottom--single ${hasImage ? 'has-image' : ''}`}/>
              {pageData.fields.synonyms && pageData.fields.synonyms[0] !== '' && <React.Fragment><p className='lead bold'>Also called:</p>
              <ul className='list-unstyled spacing-bottom--tight'>{pageData.fields.synonyms && pageData.fields.synonyms.map((item, i) => <li className={'list-inline-item inverted bold' + (syn !== item ? ' inverted--quiet' : '')} key={i}>{item}</li>)}</ul></React.Fragment>}
              <Longform text={pageData.fields.description} className='spacing-bottom--single'/>
            </GridCol>
          </Grid>
        </Accent>
        {(pageData.fields.qualitiesAppearance || pageData.fields.qualitiesTaste) && <section className='section section--has-toggle'>
          <Toggle text='How it looks, tastes and smells' className='collapsible--chevron collapsible--first' history={location}>
            {pageData.fields.qualitiesAppearance && <React.Fragment><Heading {...modifiers} text='What does it look like?'/>
              <Longform text={pageData.fields.qualitiesAppearance}/></React.Fragment>
            }
            {pageData.fields.qualitiesTaste && <React.Fragment><Heading {...modifiers} text='What does it taste/smell like?'/>
              <Longform text={pageData.fields.qualitiesTaste}/></React.Fragment>
            }
          </Toggle>
        </section>}
        {pageData.fields.qualitiesAdministered && <section className='section section--has-toggle'>
          <Toggle text='How do people take it?' className='collapsible--chevron' history={location}>
            <Longform text={pageData.fields.qualitiesAdministered} />
          </Toggle>
        </section>}
        {(pageData.fields.category || pageData.fields.effectsFeeling || pageData.fields.effectsBehaviour) && <section className='section section--has-toggle'>
          <Toggle text='How it feels' className='collapsible--chevron' history={location}>
            {pageData.fields.category && pageData.fields.category.toLowerCase() !== 'none' && <Heading type='p' className='h3 inverted' text={pageData.fields.category} />}
            {pageData.fields.effectsFeeling && <React.Fragment><Heading {...modifiers} text='How does it make you feel?'/><Longform text={pageData.fields.effectsFeeling} /></React.Fragment>
            }
            {pageData.fields.effectsBehaviour && <React.Fragment><Heading {...modifiers} text={`How does it make people behave?`}/><Longform text={pageData.fields.effectsBehaviour} /></React.Fragment>
            }
          </Toggle>
        </section>}
        {pageData.fields.durationDefault && <section className='section section--has-toggle'>
          <Toggle text='Duration' className='collapsible--chevron' history={location}>
            {pageData.fields.durationDefault && <Longform text={pageData.fields.durationDefault.fields.text} />}
            {pageData.fields.durationDetail && <Longform text={pageData.fields.durationDetail} />}
            {pageData.fields.durationDetectable &&
              <React.Fragment>
                <Heading {...modifiers} text='How long will it be detectable?'/>
                <Longform text={pageData.fields.durationDetectable} />
                {pageData.fields.durationDetectableDefault && <Longform text={pageData.fields.durationDetectableDefault.fields.text} />}
              </React.Fragment>
            }
          </Toggle>
        </section>}
        {(pageData.fields.risksHealthMental || pageData.fields.risksPhysicalHealth || pageData.fields.risksCutWith) && <section className='section section--has-toggle'>
          <Toggle text='The risks' className='collapsible--chevron' history={location}>
            {pageData.fields.risksPhysicalHealth && <React.Fragment><Heading {...modifiers} text={`Physical health risks`}/><Longform className='has-unordered' text={pageData.fields.risksPhysicalHealth} /></React.Fragment>
            }
            {pageData.fields.risksHealthMental && <React.Fragment><Heading {...modifiers} text={`Mental health risks`}/><Longform className='has-unordered' text={pageData.fields.risksHealthMental} /></React.Fragment>
            }
            {pageData.fields.risksCutWith && <React.Fragment><Heading {...modifiers} text={`What is ${name} cut with?`}/><Longform className='has-unordered' text={pageData.fields.risksCutWith} /></React.Fragment>}
          </Toggle>
        </section>}
        {pageData.fields.mixingDangers &&
          <section className='section section--has-toggle'>
            <Toggle text='Mixing' className='collapsible--chevron' history={location}>
              <React.Fragment><Heading {...modifiers} text={`Is it dangerous to mix with other drugs?`}/><Longform text={pageData.fields.mixingDangers} /></React.Fragment>
            </Toggle>
          </section>
        }
        {pageData.fields.addiction &&
          <section className='section section--has-toggle'>
            <Toggle text='Addiction' className='collapsible--chevron' history={location}>
              {pageData.fields.addiction && <React.Fragment><Heading {...modifiers} text={`Can you get addicted?`}/><Longform text={pageData.fields.addiction} /></React.Fragment>
              }
            </Toggle>
          </section>
        }
        {pageData.fields.lawClass && <section className='section section--has-toggle'>
          <Toggle text='The law' className='collapsible--chevron' history={location}>
            <React.Fragment>
              {pageData.fields.lawClass.fields.class && pageData.fields.lawClass.fields.class.toLowerCase() !== 'none' && <Heading type='p' className='h3 inverted spacing-bottom--single' text={pageData.fields.lawClass.fields.class} />}
              <div className='long-form has-unordered'>
                <ul>
                  <Heading type='li' text={pageData.fields.lawClass.fields.description}/>
                  <Heading type='li' text={pageData.fields.lawClass.fields.possesion}/>
                  <Heading type='li' text={pageData.fields.lawClass.fields.supplying}/>
                </ul>
              </div>
              <Longform text={pageData.fields.lawClass.fields.driving} />
              <Longform text={pageData.fields.lawClass.fields.dealersSupplying}/>
            </React.Fragment>
            {pageData.fields.lawDetail && <React.Fragment><Heading {...modifiers} text='Additional law details'/><Longform text={pageData.fields.lawDetail} /></React.Fragment>}
            {pageData.fields.lawCaught && <React.Fragment><Heading {...modifiers} text='What if you are caught?'/><Longform text={pageData.fields.lawCaught.fields.text} /></React.Fragment>}
          </Toggle>
        </section>}
        <section className='section section--has-toggle'>
          <Toggle text={`Worried about ${name} use?`} className='collapsible--chevron' history={location}>

            <p>If you are worried about your {pageData.fields.name} use, you can call FRANK on <a href='tel:03001236600'>0300 1236600</a> for friendly, confidential advice.</p>
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
            {pageData.fields.additional && <React.Fragment><Heading {...modifiers} text={`Frequently asked questions about ${name}`}/><Longform text={pageData.fields.additional} /></React.Fragment>
            }
          </Toggle>
        </section>
        <BlockFeaturedContent />
      </Main>
      <Footer />
      <GA/>
    </React.Fragment>
  )
}
export default Page

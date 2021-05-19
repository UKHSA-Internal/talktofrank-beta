import { connect } from 'react-redux'
import PageHome from '../../components/PageHome/component.jsx'
import { imageMap } from '../../utilities'

const mapStateToProps = (state, ownProps) => {
  const { fields } = state.app.pageData

  const { drugGrid, featuredVideo, someFrankAdvice } = fields

  let frankAdviceBlock = false
  let featuredVideoBlock = false
  let drugsGrid = false
  let hero = {
    heading: {
      wrapper: 'h1',
      text: {
        desktop:
          '<span class="block">Honest information</span><span class="block">about drugs</span>',
        mobile:
          '<span class="block">Honest</span><span class="block">information</span><span class="block">about drugs</span>'
      }
    },
    url: '/'
  }

  hero.images = imageMap(fields, 'heroImages')
  if (featuredVideo && featuredVideo.fields) {
    featuredVideoBlock = { ...featuredVideo.fields }
    if (featuredVideo.fields.previewImage) {
      featuredVideoBlock.previewImage = imageMap(
        featuredVideo.fields,
        'previewImage'
      )
    }
  }
  if (
    someFrankAdvice &&
    someFrankAdvice.fields &&
    someFrankAdvice.fields.articles
  ) {
    frankAdviceBlock = {}
    frankAdviceBlock.title = someFrankAdvice.fields.title
    frankAdviceBlock.link = someFrankAdvice.fields.viewMoreUrl
    frankAdviceBlock.articles = someFrankAdvice.fields.articles.map(article => {
      let art = {
        fields: {
          heading: {
            type: 'h3',
            text: article.fields.title,
            className: 'h4 card-title'
          },
          url: `/news/${article.fields.slug}`
        },
        date: article.date,
        dateFormatted: article.dateFormatted
      }
      if (article.fields.image) {
        art.images = imageMap(article.fields)
      }
      return art
    })
  }
  if (
    drugGrid &&
    drugGrid.fields &&
    drugGrid.fields.drug &&
    drugGrid.fields.drug.length > 0
  ) {
    drugsGrid = drugGrid.fields.drug.map(d => d.fields)
  }
  return {
    hero,
    drugsGrid,
    featuredVideoBlock,
    frankAdviceBlock
  }
}

export default connect(mapStateToProps)(PageHome)

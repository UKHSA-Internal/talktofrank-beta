import React from 'react'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Time from '../Time/component.jsx'
import Heading from '../Heading/component.jsx'
import ArrowLink from '../ArrowLink/component.jsx'
import Icon from '../Icon/component.jsx'
const BlockDrugsAndyou = props => {
  const getImage = article => {
    const key = Math.max.apply(null, Object.keys(article.images))
    const source = `url("${article.images[key]}") no-repeat center/cover`
    return {
      background: source
    }
  }
  const iconPlay = {
    label: '',
    url: '/ui/svg/play-pink.svg'
  }
  const articles = [
    {
      image: '/ui/img/content/teded.jpg',
      heading: {
        type: 'h3',
        text: 'Drugs and your brain',
        className: 'h4 card-title'
      },
      source: 'TED ED',
      icon: true
    },
    {
      image: '/ui/img/content/vice.jpg',
      heading: {
        type: 'h3',
        text: '6 tips for dealing with your first big night after lockdown',
        className: 'h4 card-title'
      },
      source: 'VICE',
      icon: false
    },
    {
      image: '/ui/img/content/afmc.jpg',
      heading: {
        type: 'h3',
        text: 'How much is too much?',
        className: 'h4 card-title'
      },
      source: 'AFMC',
      icon: false
    }
  ]
  return (
    <section className="spacing-top--large wrapper--constant wrapper drugsandyou">
      <Grid>
        <GridCol className="col-12">
          <div className="drugsandyou__wrapper">
            <h3>Drugs and you</h3>
          </div>
        </GridCol>
      </Grid>
      <Grid>
        {articles.map(article => (
          <GridCol className="col-12 col-sm-6 col-md-4">
            <div className="card card--mobile-horizontal">
              <a href={'/#'} className="card__link">
                <div
                  className="card__image"
                  style={{
                    background: `url("${article.image}") no-repeat center/cover`
                  }}
                >
                  {article.icon && <Icon {...iconPlay} />}
                </div>
                <div className="card-body">
                  <span className="article-source">{article.source}</span>
                  <Heading {...article.heading} />
                </div>
              </a>
            </div>
          </GridCol>
        ))}
      </Grid>
      <Grid>
        <GridCol className="col-12">
          <ArrowLink
            className="arrowlink--align-center"
            href="/#"
            text="View more facts about drugs"
          />
        </GridCol>
      </Grid>
    </section>
  )
}

export default BlockDrugsAndyou

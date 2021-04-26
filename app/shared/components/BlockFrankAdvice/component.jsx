import React from 'react'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Time from '../Time/component.jsx'
import Heading from '../Heading/component.jsx'
import ArrowLink from '../ArrowLink/component.jsx'

const BlockFrankAdvice = props => {
  const getImage = article => {
    const key = Math.max.apply(null, Object.keys(article.images))
    const source = `url("${article.images[key]}") no-repeat center/cover`
    return {
      background: source
    }
  }

  return (
    <section className="wrapper wrapper--mid spacing-top--large somefrankadvice">
      <Grid>
        <GridCol className="col-12">
          <div className="somefrankadvice__wrapper">
            <h3>{props.title}</h3>
          </div>
        </GridCol>
      </Grid>
      <Grid>
        {props.articles.map(article => (
          <GridCol className="col-6">
            <div className="card card--horizontal-desktop">
              <a href={article.fields.url} className="card__link">
                <div
                  className="card__image"
                  style={getImage(article.images)}
                ></div>
                <div className="card-body">
                  <Heading {...article.fields.heading} />
                  {article.date && article.dateFormatted && (
                    <Time time={article.dateFormated} datetime={article.date} />
                  )}
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
            href={props.link}
            text="View more FRANK advice"
          />
        </GridCol>
      </Grid>
    </section>
  )
}

export default BlockFrankAdvice

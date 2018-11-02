import React from 'react'
// import { Link } from 'react-router-dom'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Accent from '../Accent/component.jsx'
import Pagination from '../Pagination/component.jsx'
import Article from '../Article/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'

export default class PageNewsList extends React.Component {
  constructor (props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange (pageNumber) {
    this.props.fetchNewsList(pageNumber.current)
  }

  render () {
    const { loading, location } = this.props
    const { title, list, total } = this.props.pageData
    return (
      <React.Fragment>
        <Masthead path={location}/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single'
                   text={title}/>
        </Accent>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-10 offset-sm-1'>
              <ul
                className='list-unstyled list-offset'>
                {list && list
                  .map((item, i) => {
                    item['type'] = 'li'
                    return <Article {...item} key={item.sys.id}/>
                  })}
              </ul>
              {total > 10 &&
              <Pagination
                pageCount={total / 10}
                onPageChange={this.handlePageChange}
              />
              }
            </GridCol>
          </Grid>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

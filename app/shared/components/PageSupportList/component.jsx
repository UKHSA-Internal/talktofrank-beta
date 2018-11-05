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

export default class PageSupportList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange (pageNumber) {
    this.props.fetchSupportList(pageNumber.current)
  }

  render () {
    const { loading, location } = this.props
    const { title, list, total } = this.props.pageData
    return (
      <React.Fragment>
        <Masthead path={location}/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text={title}/>
        </Accent>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-10 offset-sm-1'>
sdf gsdfg sdg sdfg sdfg sdfg sdfg sdg sdfg sdfg sdfg sdfg sdfg sdfg sdfg sdfg sdfg sdfg sdg sdfg sdfg sdfg sdfg s

            </GridCol>
          </Grid>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

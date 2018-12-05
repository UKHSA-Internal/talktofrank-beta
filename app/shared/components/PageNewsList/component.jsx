import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Accent from '../Accent/component.jsx'
import Pagination from '../Pagination/component.jsx'
import Article from '../Article/component.jsx'
import Main from '../Main/component.jsx'
import Spinner from '../Spinner/component.jsx'
import { scrollTo } from '../../utilities'
import { GA } from '../GoogleAnalytics/component.jsx'

export default class PageNewsList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.main = React.createRef()
    this.focusMain = this.focusMain.bind(this)
  }

  handlePageChange (pageNumber) {
    this.props.fetchNewsList(pageNumber.current)
    this.updateAddress(pageNumber.current)
  }

  updateAddress (page) {
    if ('replaceState' in history) {
      let path = page === 0 ? '/news' : `/news/${(page + 1)}`
      window.history.replaceState({}, document.title, path)
    }
  }

  focusMain() {
    scrollTo((document.body || document.documentElement), 0, 500, this.main.current.focus())
  }

  render () {
    const { loading, location, error } = this.props
    const { title, list, total, pageNumber } = this.props.pageData

    return (
      <React.Fragment>
        <Masthead path={location}/>
        <Main>
          <span className='jump' tabIndex='-1' ref={this.main}/>
          <Accent className='accent--shallow'>
            <Heading type='h1' className='page-title' text={title}/>
          </Accent>
          <Accent className='accent--shallow'>
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
                {loading && !error && <Spinner className='spinner--fixed'/>}
              </GridCol>
            </Grid>
            {total > 10 &&
            <Pagination
              initialPage={pageNumber}
              pageCount={Math.ceil(total / 10)}
              onPageChange={this.handlePageChange}
              onPaginateFocus={this.focusMain}
            />
            }
          </Accent>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}

import React, { PureComponent } from 'react'
import Button from '../Button/component.jsx'
import Icon from '../Icon/component.jsx'
import FormHint from '../FormHint/component'

class FormGroup extends PureComponent {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      id: '',
      searchTerm: ''
    }
  }

  handleSearchSubmit () {
    const searchTerm = encodeURIComponent(
      this.state.searchTerm
        .toLowerCase()
        .trim()
    )
    if (searchTerm !== '') {
      window.location = `/search/${searchTerm}`
    }
  }

  componentDidMount() {
    if (this.props.focus) {
      this.searchInput.focus()
    }
  }

  onChange (event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render () {
    const { searchTerm } = this.state
    const { id, label } = this.props
    let iconSubmit = {
      label: 'Submit search',
      url: '/ui/svg/magnifying-pink.svg'
    }
    return (
      <div className='form-group form-group--flush form-group--full-width'>
        <label htmlFor={id} className='form-label form-label--large'>{label}</label>
        <input className='form-control form-control--large' id={id} name={id} value={searchTerm} type='text' onChange={this.onChange} ref={input => { this.searchInput = input }} autoComplete='true' />
        <Button className='btn--flat submit' clickHandler={this.handleSearchSubmit.bind(this)}><Icon {...iconSubmit}/></Button>
      </div>
    )
  }
}

export default FormGroup

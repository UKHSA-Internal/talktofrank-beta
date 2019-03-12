import React from 'react'

export default class GMap extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const latLong = {lat: this.props.location.lat, lng: this.props.location.lon}
    let map = new google.maps.Map(document.getElementById('map'), {
      center: latLong,
      zoom: 16,
      mapTypeControl: false
    })
    let marker = new google.maps.Marker({
      position: latLong,
      map: map,
      title: this.props.name
    })
  }

  render() {
    return (
      <section className='map'>
        <div id='map' className='map__content'></div>
      </section>
    )
  }
}

import React from 'react'
import Picture from '../Picture/component.jsx'
import { imageMap } from '../../utilities'
class AttributedImage extends React.PureComponent {
  render() {
    return (
      <figure
        className={
          'attributedimage ' +
          (this.props.className ? this.props.className : '')
        }
      >
        <Picture {...imageMap(this.props)} />
        {this.props.image?.fields?.attribution && (
          <figcaption>{this.props.image.fields.attribution}</figcaption>
        )}
      </figure>
    )
  }
}
export default AttributedImage

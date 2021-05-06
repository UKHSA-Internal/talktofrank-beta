import React from 'react'

class DrugGrid extends React.Component {
  handleClick = drug => {
    this.props.onClick(drug.slug)
  }
  generateClass = drug => {
    let classes = 'druggrid__item '
    if (!drug.name) {
      classes += 'druggrid__item--blank '
    }
    if (drug.slug === this.props.selected) {
      classes += 'druggrid__item--selected'
    }
    return classes
  }
  render() {
    /**
    * @todo: generate this array dynamically
    */
    const drugs = [
      [
        {
          name:
            this.props.drugs[0].drugGridName ||
            this.props.drugs[0].drugName ||
            false,
          slug: this.props.drugs[0].slug
        },
        { name: false },
        {
          name:
            this.props.drugs[1].drugGridName ||
            this.props.drugs[1].drugName ||
            false,
          slug: this.props.drugs[1].slug
        },
        { name: false }
      ],
      [
        { name: false },
        {
          name:
            this.props.drugs[2].drugGridName ||
            this.props.drugs[2].drugName ||
            false,
          slug: this.props.drugs[2].slug
        },
        { name: false },
        {
          name:
            this.props.drugs[3].drugGridName ||
            this.props.drugs[3].drugName ||
            false,
          slug: this.props.drugs[3].slug
        }
      ],
      [
        {
          name:
            this.props.drugs[4].drugGridName ||
            this.props.drugs[4].drugName ||
            false,
          slug: this.props.drugs[4].slug
        },
        { name: false },
        {
          name:
            this.props.drugs[5].drugGridName ||
            this.props.drugs[5].drugName ||
            false,
          slug: this.props.drugs[5].slug
        },
        { name: false }
      ],
      [
        { name: false },
        {
          name:
            this.props.drugs[6].drugGridName ||
            this.props.drugs[6].drugName ||
            false,
          slug: this.props.drugs[6].slug
        },
        { name: false },
        {
          name:
            this.props.drugs[7].drugGridName ||
            this.props.drugs[7].drugName ||
            false,
          slug: this.props.drugs[7].slug
        }
      ]
    ]

    return (
      <div className="druggrid">
        {drugs.map((row, i) => (
          <div className="druggrid__col" key={i}>
            {row.map(drug => (
              <div
                key={drug.slug}
                style={{
                  pointerEvents: drug.name ? 'auto' : 'none',
                  cursor: drug.name ? 'pointer' : 'auto'
                }}
                className={this.generateClass(drug)}
                onClick={
                  drug.name !== 'null' ? () => this.handleClick(drug) : () => {}
                }
              >
                <div className="druggrid__inner">
                  <p className="druggrid__text">
                    {drug.name !== 'null' ? drug.name : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default DrugGrid

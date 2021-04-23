import React from 'react'

class DrugGrid extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const drugs = [
      [
        {
          name:
            this.props.drugs[0].drugGridName ||
            this.props.drugs[0].drugName ||
            'null',
          slug: this.props.drugs[0].slug
        },
        { name: 'null' },
        {
          name:
            this.props.drugs[1].drugGridName ||
            this.props.drugs[1].drugName ||
            'null',
          slug: this.props.drugs[1].slug
        },
        { name: 'null' }
      ],
      [
        { name: 'null' },
        {
          name:
            this.props.drugs[2].drugGridName ||
            this.props.drugs[2].drugName ||
            'null',
          slug: this.props.drugs[2].slug
        },
        { name: 'null' },
        {
          name:
            this.props.drugs[3].drugGridName ||
            this.props.drugs[3].drugName ||
            'null',
          slug: this.props.drugs[3].slug
        }
      ],
      [
        {
          name:
            this.props.drugs[4].drugGridName ||
            this.props.drugs[4].drugName ||
            'null',
          slug: this.props.drugs[4].slug
        },
        { name: 'null' },
        {
          name:
            this.props.drugs[5].drugGridName ||
            this.props.drugs[5].drugName ||
            'null',
          slug: this.props.drugs[5].slug
        },
        { name: 'null' }
      ],
      [
        { name: 'null' },
        {
          name:
            this.props.drugs[6].drugGridName ||
            this.props.drugs[6].drugName ||
            'null',
          slug: this.props.drugs[6].slug
        },
        { name: 'null' },
        {
          name:
            this.props.drugs[7].drugGridName ||
            this.props.drugs[7].drugName ||
            'null',
          slug: this.props.drugs[7].slug
        }
      ]
    ]

    return (
      <div className="druggrid">
        {drugs.map(row => (
          <div className="druggrid__col">
            {row.map(drug => (
              <div
                style={{
                  pointerEvents: drug.name !== 'null' ? 'auto' : 'none'
                }}
                className={
                  'druggrid__item ' +
                  (drug.name === 'null' ? 'druggrid__item--blank' : '')
                }
                onClick={() => this.props.onClick(drug.slug)}
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

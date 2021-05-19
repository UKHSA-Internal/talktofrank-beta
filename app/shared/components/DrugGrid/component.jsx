import React from 'react'
import ArrowLink from '../ArrowLink/component'

class DrugGrid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      elements: [0, 1, 2, 3, 4, 5, 6, 7]
    }

    for (let i = 0; i < this.state.elements.length; i++) {
      this['drugHeader' + this.state.elements[i]] = React.createRef()
    }
  }

  focusElement = index => this['drugHeader' + index].current.focus()

  handleClick = drug => {
    this.props.onClick(drug.slug)
  }

  incrementIndex = index => index === 7 ? 0 : index + 1
  decrementIndex = index => index === 0 ? 7 : index - 1

  handleKeyDown = (drug, e) => {
    if (e.key === 'Enter' || e.key === ' ') this.props.onClick(drug.slug)
    if (e.key === 'ArrowDown') this.focusElement(this.incrementIndex(drug.order))
    if (e.key === 'ArrowUp') this.focusElement(this.decrementIndex(drug.order))
    if (e.key === 'Home') this.focusElement(0)
    if (e.key === 'End') this.focusElement(7)
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
          slug: this.props.drugs[0].slug,
          order: 0
        },
        { name: false },
        {
          name:
            this.props.drugs[1].drugGridName ||
            this.props.drugs[1].drugName ||
            false,
          slug: this.props.drugs[1].slug,
          order: 1
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
          slug: this.props.drugs[2].slug,
          order: 2
        },
        { name: false },
        {
          name:
            this.props.drugs[3].drugGridName ||
            this.props.drugs[3].drugName ||
            false,
          slug: this.props.drugs[3].slug,
          order: 3
        }
      ],
      [
        {
          name:
            this.props.drugs[4].drugGridName ||
            this.props.drugs[4].drugName ||
            false,
          slug: this.props.drugs[4].slug,
          order: 4
        },
        { name: false },
        {
          name:
            this.props.drugs[5].drugGridName ||
            this.props.drugs[5].drugName ||
            false,
          slug: this.props.drugs[5].slug,
          order: 5
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
          slug: this.props.drugs[6].slug,
          order: 6
        },
        { name: false },
        {
          name:
            this.props.drugs[7].drugGridName ||
            this.props.drugs[7].drugName ||
            false,
          slug: this.props.drugs[7].slug,
          order: 7
        }
      ]
    ]

    return (
      <React.Fragment>
        <div className="druggrid">
          {drugs.map((row, i) => (
            <div className="druggrid__col" key={i}>
              {row.map(drug => (
                drug.name ? (
                  <h3
                    key={drug.slug}
                    style={{
                      pointerEvents: drug.name ? 'auto' : 'none',
                      cursor: drug.name ? 'pointer' : 'auto'
                    }}
                    className={this.generateClass(drug)}
                  >
                    <div
                      onClick={
                        drug.name !== 'null' ? () => this.handleClick(drug) : () => {}
                      }
                      onKeyDown={(e) => this.handleKeyDown(drug, e)}
                      role={drug.name && 'button'}
                      aria-expanded={drug.name && this.props.selected === drug.slug}
                      aria-controls={`drugsgrid__panel-${drug.slug}`}
                      id={`druggrid__button-${drug.slug}`}
                      ref={this['drugHeader' + drug.order]}
                      tabindex={drug.name && this.props.isDrugGridTraversable ? '0' : '-1'}
                    >
                      <div className="druggrid__inner">
                        <span className="druggrid__text">
                          {drug.name !== 'null' ? drug.name : ''}
                        </span>
                      </div>
                    </div>
                  </h3>
                ) : (
                  <div className="druggrid__item druggrid__item--blank" />
                )
              ))}
            </div>
          ))}
        </div>
        <ArrowLink
          href="/drugs-a-z"
          text="View the full list of drugs"
          className="arrowlink--align-center m-t-75"
          tabIndex={this.props.isDrugGridTraversable ? '0' : '-1'}
        />
      </React.Fragment>
    )
  }
}

export default DrugGrid

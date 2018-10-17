const selectors = {
  links: {
    contains: escapedText => {
      return `//a[contains(text(), ${escapedText})]`
    },
    headingContains: (heading, escapedText) => {
      return `//${heading}[contains(., '${escapedText}')]/..`
    },
    collapsibleHeading: (heading, escapedText) => {
      return `//${heading}[contains(., ${escapedText})]/a`
    },
    aZDrugListItem: (escapedText) => {
      return `//h3[contains(., ${escapedText})]/../..`
    }
  },
  durationList: `//*[@id="duration"]/div/div/div/div/dl[1]`,
  elements: {
    'page-title': 'h1',
    'drug-slang-terms': 'p.lead',
    'drug-page-title': 'section.accent h2',
    'drug-page-street-names': 'section.accent ul',
    'drug-page-description': 'section.accent .long-form',
    'drug-page-header': 'section.accent'
  },
  buttons: {},
  checkboxes: {}
};

module.exports = selectors;



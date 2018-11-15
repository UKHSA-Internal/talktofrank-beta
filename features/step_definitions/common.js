// Dependencies
const { Given, When, Then } = require('cucumber')
const {
  visitDrugPageByClickingSlangTermOnAZ,
  visitPage,
  pageHasLoaded,
  assertPageTitleEqualsLink,
  assertSlagTermisHighlighted,
  assertCanSeeText,
  assertCanSeeTextinSection,
  assertCanSeeDurationSections,
  assertCanSeeTextinDurationSection,
  assertCanClickOnAZDrugLink,
  assertDrugNameAppearsWithStreetName,
  assertElementExistInSelector
} = require('../support/actions')
const assertions = require('../support/assertions')
const selectors = require('../support/selectors')

/**
 * Given
 */

Given('that I have linked through to a drugs page', () => {
  return visitPage('cocaine', 'drug')
})

Given('I am on the talktofrank\.com homepage', () => {
  return visitPage('home')
})

Given('I have come to this page by clicking on or searching for a slang name', () => (
  visitDrugPageByClickingSlangTermOnAZ(assertions.drug.cocaine, 'street')
))

Given('I\'m a considerer', () => {
  return true
})

Given(/^I go to a page that does not exist$/, () => {
  return visitPage('notfound')
})

Given(/^(I am|I'm) on the drugs a-z$/, (text1) => {
  return visitPage('aToZ')
})

Given(/^(that )?I am on a drug(s)? info page$/i, (text1, text2) => (
  visitPage(assertions.drug.cocaine.name, 'drug'))
)

Given(/^I am worried about someone who has taken drugs$/, () => {
  callback(null, 'pending')
})

Given(/^The is an image associated with a drug$/, () => (
  // No real way of testing this at the moment
  true
))

/**
 * When
 */

When(/^(that )?I am on a drug(s)? details page$/i, (text1, text2) => (
  visitPage(assertions.drug.cocaine.name, 'drug'))
)

When(/^the page (has|is) loaded$/i, (text) => ( pageHasLoaded() ))

When(/^the page loads$/, pageHasLoaded)

When(/^I scan the page$/, pageHasLoaded)

When(/^I look at the list of drugs$/, pageHasLoaded)

When(/^I've clicked through on the real name and the drugs info page loads$/, () => (
  visitDrugPageByClickingSlangTermOnAZ(assertions.drug.cocaine, 'real')
))

Then(/^I've clicked through one a slang name and the drugs info page loads$/, () => (
  visitDrugPageByClickingSlangTermOnAZ(assertions.drug.cocaine, 'street')
))

When(/^I am looking for information about what behaviour is normal and when something might be wrong$/, () => (
  visitPage(assertions.drug.cocaine.name, 'drug'))
)

When(/^I'm on the drugs info page$/, () => (
  visitPage(assertions.drug.cocaine.name, 'drug'))
)

/**
 * Then
 */

Then('I should see the name of the drug this page represents as the page title', assertPageTitleEqualsLink)

Then('I should be able to see the slang name highlighted', assertSlagTermisHighlighted)

Then(/^I should see a top level CTA or statement explaining this$/, () => {
  return assertCanSeeText(assertions.home.cta, 'h1')
})

Then(/^I should see information about the behavioural \/ psychological effects of taking the drug$/, () => {
  return assertCanSeeTextinSection('How does it make people behave', assertions.drug.headings.feels)
})

Then(/^I should see content explaining how long the high of a drug will last$/, assertCanSeeDurationSections)

Then(/^I should see content explaining about other factors that can affect how long the high of a drug lasts e\.g\. how much was taken, if it was mixed with anything, the size\/age\/tolerance of the person taking it$/, () => {
  return assertCanSeeTextinSection('How long the effects last and the drug stays in your system depends on your size, whether you’ve eaten, and what other drugs you might have taken with it. This overview is for guidance only.', assertions.drug.headings.duration)
})

Then(/^I can see details of any particularly dangerous mixes$/, () => {
  return assertCanSeeTextinSection('Is cocaine dangerous to mix with other drugs', assertions.drug.headings.mixing)
})

Then(/^I should see a message telling me this page does not exist$/, () => {
  return assertCanSeeText(assertions.pageNotFound.title)
})

Then(/^I should see options for what to do next$/, () => {
  return assertCanSeeText(assertions.pageNotFound.title)
})

Then(/^I should be able to see a list item for all "([^"]*)" that have a page on the site$/, drug => {
  return assertCanSeeText(drug)
})

Then(/^I should be able to see some of the "([^"]*)" associated with each of the drugs$/, streetName => {
  return assertCanSeeText(streetName)
})

Then(/^I should be able to click through to the drugs pages$/, () => {
  return assertCanClickOnAZDrugLink(assertions.drug.cocaine)
})

Then(/^I should be able to differentiate the street names from the real names$/, () => {
  // Write code here that turns the phrase above into concrete actions
  return assertDrugNameAppearsWithStreetName(assertions.drug.cocaine)
})

Then(/^I can see all "([^"]*)" for the drug that are in the cms$/, arg1 => (
  assertCanSeeText(arg1)
))

Then(/^I should see content explaining how the drug will make me act under its influence$/, () => {
  return assertCanSeeTextinSection('How does it make people behave', assertions.drug.headings.feels)
})

Then(/^I want to see information about the physical risks of taking the drug$/, () => {
  return assertCanSeeTextinSection('Physical health risks', assertions.drug.headings.risks)
})

Then(/^I want to see information about the legal risks of taking the drug$/, () => {
  return assertCanSeeTextinSection('Physical health risks', assertions.drug.headings.risks)
})

Then(/^I see the main (drug )?name as the page title$/, (text1) => (
  assertCanSeeText(assertions.drug.cocaine.name, selectors.elements['drug-page-title'])
))

Then(/^I see the drug description$/, () => (
  assertCanSeeText(assertions.drug.cocaine.description, selectors.elements['drug-page-description'])
))

Then(/^I see the image next to the title$/, () => (
  assertElementExistInSelector('img', selectors.elements['drug-page-header'])
))
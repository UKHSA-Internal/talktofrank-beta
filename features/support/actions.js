// API https://github.com/GoogleChrome/puppeteer/blob/v1.8.0/docs/api.md#
const scope = require('./scope')
const selectors = require('./selectors')
const assertions = require('./assertions')
const pages = require('./pages')
const { expect, assert } = require('chai')
// chai.use(require('chai-dom'))

var fs = require('fs')

exports.pageHasLoaded = async () => {
  // Write code here that turns the phrase above into concrete actions
  if (!scope.context.visit.status) {
    scope.context.visit.waitFor(1500)
  }
  return await scope.context.visit.status === 200
}

// Navigation functions

exports.visitPage = async (pageName, pageType) => {
  if (!scope.browser)
    scope.browser = await scope.driver.launch({headless: true, args:['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']})
  scope.context.currentPage = await scope.browser.newPage()
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 })
  let url = scope.host

  switch (pageType) {
    case 'drug':
      url += pages.drugPage(pageName)
      break

    default:
      url += pages[pageName]
  }
  scope.context.visit = await scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2'
  })
  await scope.context.currentPage.waitFor(1000)
  return scope.context.visit
}

exports.visitDrugPageByClickingSlangTermOnAZ = async (drug, realNameOrStreetName) => {
  if (!scope.browser)
    scope.browser = await scope.driver.launch({headless: true, args:['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']})
  scope.context.currentPage = await scope.browser.newPage()
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 })

  const url = scope.host + pages.aToZ
  await scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2'
  })

  const text = realNameOrStreetName === 'real' ? drug.name : drug.streetTerms[0]
  clickByHeadingText(scope.context.currentPage, 'h3', text)
  await scope.context.currentPage.waitForNavigation({waitUntil: 'networkidle2'})
  scope.context.visit = scope.context.currentPage
  return scope.context.visit
}

// Assert functions

exports.assertPageTitleEqualsLink = async () => {
  const innerText = await scope.context.currentPage
    .evaluate((selectors) => document.querySelector(
      selectors.elements['page-title']).innerText, selectors
    )
  assert.equal(innerText, 'Cocaine')
}

exports.assertSlagTermisHighlighted = async () => {
  const innerText = await scope.context.currentPage
    .evaluate((selectors) => document.querySelector(selectors.elements['drug-slang-terms']).innerText, selectors)
  return expect(innerText).to.have.string('Coke')
}

exports.assertCanSeeText = async (text, selector = false) => {
  const pageSelector = selector ? selector : 'body'
  const innerText = await scope.context.currentPage
    .evaluate((pageSelector) => document.querySelector(pageSelector).textContent, pageSelector)
  return expect(sanitise(innerText)).to.have.string(text)
}

exports.assertCanSeeTextinSection = async (text, section) => (
  assertTextExistsinSection(text, false, section)
)

exports.assertCanSeeDurationSections = async () => {
  await toggleHeading(scope.context.currentPage, 'h2', assertions.drug.headings.duration)
  const section = await scope.context.currentPage.$x(selectors.durationList)
  return section.length > 0
}

exports.assertCanClickOnAZDrugLink = async (drug) => {
  clickByHeadingText(scope.context.currentPage, 'h3', drug.streetTerms[0])
  await scope.context.currentPage.waitForNavigation({waitUntil: 'networkidle2'})
  return this.assertCanSeeText(drug.name, 'h2')
}

exports.assertDrugNameAppearsWithStreetName = async (drug) => {
  const assertText = `Real name: ${drug.name}`
  const aZElement = await getAZElementByHeadingText(scope.context.currentPage, drug.streetTerms[0])
  return expect(await aZElement.$eval('a', node => node.innerText)).to.have.string(assertText)
}

exports.assertElementExistInSelector = async (element, parentSelector) => {
  const parentElement = await getElementBySelector(parentSelector)
  return await parentElement.$eval(element, node => node) !== null
}

// Helper functions

const assertTextExistsinSection = async (text, selector, section) => {
  await toggleHeading(scope.context.currentPage, 'h2', section)
  const pageSelector = selector ? selector : 'body'
  const innerText = await scope.context.currentPage
    .evaluate((pageSelector) => document.querySelector(pageSelector).textContent, pageSelector)
  return expect(innerText).to.have.string(text)
}

const sanitise = (string) => {
  string = string.replace('/n', ' ')
  return string
}

const toggleHeading = async (page, heading, text) => {
  const linkHandlers = await page.$x(selectors.links.collapsibleHeading(heading, escapeXpathString(text)))
  await page.waitFor(500)
  if (linkHandlers.length > 0) {
    await linkHandlers[0].click()
  } else {
    throw new Error(`Toggle heading not found: ${text}`)
  }
}

const clickByHeadingText = async (page, heading, text) => {
  const linkHandlers = await page.$x(selectors.links.headingContains(heading, text))

  if (linkHandlers.length > 0) {
    await linkHandlers[0].click()
  } else {
    throw new Error(`Heading link not found: ${text}`)
  }
}

const getAZElementByHeadingText = async (page, text) => {
  const element = await page.$x(selectors.links.aZDrugListItem(escapeXpathString(text)))

  if (element.length > 0) {
    return element[0]
  } else {
    throw new Error(`AZ Element not found: ${text}`)
  }
}

const getElementBySelector = async (pageSelector) => {
  const element = await scope.context.currentPage.$(pageSelector)
  if (element) {
    return element
  } else {
    throw new Error(`Element not found: ${pageSelector}`)
  }
}

const clickByText = async (page, text) => {
  const escapedText = escapeXpathString(text)
  const linkHandlers = await page.$x(selectors.links.contains(escapedText))

  if (linkHandlers.length > 0) {
    await linkHandlers[0].click()
  } else {
    throw new Error(`Link not found: ${text}`)
  }
}

const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`)
  return `concat("${splitedQuotes}", '')`
}

const isVisibleInPage = async (page, selector) => {
  return await page.evaluate(() => {
    const e = document.querySelector(selector)
    if (!e)
      return false
    const style = window.getComputedStyle(node)
    return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
  })
}
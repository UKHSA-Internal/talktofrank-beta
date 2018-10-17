// Dependencies
const { After, Before, AfterAll } = require('cucumber')
const scope = require('./support/scope')
var fs = require('fs')
var util = require('util')

Before(async () => {
  // You can clean up database models here
})

After(async (scenario) => {

  // Here we check if a scenario has instantiated a browser and a current page
  if (scope.browser && scope.context.currentPage) {

    if (scenario.result.status === 'failed') {
      fs.writeFileSync(`./features/debug/${scenario.pickle.name}.json`, util.inspect(scenario) + util.inspect(scope) , 'utf-8')
      await scope.context.currentPage.screenshot({
        fullPage:true,
        type: "png",
        path: `./features/debug/${scenario.pickle.name}.png`,
        timeout: 120000,
        slowMo: 2000,
        waitUntil: ['load', 'networkidle'],
        networkIdleTimeout: 5000,
      })
    }

    // if it has, find all the cookies, and delete them
    const cookies = await scope.context.currentPage.cookies()
    if (cookies && cookies.length > 0) {
      await scope.context.currentPage.deleteCookie(...cookies)
    }
    // close the web page down
    await scope.context.currentPage.close()
    // wipe the context's currentPage value
    scope.context.currentPage = null
  }
})

AfterAll(async () => {
  // If there is a browser window open, then close it
  if (scope.browser) await scope.browser.close()
})
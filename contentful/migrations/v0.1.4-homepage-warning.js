// https://github.com/contentful/contentful-migration/blob/master/README.md#reference-documentation
module.exports = function(migration) {

  const alertDrugWarning = migration.createContentType('alertDrugWarning')
  alertDrugWarning
    .name('Alert > warning message')
    .description('Show a drug warning message.  Always shows on the homepage, appears as' +
      'a popup alert on all other pages')
    .displayField('alertMessage')

  alertDrugWarning.createField('alertMessage')
    .name('Alert message')
    .type('Symbol')
    .required(true)

  alertDrugWarning.createField('alertMessageLink')
    .name('Alert message - linked item')
    .type('Link')
    .linkType('Entry')
    .validations([
      { "linkContentType": ["news", "drug"] }
    ])

  const alertSiteMessage = migration.createContentType('alertSiteMessage')
  alertSiteMessage
    .name('Alert > site message')
    .description('Show a general site message as a popup on all pages')
    .displayField('alertMessage')

  alertSiteMessage.createField('alertMessage')
    .name('Message')
    .type('Symbol')
    .required(true)

  alertSiteMessage.createField('alertButtonText')
    .name('Button text')
    .type('Symbol')

  alertSiteMessage.changeEditorInterface("alertButtonText", "singleLine", {
    helpText: 'The text used for the call to action'
  });

  alertSiteMessage.createField('alertButtonLabel')
    .name('Button label')
    .type('Symbol')

  alertSiteMessage.changeEditorInterface("alertButtonLabel", "singleLine", {
    helpText: 'The screen reader text used for the call to action'
  });

  alertSiteMessage.createField('alertMessageLink')
    .name('URL')
    .type('Symbol')

  alertSiteMessage.createField('alertDelay')
    .name('Pop up delay')
    .type('Integer')
    .validations([
      { "range": {
          "min": 1,
          "max": 30
        }
      }
    ])

  alertSiteMessage.changeEditorInterface("alertDelay", "numberEditor", {
    helpText: 'Time in seconds to wait before showing the pop up'
  });

  const siteSettings = migration.createContentType('siteSettings')
  siteSettings
    .name('Site settings')
    .description('Create a collection of site settings')
    .displayField('page')

  siteSettings
    .createField('page')
    .name('Page')
    .type('Symbol')
    .required(true)

  siteSettings
    .createField('slug')
    .name('Page url')
    .validations([
      { "unique": true }
    ])
    .type('Symbol')
    .required(true)

  siteSettings.changeEditorInterface("slug", "singleLine", {
    helpText: "The URL of the page to apply these settings to. Do not use '<global>' as this is reserved for sitewide settings."
  });

  siteSettings.createField('alert')
    .name('Page alert')
    .type('Link')
    .linkType('Entry')
    .validations([
      { "linkContentType": ["alertDrugWarning", "alertSiteMessage"] }
    ])

}

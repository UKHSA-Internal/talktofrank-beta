// https://github.com/contentful/contentful-migration/blob/master/README.md#reference-documentation
module.exports = function(migration) {

  const alert = migration.createContentType('alert')
  alert
    .name('Alert')
    .description('Show an alert message')
    .displayField('alertMessage')

  alert.createField('alertMessage')
    .name('Alert message')
    .type('Symbol')

  alert.createField('alertMessageLink')
    .name('Alert message - linked item')
    .type('Link')
    .linkType('Entry')
    .validations([
      { "linkContentType": ["news", "drug"] }
    ])

  alert.createField('alwaysShowOnHomepage')
    .name('Always show on homepage')
    .type('Boolean')
    .required(true)

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
      { "linkContentType": ["alert"] }
    ])

}

// https://github.com/contentful/contentful-migration/blob/master/README.md#reference-documentation
module.exports = function(migration) {
  const homepage = migration.editContentType('homepage')
  homepage.createField('warningMessage')
    .name('Warning message')
    .type('Symbol')

  homepage.createField('warningMessageLink')
    .name('Warning message - linked news item')
    .type('Link')
    .linkType('Entry')
    .validations([
      { "linkContentType": ["news", "drug"] }
    ])

  homepage.moveField('warningMessage').beforeField('featuredNewsItem');
  homepage.moveField('warningMessageLink').beforeField('featuredNewsItem');
};
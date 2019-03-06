// https://github.com/contentful/contentful-migration/blob/master/README.md#reference-documentation
module.exports = function(migration) {
  const video = migration.createContentType('video')
  video
    .name('Video')
    .description('Create an embedded video')
    .displayField('title')

  video
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)

  video
    .createField('embedUrl')
    .name('Embedded video url')
    .type('Symbol')
    .required(true)

  video.changeEditorInterface("embedUrl", "urlEditor");

  const news = migration.editContentType('news')
  news.createField('headerVideo')
    .name('Header video')
    .type('Link')
    .linkType('Entry')
    .validations([
      { "linkContentType": ["video"] }
    ])
  news.moveField('headerVideo').beforeField('summary');
};
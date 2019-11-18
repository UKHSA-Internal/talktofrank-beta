// https://github.com/contentful/contentful-migration/blob/master/README.md#reference-documentation
module.exports = function(migration) {

  const treatmentCentre = migration.editContentType('treatmentCentre');

  treatmentCentre.createField('localAuthority')
    .name('Local authority')
    .type('Symbol');

  treatmentCentre.changeEditorInterface("localAuthority", "singleLine", {
    helpText: 'Enter one or more local authority values separated using a comma.'
  });

}

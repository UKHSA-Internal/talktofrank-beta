// In this example, we fill the "byLine" field with the combined values of 2 other fields.
// We want to skip this transformation for all German entries.

var Xray = require('x-ray')
var x = Xray({
  filters: {
    trim: function(value) {
      return typeof value === 'string' ? value.trim() : value
    },
    extract: function(value) {
      if (typeof value === 'string') {
        const match = value.match(/[a-zA-Z ]*/g);
        return match && match.length ? match[0] : value
      }
      return value
    },
  }
})

module.exports = function (migration) {
  migration.transformEntries({
    contentType: 'treatmentCentre',
    from: ['postCode'],
    to: ['localAuthority'],
    transformEntryForLocale: async function (fromFields, currentLocale) {
      if (!fromFields.postCode || !fromFields.postCode[currentLocale]) {
        return;
      }

      let out = '';
      try {
        out = await x(`https://www.ndtms.org.uk/emids/cgi-bin/ons_locale.cgi?77ca2=8d9bad114a886115bfa499902&pc=${fromFields.postCode[currentLocale].replace(' ', '')}`, {location: 'tr > td:nth-child(2) | extract | trim'});
      } catch(e) {
        console.log(`${fromFields.postCode[currentLocale]} - ERROR`);
      }
      const laValue = out.location ? out.location : '';

      console.log(`${fromFields.postCode[currentLocale]} - ${laValue}`);

      return { localAuthority: laValue };
    }
  });
};

const packageData = require('../../package.json')
const fs = require('fs')
const path = require('path')
const drug = require('./contentTypes/drug')


const contentfulData = {
  "contentTypes": [drug],
  "entries": [],
  "assets": [],
  "locales": [],
  "webhooks": [],
  "roles": [],
  "editorInterfaces": []
}

let data = JSON.stringify(contentfulData, null, 2);

fs.writeFile(path.join(__dirname, `talktofrank-${packageData.version}.json`), data, (err) => {
  if (err) throw err;
  console.log('Data written to file');
  console.log(process.cwd() + `/talktofrank-${packageData.version}.json`);
});

// //
// console.log( JSON.stringify({
//   "contentTypes": [drug, page],
//   "entries": [],
//   "assets": [],
//   "locales": [],
//   "webhooks": [],
//   "roles": [],
//   "editorInterfaces": []
// }))
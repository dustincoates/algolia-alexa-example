const ALGOLIA_APP_ID = `ALGOLIA APP ID`;
const ALGOLIA_API_KEY = `ALGOLIA INDEXING API KEY`;

const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = algolia.initIndex('ted-search');

const { promisify } = require('util');
const fs =  require('fs');
const fsReadFile = promisify(fs.readFile);

(async () => {
  try {
    const resStr = await fsReadFile(`./talks.json`);
    const records = JSON.parse(resStr);

    for (let i = 0; i < records.length; i += 1000) {
      const slice = records.slice(i, i + 1000);
      const indexRes = await index.addObjects(slice);
      console.log(indexRes);
    }

  } catch (e) {
    console.error(e);
  }
})();

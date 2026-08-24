const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const url = 'https://bahamut.smartbiz.in/_next/static/chunks/pages/%5Bstore_uri%5D-7a53626e2c9761ec.js';
  console.log("Fetching store bundle...");
  const content = await fetchUrl(url);
  fs.writeFileSync('scratch/store_bundle.js', content);

  // Search for API paths
  const apiPaths = [...content.matchAll(/["']\/[a-zA-Z0-9_\-\/]*product[a-zA-Z0-9_\-\/]*["']/g)];
  console.log("Found product paths:", apiPaths.map(p => p[0]));
}

run();

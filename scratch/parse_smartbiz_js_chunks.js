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
  const mainHtml = await fetchUrl('https://bahamut.smartbiz.in/');
  const jsChunkMatches = [...mainHtml.matchAll(/src="(\/_next\/static\/chunks\/[^"]+)"/g)].map(m => m[1]);
  console.log("Found JS Chunks:", jsChunkMatches);

  for (const chunkPath of jsChunkMatches) {
    console.log(`Downloading ${chunkPath}...`);
    const jsContent = await fetchUrl(`https://bahamut.smartbiz.in${chunkPath}`);
    // Search for API endpoints, product JSONs, or URLs inside JS
    const apiMatches = [...jsContent.matchAll(/https:\/\/api\.smartbiz\.in\/[a-zA-Z0-9_\-\/]+/g)];
    if (apiMatches.length > 0) {
      console.log(`Found APIs in ${chunkPath}:`, apiMatches.map(a => a[0]));
    }
  }
}

run();

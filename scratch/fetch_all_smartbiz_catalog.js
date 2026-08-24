const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log("Fetching SmartBiz store details...");
  // Let's try SmartBiz API endpoints for bahamut store
  const storeId = "11247"; // from favicon URL smartpos.amazon.in/images/11247/...
  
  // Try fetching store collections/products API
  try {
    const apiRes = await fetchJson('https://api.smartbiz.in/store/bahamut/products');
    console.log("API Res:", apiRes);
  } catch (e) {
    console.log("API failed, parsing HTML Next.js data...");
  }
}

run();

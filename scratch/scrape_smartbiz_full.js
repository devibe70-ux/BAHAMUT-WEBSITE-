const https = require('https');
const fs = require('fs');

function makeRequest(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.smartbiz.in',
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://bahamut.smartbiz.in',
        'Referer': 'https://bahamut.smartbiz.in/'
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', (e) => resolve({ error: e.message }));
    req.end();
  });
}

async function run() {
  const endpoints = [
    '/v1/store/bahamut/catalog',
    '/v1/store/bahamut/products',
    '/v1/stores/11247/products',
    '/v1/store/11247/catalog',
    '/storefront/v1/store/bahamut/products',
    '/api/v1/products?store=bahamut'
  ];

  for (const ep of endpoints) {
    console.log(`Testing endpoint: ${ep}...`);
    const res = await makeRequest(ep);
    console.log(`Status ${res.status}: ${res.body.slice(0, 200)}`);
  }
}

run();

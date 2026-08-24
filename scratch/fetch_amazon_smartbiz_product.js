const https = require('https');
const fs = require('fs');

function fetchUrl(url, headers = {}) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        ...headers
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', (err) => resolve({ error: err.message }));
  });
}

async function run() {
  const productId = '1124702c74f631712060794';
  const endpoints = [
    `https://api.smartbiz.in/catalog/v1/products/${productId}`,
    `https://api.smartbiz.in/v1/products/${productId}`,
    `https://smartpos.amazon.in/api/v1/products/${productId}`,
    `https://bahamut.smartbiz.in/product/${productId}`,
    `https://bahamut.smartbiz.in/products/${productId}`,
    `https://bahamut.smartbiz.in/catalog/products/${productId}`
  ];

  for (const ep of endpoints) {
    console.log(`Checking ${ep}...`);
    const res = await fetchUrl(ep);
    console.log(`Status ${res.status}: ${res.data ? res.data.slice(0, 300) : res.error}`);
    if (res.status === 200 && res.data) {
      fs.writeFileSync(`scratch/product_${productId}.json`, res.data);
    }
  }
}

run();

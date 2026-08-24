const https = require('https');
const fs = require('fs');

function getHtml(urlPath) {
  return new Promise((resolve) => {
    https.get(`https://bahamut.smartbiz.in${urlPath}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const paths = [
    '/',
    '/catalog',
    '/products',
    '/collections',
    '/all',
    '/shop',
    '/search/denim',
    '/search/shirt',
    '/search/pant',
    '/search/tee'
  ];

  for (const p of paths) {
    console.log(`Checking path ${p}...`);
    const html = await getHtml(p);
    const titles = [...html.matchAll(/standardlayout-product-title-text"><span>(.*?)<\/span>/g)].map(m => m[1]);
    const links = [...html.matchAll(/href="(\/product[s]?\/[^"]+)"/g)].map(m => m[1]);
    console.log(`  Titles (${titles.length}):`, titles);
    console.log(`  Links (${links.length}):`, links);
  }
}

run();

const https = require('https');
const http = require('http');

const urls = [
  'https://bahamut.in',
  'https://www.bahamut.in',
  'http://bahamut.in',
  'http://www.bahamut.in',
  'https://bahamut.in/ads.txt',
  'https://bahamut.in/robots.txt',
  'https://bahamut-website.vercel.app'
];

function testUrl(targetUrl, userAgent = 'Mediapartners-Google') {
  return new Promise((resolve) => {
    const client = targetUrl.startsWith('https') ? https : http;
    const req = client.get(targetUrl, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url: targetUrl,
          statusCode: res.statusCode,
          location: res.headers.location || null,
          contentType: res.headers['content-type'],
          contentPreview: data.slice(0, 100).replace(/\n/g, ' ')
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        url: targetUrl,
        error: err.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url: targetUrl,
        error: 'TIMEOUT'
      });
    });
  });
}

async function run() {
  console.log('Testing live endpoints with Google AdSense crawler User-Agent (Mediapartners-Google)...');
  for (const u of urls) {
    const result = await testUrl(u);
    console.log(JSON.stringify(result, null, 2));
  }
}

run();

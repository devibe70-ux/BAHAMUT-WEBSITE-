const https = require('https');

function fetchUrl(targetUrl) {
  return new Promise((resolve) => {
    https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,text/plain,*/*'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url: targetUrl,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          body: data
        });
      });
    }).on('error', (err) => {
      resolve({ url: targetUrl, error: err.message });
    });
  });
}

async function verifyAll() {
  console.log('=== Google AdSense & Search Readiness Audit for https://bahamut.in ===\n');

  // 1. Check ads.txt
  const adsTxt = await fetchUrl('https://bahamut.in/ads.txt');
  console.log('1. ads.txt Check:');
  console.log('   Status Code:', adsTxt.statusCode);
  console.log('   Content-Type:', adsTxt.contentType);
  console.log('   Content:', adsTxt.body ? adsTxt.body.trim() : 'EMPTY');
  const hasPub = adsTxt.body && adsTxt.body.includes('pub-7107715238624071');
  console.log('   Valid Publisher ID in ads.txt:', hasPub ? '✅ YES' : '❌ NO');

  // 2. Check Homepage HTML
  const home = await fetchUrl('https://bahamut.in');
  console.log('\n2. Homepage Check:');
  console.log('   Status Code:', home.statusCode);
  const hasMeta = home.body && home.body.includes('google-adsense-account') && home.body.includes('ca-pub-7107715238624071');
  const hasScript = home.body && home.body.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7107715238624071');
  console.log('   Meta Tag (google-adsense-account):', hasMeta ? '✅ PRESENT' : '❌ MISSING');
  console.log('   AdSense JS Script:', hasScript ? '✅ PRESENT' : '❌ MISSING');

  // 3. Check robots.txt
  const robots = await fetchUrl('https://bahamut.in/robots.txt');
  console.log('\n3. robots.txt Check:');
  console.log('   Status Code:', robots.statusCode);
  const hasMediaPartners = robots.body && robots.body.includes('Mediapartners-Google');
  const hasAdsBot = robots.body && robots.body.includes('AdsBot-Google');
  console.log('   Mediapartners-Google allowed:', hasMediaPartners ? '✅ YES' : '❌ NO');
  console.log('   AdsBot-Google allowed:', hasAdsBot ? '✅ YES' : '❌ NO');

  // 4. Check Mandatory Legal Pages
  const pages = [
    { name: 'Privacy Policy', path: 'https://bahamut.in/privacy-policy' },
    { name: 'Terms & Conditions', path: 'https://bahamut.in/terms-and-conditions' },
    { name: 'Refund Policy', path: 'https://bahamut.in/refund-policy' },
    { name: 'Shipping Policy', path: 'https://bahamut.in/shipping-policy' },
    { name: 'Contact Us', path: 'https://bahamut.in/contact' },
    { name: 'Catalog', path: 'https://bahamut.in/catalog' }
  ];

  console.log('\n4. Mandatory AdSense Policy Pages:');
  for (const p of pages) {
    const res = await fetchUrl(p.path);
    console.log(`   ${p.name} (${p.path}): ${res.statusCode === 200 ? '✅ 200 OK' : '❌ ' + res.statusCode}`);
  }

  console.log('\n=== AUDIT COMPLETE ===');
}

verifyAll();

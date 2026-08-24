const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
  });
}

async function run() {
  const html = await fetchUrl('https://bahamut.smartbiz.in/');
  const buildIdMatch = html.match(/"buildId":"([^"]+)"/);
  console.log("Build ID:", buildIdMatch ? buildIdMatch[1] : "Not found");

  if (buildIdMatch) {
    const buildId = buildIdMatch[1];
    // Fetch Next.js JSON for home page
    const pageJson = await fetchUrl(`https://bahamut.smartbiz.in/_next/data/${buildId}/index.json`);
    console.log("Page JSON length:", pageJson.length);
    console.log("Page JSON snippet:", pageJson.slice(0, 500));
  }
}

run();

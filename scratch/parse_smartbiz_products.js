const https = require('https');
const fs = require('fs');

const url = 'https://bahamut.smartbiz.in';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Search for JSON script tags or next page data
    const match = data.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
    if (match) {
      const json = JSON.parse(match[1]);
      fs.writeFileSync('scratch/smartbiz_next_data.json', JSON.stringify(json, null, 2));
      console.log('Successfully saved NEXT_DATA JSON');
    } else {
      // Find all image URLs and titles in html
      const products = [];
      const titleMatches = [...data.matchAll(/standardlayout-product-title-text"><span>(.*?)<\/span>/g)];
      const priceMatches = [...data.matchAll(/standardlayout-selling-price-text"><span>(.*?)<\/span>/g)];
      const mrpMatches = [...data.matchAll(/standardlayout-compare-price-text"><span>(.*?)<\/span>/g)];
      const imgMatches = [...data.matchAll(/src="([^"]*media-amazon\.com\/images\/X\/bxt1\/M\/[^"]*)"/g)];

      console.log(`Found ${titleMatches.length} title matches`);
      for (let i = 0; i < titleMatches.length; i++) {
        products.push({
          title: titleMatches[i][1],
          price: priceMatches[i] ? priceMatches[i][1] : '',
          mrp: mrpMatches[i] ? mrpMatches[i][1] : '',
          img: imgMatches[i] ? imgMatches[i][1] : ''
        });
      }
      fs.writeFileSync('scratch/extracted_products.json', JSON.stringify(products, null, 2));
      console.log(JSON.stringify(products, null, 2));
    }
  });
}).on('error', err => {
  console.error('Error fetching SmartBiz:', err);
});

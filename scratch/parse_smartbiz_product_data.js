const fs = require('fs');

const fileContent = fs.readFileSync('scratch/product_1124702c74f631712060794.json', 'utf-8');

console.log("Analyzing saved HTML/JSON content for product 1124702c74f631712060794...");

// Extract JSON script blocks
const jsonLdMatches = [...fileContent.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
jsonLdMatches.forEach((m, idx) => {
  console.log(`--- JSON LD #${idx + 1} ---`);
  console.log(m[1].slice(0, 1000));
});

// Extract og:title, og:image, og:description
const ogTitle = fileContent.match(/<meta property="og:title" content="([^"]+)"/);
const ogImage = fileContent.match(/<meta property="og:image" content="([^"]+)"/);
const ogDesc = fileContent.match(/<meta property="og:description" content="([^"]+)"/);

console.log("OG Title:", ogTitle ? ogTitle[1] : "None");
console.log("OG Image:", ogImage ? ogImage[1] : "None");
console.log("OG Desc:", ogDesc ? ogDesc[1] : "None");

// Search for prices
const prices = [...fileContent.matchAll(/₹\s*(\d+)/g)];
console.log("Found prices:", prices.map(p => p[1]));

// Search for image URLs
const images = [...new Set(fileContent.match(/https:\/\/m\.media-amazon\.com\/images\/X\/[^\s"']+/g))];
console.log("Found Media Images:", images);

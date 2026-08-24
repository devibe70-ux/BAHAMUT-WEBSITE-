const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\LW-160726-02\\.gemini\\antigravity\\brain\\1c2f7578-5155-4492-adba-62817ad2701e\\.system_generated\\steps\\2032\\content.md', 'utf-8');

// Search for product titles, prices, images, slugs
console.log("Searching for product data...");

// Let's find images from media-amazon.com
const mediaImages = [...new Set(content.match(/https:\/\/m\.media-amazon\.com\/images\/X\/[^\s"']+/g))];
console.log("Media Images Found:", mediaImages);

// Let's find all text blocks containing product titles
const titles = [...content.matchAll(/BahaMut[^\x00-\x1F<>"'\\]+/g)];
console.log("BahaMut product mentions:", titles.map(t => t[0]).slice(0, 20));

const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\LW-160726-02\\.gemini\\antigravity\\brain\\1c2f7578-5155-4492-adba-62817ad2701e\\.system_generated\\steps\\2032\\content.md', 'utf-8');

// Find all occurrences of product names, prices, tags, images
const matches = content.match(/<p[^>]*data-testid="standardlayout-product-title-text"[^>]*>(.*?)<\/p>/g);
console.log("Product title tags:", matches);

const allPrices = content.match(/standardlayout-selling-price-text"><span>₹?(\d+)<\/span>/g);
console.log("All Selling Prices:", allPrices);

const allMrps = content.match(/standardlayout-compare-price-text"><span>₹?(\d+)<\/span>/g);
console.log("All Compare MRPs:", allMrps);

// Let's dump all text inside standardlayout-product-title-text
const reg = /standardlayout-product-title-text"><span>(.*?)<\/span>/g;
let m;
while ((m = reg.exec(content)) !== null) {
  console.log("FOUND TITLE:", m[1]);
}

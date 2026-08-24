const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToDownload = [
  {
    url: 'https://m.media-amazon.com/images/X/bxt1/M/Vbxt1xFDXEjlWBe.jpg',
    filename: 'bahamut-22-2-selvedge-denim-1.jpg'
  },
  {
    url: 'https://m.media-amazon.com/images/X/bxr1/M/qbxr1BFTrxlNxfw.png',
    filename: 'bahamut-draconic-heavyweight-tee-1.png'
  },
  {
    url: 'https://m.media-amazon.com/images/X/bxt1/M/Ubxt1x80pnvjc39.png',
    filename: 'blood-flame-oversized-hoodie-1.png'
  },
  {
    url: 'https://m.media-amazon.com/images/X/bxt1/M/sbxt1RP-UepvYiL.png',
    filename: 'ahmedabad-woven-chambray-navy-1.png'
  },
  {
    url: 'https://m.media-amazon.com/images/X/bxt1/M/Bbxt1B3FxSrjYxn.png',
    filename: 'cyber-street-graffiti-oversized-tee-1.png'
  },
  {
    url: 'https://m.media-amazon.com/images/X/bxr1/M/Zbxr1huj0kqNi8k.png',
    filename: 'textured-oxford-solid-khaki-1.png'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Failed to download ${url}: Status ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading product images to local directory public/images/products/...');
  for (const item of imagesToDownload) {
    const destPath = path.join(targetDir, item.filename);
    try {
      await downloadFile(item.url, destPath);
      console.log(`✅ Saved ${item.filename} (${fs.statSync(destPath).size} bytes)`);
    } catch (err) {
      console.error(`❌ Failed ${item.filename}:`, err.message);
    }
  }
  console.log('Finished downloading all local product media!');
}

run();

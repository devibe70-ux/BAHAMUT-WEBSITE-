const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const feedProducts = [
  {
    id: '1124702c74f631712060794',
    filename: 'bahamut-21-1.jpg',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYSBmdJrv2t5kNVTNjThY3ndV2OPYOMhY2jzPBV27wox2DeHO'
  },
  {
    id: '1124742c74f681712061497',
    filename: 'bahamut-21-2.jpg',
    url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSA9l5lKwwu5ZSf5ybJY6wbLCw_55J1AauWyGCNZU2eUO6Wwglf'
  },
  {
    id: '1124718c74f6a1712061725',
    filename: 'bahamut-21-3.jpg',
    url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4BD5xSVZbTTPZF0YfsDUHnlXGzxcwPPNhzs0lsY5XB1efOb4L'
  },
  {
    id: '112477ec755421712257777',
    filename: 'bahamut-22-1-selvedge.jpg',
    url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRna6AI5Mus0d4QgHJ8VdA-jOt9_lrCi7zoL1eBNaFYU3hVLdoF'
  },
  {
    id: '1124702c755461712258316',
    filename: 'bahamut-22-2-selvedge.jpg',
    url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcStIOrcEmk1Go6TVsJViN64gj0DT-Pq4pEV9PhxWwmvK6epG9mQ'
  },
  {
    id: '11247a2c84b341720510327',
    filename: 'bahamut-23-selvedge.jpg',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBmlwWUDbgYUXJ6t26eDWTUzrgfK5isNhbkTLoiB4aZBl3c-W'
  },
  {
    id: '11247e2c84b371720510811',
    filename: 'bahamut-24-black-denim.jpg',
    url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCND_G3IlaHr0qDFS1w6-XGuryzxEUupBUyAXd4rIM_TIBuiBb'
  },
  {
    id: '112476cc84b431720512288',
    filename: 'bahamut-25-white-denim.jpg',
    url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS4WMSYAz-8v7Ku4t8cyuwJ5SYW_cE0BwxN3CFNSbY-SgCaZFi3'
  },
  {
    id: '112478ec8a7ff1723623935',
    filename: 'bahamut-26-raw-denim.jpg',
    url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_AZ73G3gpjxKceRjmLTg0hbJhdpIH808OO6GUeZFl-A82kNHO'
  },
  {
    id: '11247ecc862681721289006',
    filename: 'bahamut-27-1-denim.jpg',
    url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRIY3mZZqiLrnV5lOrt7G00g0YlCCFKiYK1UbSDF_jWsdYyS26U'
  },
  {
    id: '11247d6c85fa21721195834',
    filename: 'bahamut-28-1-lycra.jpg',
    url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGK7XbzL6rxDlW7y-09_UW_k9eUz08mITQh-eSAHDbouj7qM4M'
  },
  {
    id: '11247b0c85fa41721196128',
    filename: 'bahamut-28-2-lycra.jpg',
    url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRsZ7Boj_iQL-e7mAlu4oTb8JauKxBXyG3QiGBXqdEKeRO4OXeh'
  },
  {
    id: '11247eec8a8041723624638',
    filename: 'bahamut-31-1-denim.jpg',
    url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8DuMi0O9RJ9QGsTYLO40yRvuYs1ILPcMfIa_GEexzriTd89JM'
  },
  {
    id: '11247eec8a8061723624967',
    filename: 'bahamut-31-2-denim.jpg',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0nfdd0isZyHHHLsWKzyRBuY1-E7KviQB4Z30lAlIwU607qct'
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
        file.on('finish', () => file.close(resolve));
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Status ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading all 14 unique product images from CSV feed...');
  for (const item of feedProducts) {
    const destPath = path.join(targetDir, item.filename);
    try {
      await downloadFile(item.url, destPath);
      console.log(`✅ Saved ${item.filename} (${fs.statSync(destPath).size} bytes)`);
    } catch (err) {
      console.error(`❌ Failed ${item.filename}:`, err.message);
    }
  }
  console.log('Finished downloading all 14 unique product images!');
}

run();

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const src = path.join(distDir, 'index.html');
const dest = path.join(distDir, '404.html');

if (!fs.existsSync(src)) {
  console.error('❌ dist/index.html not found. Run the build first.');
  process.exit(1);
}

try {
  fs.copyFileSync(src, dest);
  console.log('✅ Copied index.html to 404.html');
} catch (err) {
  console.error('❌ Failed to copy index.html to 404.html', err);
  process.exit(1);
}

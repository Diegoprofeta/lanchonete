import fs from 'fs';

if (fs.existsSync('index.html.src')) {
  fs.copyFileSync('index.html.src', 'index.html');
  console.log('Successfully restored source index.html for local development!');
} else {
  console.error('Error: No index.html.src backup found. Cannot restore.');
}

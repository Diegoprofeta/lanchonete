import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 1. Check and backup source index.html
if (fs.existsSync('index.html')) {
  const content = fs.readFileSync('index.html', 'utf-8');
  if (content.includes('src/main.tsx')) {
    console.log('Backing up source index.html to index.html.src...');
    fs.writeFileSync('index.html.src', content);
  } else if (fs.existsSync('index.html.src')) {
    console.log('Restoring index.html from backup before building...');
    fs.copyFileSync('index.html.src', 'index.html');
  } else {
    console.error('Error: index.html is already a built file, and no index.html.src backup was found!');
    process.exit(1);
  }
} else if (fs.existsSync('index.html.src')) {
  fs.copyFileSync('index.html.src', 'index.html');
} else {
  console.error('Error: index.html not found!');
  process.exit(1);
}

// 2. Run standard build (outputs to docs)
console.log('Running Vite build...');
execSync('npm run build', { stdio: 'inherit' });

// 3. Copy compiled assets and index.html to the root directory
console.log('Deploying compiled files to project root...');

// Copy assets directory if it exists in docs
if (fs.existsSync('docs/assets')) {
  if (!fs.existsSync('assets')) {
    fs.mkdirSync('assets', { recursive: true });
  }
  const assetFiles = fs.readdirSync('docs/assets');
  for (const file of assetFiles) {
    fs.copyFileSync(path.join('docs/assets', file), path.join('assets', file));
  }
}

// Copy index.html from docs to the root
if (fs.existsSync('docs/index.html')) {
  fs.copyFileSync('docs/index.html', 'index.html');
  console.log('Built index.html successfully copied to root!');
}

console.log('\n--- BUILD TO ROOT SUCCESSFUL ---');
console.log('The root index.html is now the BUILT version ready for GitHub Pages.');
console.log('To resume local development, run: npm run restore:src');

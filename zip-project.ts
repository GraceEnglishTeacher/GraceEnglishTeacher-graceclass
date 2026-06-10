import AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';

async function createZip() {
  const zip = new AdmZip();

  // Selected files from root directory to package
  const rootFiles = [
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'vite.config.ts',
    'index.html',
    '.env.example',
    '.gitignore',
    'metadata.json'
  ];

  console.log('Starting to package files...');

  for (const file of rootFiles) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      zip.addLocalFile(filePath);
      console.log(`Added root file: ${file}`);
    }
  }

  // Package the whole src directory recursively
  const srcPath = path.join(process.cwd(), 'src');
  if (fs.existsSync(srcPath)) {
    zip.addLocalFolder(srcPath, 'src');
    console.log('Added src/ directory recursively');
  }

  // Ensure public directory exists so Vite can serve it
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const outputPath = path.join(publicDir, 'project.zip');
  zip.writeZip(outputPath);
  console.log(`\nZIP Archive successfully created at: ${outputPath}`);
}

createZip().catch(console.error);

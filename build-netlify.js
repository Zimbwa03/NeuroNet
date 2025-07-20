#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Building for Netlify deployment...');

// Build the frontend
console.log('📦 Building frontend...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Frontend build completed');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

// Copy _redirects to dist/public
console.log('📝 Copying redirect rules...');
try {
  fs.copyFileSync('_redirects', 'dist/public/_redirects');
  console.log('✅ Redirect rules copied');
} catch (error) {
  console.warn('⚠️  Could not copy _redirects file:', error.message);
}

// Create netlify functions directory
const functionsDir = path.join(__dirname, 'dist', 'functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

// Build the serverless functions
console.log('⚡ Building serverless functions...');
try {
  // Build main API function
  execSync(`npx esbuild netlify/functions/api.ts --bundle --platform=node --target=node18 --format=esm --outdir=dist/functions --external:@neondatabase/serverless --external:ws --external:drizzle-orm --external:@supabase/supabase-js`, { stdio: 'inherit' });
  
  // Build individual contact function
  execSync(`npx esbuild netlify/functions/contact.ts --bundle --platform=node --target=node18 --format=esm --outdir=dist/functions --external:@neondatabase/serverless --external:ws --external:drizzle-orm --external:@supabase/supabase-js`, { stdio: 'inherit' });
  
  console.log('✅ Serverless functions built');
} catch (error) {
  console.error('❌ Function build failed:', error.message);
  process.exit(1);
}

console.log('🎉 Netlify build completed successfully!');
console.log('📁 Files ready in: dist/public (frontend) and dist/functions (API)');
console.log('🔗 Deploy to Netlify with these settings:');
console.log('   - Build command: node build-netlify.js');
console.log('   - Publish directory: dist/public');
console.log('   - Functions directory: dist/functions');
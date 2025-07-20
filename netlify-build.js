const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build the frontend
console.log('Building frontend...');
execSync('npm run build', { stdio: 'inherit' });

// Create netlify functions directory if it doesn't exist
const functionsDir = path.join(__dirname, 'dist', 'functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

// Build the serverless function
console.log('Building serverless functions...');
execSync(`npx esbuild netlify/functions/api.ts --bundle --platform=node --target=node18 --format=esm --outdir=dist/functions --external:@neondatabase/serverless --external:ws --external:drizzle-orm`, { stdio: 'inherit' });

console.log('Netlify build completed successfully!');
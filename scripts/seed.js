import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run the seed script
try {
  console.log('🌱 Running database seed script...');
  execSync('node lib/seed-data.js', { 
    cwd: join(__dirname, '..'),
    stdio: 'inherit'
  });
} catch (error) {
  console.error('❌ Error running seed script:', error.message);
  process.exit(1);
}
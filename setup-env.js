#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment variables for Cloudinary integration...\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  .env.local already exists. Please check if it contains the required variables.\n');
} else {
  console.log('📝 Creating .env.local file...\n');
}

// Template for .env.local
const envTemplate = `# Cloudinary Configuration
# Get these from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# MongoDB Configuration
# Use either MONGODB_URI or MONGO_URL
MONGODB_URI=your_mongodb_connection_string_here
# MONGO_URL=your_mongodb_connection_string_here

# NextAuth Configuration (if using authentication)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development
`;

if (!envExists) {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ .env.local file created successfully!\n');
}

console.log('📋 Required Environment Variables:\n');
console.log('1. CLOUDINARY_CLOUD_NAME - Your Cloudinary cloud name');
console.log('2. CLOUDINARY_API_KEY - Your Cloudinary API key');
console.log('3. CLOUDINARY_API_SECRET - Your Cloudinary API secret');
console.log('4. MONGODB_URI - Your MongoDB connection string\n');

console.log('🔗 Steps to get Cloudinary credentials:');
console.log('1. Go to https://cloudinary.com and sign up/login');
console.log('2. Go to your Dashboard');
console.log('3. Copy your Cloud Name, API Key, and API Secret');
console.log('4. Paste them in your .env.local file\n');

console.log('🧪 Test your setup:');
console.log('1. Start your development server: npm run dev');
console.log('2. Visit: http://localhost:3000/api/test-cloudinary');
console.log('3. Check if all environment variables are set correctly\n');

if (envExists) {
  console.log('📖 Your .env.local file is located at:', envPath);
  console.log('   Please update it with your actual credentials.\n');
} else {
  console.log('📖 Your .env.local file has been created at:', envPath);
  console.log('   Please update it with your actual credentials.\n');
}

console.log('🚀 After setting up the environment variables, restart your development server!');

#!/bin/bash

# Welding Website Deployment Script
# This script helps you deploy your website to GitHub and Vercel

echo "🚀 Welding Website Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Please add your GitHub repository URL:"
    echo "Example: https://github.com/yourusername/weldingwebsite.git"
    read -p "GitHub URL: " github_url
    
    if [ ! -z "$github_url" ]; then
        git remote add origin "$github_url"
        echo "✅ Remote origin added: $github_url"
    else
        echo "❌ No URL provided. Please add remote manually:"
        echo "git remote add origin YOUR_GITHUB_URL"
        exit 1
    fi
else
    echo "✅ Remote origin already configured"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo ""
    echo "⚠️  Warning: .env.local file not found!"
    echo "Please create it with your environment variables:"
    echo ""
    echo "MONGO_URL=your_mongodb_connection_string"
    echo "CLOUDINARY_CLOUD_NAME=your_cloud_name"
    echo "CLOUDINARY_API_KEY=your_api_key"
    echo "CLOUDINARY_API_SECRET=your_api_secret"
    echo ""
    read -p "Press Enter after creating .env.local file..."
fi

# Build the project
echo ""
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

# Git operations
echo ""
echo "📝 Committing changes..."
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "❌ Failed to push to GitHub. Please check your credentials."
    exit 1
fi

echo ""
echo "🎉 Deployment to GitHub completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Sign up/Login with GitHub"
echo "3. Import your repository"
echo "4. Add environment variables"
echo "5. Deploy!"
echo ""
echo "🔗 Your GitHub repository: $(git remote get-url origin)"
echo ""
echo "Happy Deploying! 🚀"

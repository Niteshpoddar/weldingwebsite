@echo off
chcp 65001 >nul
echo 🚀 Welding Website Deployment Script
echo ==================================

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo 🔗 Please add your GitHub repository URL:
    echo Example: https://github.com/yourusername/weldingwebsite.git
    set /p github_url="GitHub URL: "
    
    if not "%github_url%"=="" (
        git remote add origin "%github_url%"
        echo ✅ Remote origin added: %github_url%
    ) else (
        echo ❌ No URL provided. Please add remote manually:
        echo git remote add origin YOUR_GITHUB_URL
        pause
        exit /b 1
    )
) else (
    echo ✅ Remote origin already configured
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo.
    echo ⚠️  Warning: .env.local file not found!
    echo Please create it with your environment variables:
    echo.
    echo MONGO_URL=your_mongodb_connection_string
    echo CLOUDINARY_CLOUD_NAME=your_cloud_name
    echo CLOUDINARY_API_KEY=your_api_key
    echo CLOUDINARY_API_SECRET=your_api_secret
    echo.
    pause
)

REM Build the project
echo.
echo 🔨 Building the project...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed! Please fix errors and try again.
    pause
    exit /b 1
) else (
    echo ✅ Build successful!
)

REM Git operations
echo.
echo 📝 Committing changes...
git add .
git commit -m "Deploy: %date% %time%"

echo.
echo 📤 Pushing to GitHub...
git push origin main

if errorlevel 1 (
    echo ❌ Failed to push to GitHub. Please check your credentials.
    pause
    exit /b 1
) else (
    echo ✅ Successfully pushed to GitHub!
)

echo.
echo 🎉 Deployment to GitHub completed successfully!
echo.
echo 📋 Next steps:
echo 1. Go to https://vercel.com
echo 2. Sign up/Login with GitHub
echo 3. Import your repository
echo 4. Add environment variables
echo 5. Deploy!
echo.
echo Happy Deploying! 🚀
pause

@echo off
echo 🚀 Starting deployment process...

echo 📦 Installing dependencies...
call npm ci

echo 🔨 Building the project...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build completed successfully!
    echo 📁 Static files are ready in the 'out' directory
    echo 🌐 Ready for Netlify deployment!
) else (
    echo ❌ Build failed!
    exit /b 1
)
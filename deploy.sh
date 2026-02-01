#!/bin/bash

# Deployment script for Netlify
echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Static files are ready in the 'out' directory"
    echo "🌐 Ready for Netlify deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi
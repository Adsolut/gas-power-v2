#!/bin/bash

# Deploy script for Gas-Power-Compara v2.0 Marketing Strategy
# This script builds and deploys the project with v2.0 features enabled

echo "🚀 Deploying Gas-Power-Compara v2.0 Marketing Strategy..."

# Set environment variables for v2.0
export VITE_STRATEGY_VERSION="2.0"
export VITE_ENABLE_V2_FEATURES="true"
export VITE_POWER_PRO_ENABLED="true"

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run build with v2.0 optimizations
echo "🔨 Building v2.0 optimized version..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to server (modify based on your deployment method)
    echo "📡 Deploying to production..."
    
    # Option 1: FTP Deploy (if using existing script)
    if [ -f "ftp-deploy.sh" ]; then
        chmod +x ftp-deploy.sh
        ./ftp-deploy.sh
    fi
    
    # Option 2: Custom deployment
    # rsync -avz dist/ user@server:/path/to/webroot/
    
    echo "🎉 v2.0 Marketing Strategy deployed successfully!"
    echo "📊 Monitor analytics at: https://yoursite.com/analytics-v2"
    
else
    echo "❌ Build failed! Please check errors above."
    exit 1
fi

# Run post-deployment checks
echo "🔍 Running post-deployment checks..."

# Check if v2.0 components are accessible
echo "- Checking v2.0 components..."
if [ -f "dist/assets/"*.js ]; then
    echo "  ✅ JavaScript bundles created"
fi

if [ -f "dist/index.html" ]; then
    echo "  ✅ HTML generated"
fi

# Display deployment summary
echo ""
echo "📋 Deployment Summary:"
echo "   Strategy Version: v2.0"
echo "   Features: Hero v2.0, Power Pro Marketing, Enhanced Tracking"
echo "   Build Size: $(du -sh dist/ | cut -f1)"
echo "   Deploy Time: $(date)"
echo ""
echo "🎯 Key URLs to test:"
echo "   - Homepage: https://yoursite.com/"
echo "   - Analytics: https://yoursite.com/analytics-v2"
echo "   - Admin: https://yoursite.com/admin"
echo ""
echo "📈 Monitor these metrics:"
echo "   - Power Pro interest rate"
echo "   - Hero v2.0 engagement"
echo "   - Waitlist conversion"
echo "   - Call volume from new strategy"
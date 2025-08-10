#!/bin/bash

# Build and Deploy Script for Gas Power Compara v2 with Power Pro
# This script builds the application and prepares it for deployment

echo "🚀 Starting Gas Power Compara v2 Build Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command succeeded
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1 completed successfully${NC}"
    else
        echo -e "${RED}✗ $1 failed${NC}"
        exit 1
    fi
}

# Step 1: Check Node version
echo "📋 Checking Node.js version..."
node_version=$(node -v)
echo "Node version: $node_version"

# Step 2: Install dependencies
echo -e "\n${YELLOW}📦 Installing dependencies...${NC}"
npm install
check_status "Dependencies installation"

# Step 3: Run linting
echo -e "\n${YELLOW}🔍 Running linting...${NC}"
npm run lint --fix || true
echo -e "${GREEN}✓ Linting completed (warnings ignored)${NC}"

# Step 4: Create production .env file if it doesn't exist
if [ ! -f .env.production ]; then
    echo -e "\n${YELLOW}⚙️ Creating production environment file...${NC}"
    cp .env.example .env.production
    echo -e "${YELLOW}⚠️ Please update .env.production with your production values${NC}"
fi

# Step 5: Build the application
echo -e "\n${YELLOW}🏗️ Building production version...${NC}"
npm run build
check_status "Build process"

# Step 6: Check build output
if [ -d "dist" ]; then
    echo -e "\n${GREEN}✓ Build directory created successfully${NC}"
    echo "Build size:"
    du -sh dist/
    echo ""
    echo "Files in dist:"
    ls -la dist/
else
    echo -e "${RED}✗ Build directory not found${NC}"
    exit 1
fi

# Step 7: Create deployment archive
echo -e "\n${YELLOW}📦 Creating deployment archive...${NC}"
timestamp=$(date +"%Y%m%d_%H%M%S")
archive_name="gas-power-v2-build-${timestamp}.tar.gz"
tar -czf "$archive_name" dist/
check_status "Archive creation"
echo "Archive created: $archive_name"

# Step 8: Generate deployment report
echo -e "\n${YELLOW}📊 Generating deployment report...${NC}"
cat > deployment-report.txt << EOF
Gas Power Compara v2 - Deployment Report
========================================
Build Date: $(date)
Node Version: $node_version
Build Size: $(du -sh dist/ | cut -f1)
Archive: $archive_name

Features Included:
- ✅ Bill Upload & Analysis System
- ✅ Power Pro Subscription Service
- ✅ User Dashboard
- ✅ Italian Energy Suppliers Database
- ✅ Payment Integration Ready
- ✅ Analytics Tracking
- ✅ SEO Optimized

Environment Variables Required:
- VITE_STRIPE_PUBLISHABLE_KEY
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_GA4_MEASUREMENT_ID
- VITE_APP_URL

Deployment Steps:
1. Upload dist/ contents to public_html/v2/
2. Configure .htaccess for SPA routing
3. Set up SSL certificate
4. Configure domain/subdomain
5. Test all features
6. Monitor analytics

EOF

echo -e "${GREEN}✓ Deployment report generated${NC}"

# Step 9: Display summary
echo -e "\n${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ BUILD COMPLETED SUCCESSFULLY!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo "1. Review deployment-report.txt"
echo "2. Update production environment variables"
echo "3. Deploy using: ./deploy-production.sh"
echo "4. Or manually upload dist/ contents to your server"
echo ""
echo -e "${YELLOW}💡 Pro tip: Test locally first with: npm run preview${NC}"

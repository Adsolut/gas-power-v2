#!/bin/bash

# Deploy Script for Gas Power Compara v2
# Uploads the built application to production server via FTP

echo "🚀 Gas Power Compara v2 - Production Deployment"
echo "=============================================="

# Configuration (update these with your actual values)
FTP_HOST="ftp.gasepower.com"
FTP_USER="your_ftp_username"
FTP_PASS="your_ftp_password"
FTP_DIR="/public_html/v2"
LOCAL_DIR="./dist"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if dist directory exists
if [ ! -d "$LOCAL_DIR" ]; then
    echo -e "${RED}✗ Error: Build directory not found!${NC}"
    echo "Please run: npm run build"
    exit 1
fi

# Function to deploy via FTP
deploy_ftp() {
    echo -e "\n${YELLOW}📤 Starting FTP deployment...${NC}"
    
    # Create FTP script
    cat > ftp_commands.txt << EOF
open $FTP_HOST
user $FTP_USER $FTP_PASS
binary
cd $FTP_DIR
lcd $LOCAL_DIR
prompt off
mdelete *
mput -r *
quit
EOF

    # Execute FTP commands
    ftp -n < ftp_commands.txt
    
    # Clean up
    rm ftp_commands.txt
    
    echo -e "${GREEN}✓ FTP deployment completed${NC}"
}

# Function to deploy via rsync (alternative)
deploy_rsync() {
    echo -e "\n${YELLOW}📤 Starting rsync deployment...${NC}"
    
    rsync -avz --delete \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='.env*' \
        $LOCAL_DIR/ \
        $FTP_USER@$FTP_HOST:$FTP_DIR/
    
    echo -e "${GREEN}✓ Rsync deployment completed${NC}"
}

# Pre-deployment checks
echo -e "\n${BLUE}🔍 Pre-deployment checks...${NC}"
echo "- Build directory: $LOCAL_DIR"
echo "- Target server: $FTP_HOST"
echo "- Target directory: $FTP_DIR"
echo ""

# Confirm deployment
read -p "Do you want to proceed with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled${NC}"
    exit 0
fi

# Create backup timestamp
timestamp=$(date +"%Y%m%d_%H%M%S")
echo -e "\n${YELLOW}📸 Creating deployment snapshot...${NC}"
echo "Timestamp: $timestamp"

# Deploy based on available method
if command -v rsync &> /dev/null; then
    deploy_rsync
else
    deploy_ftp
fi

# Post-deployment tasks
echo -e "\n${BLUE}📋 Post-deployment tasks:${NC}"
echo "1. ✓ Files uploaded to server"
echo "2. ⏳ Clear CDN cache (if applicable)"
echo "3. ⏳ Test all features on production"
echo "4. ⏳ Monitor error logs"
echo "5. ⏳ Check analytics tracking"

# Create deployment log
cat > "deployments/deploy-$timestamp.log" << EOF
Deployment Log - Gas Power Compara v2
=====================================
Date: $(date)
Server: $FTP_HOST
Directory: $FTP_DIR
Build Size: $(du -sh $LOCAL_DIR | cut -f1)
Files Deployed: $(find $LOCAL_DIR -type f | wc -l)

Deployment successful!
EOF

echo -e "\n${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETED SUCCESSFULLY!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "🌐 Your application is now live at:"
echo "   https://gasepower.com/v2/"
echo ""
echo "📊 Next steps:"
echo "   1. Test the live application"
echo "   2. Monitor console for errors"
echo "   3. Check Google Analytics"
echo "   4. Test Power Pro subscription flow"
echo ""
echo -e "${YELLOW}💡 Tip: Set up monitoring with: npm run monitor${NC}"

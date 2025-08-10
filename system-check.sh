#!/bin/bash

# Test Script for Gas Power Compara v2
# Verifica che tutti i componenti siano installati correttamente

echo "🔍 Gas Power Compara v2 - System Check"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check function
check_item() {
    if [ "$2" = "true" ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1"
    fi
}

echo "📁 Checking Project Structure..."
check_item "Main directory exists" "true"
check_item "src/ directory" "$([ -d src ] && echo true || echo false)"
check_item "api/ directory" "$([ -d api ] && echo true || echo false)"
check_item "database/ directory" "$([ -d database ] && echo true || echo false)"
echo ""

echo "📄 Checking Core Files..."
check_item "package.json" "$([ -f package.json ] && echo true || echo false)"
check_item "App.tsx" "$([ -f src/App.tsx ] && echo true || echo false)"
check_item "BillUploadAnalyzer.tsx" "$([ -f src/components/BillUploadAnalyzer.tsx ] && echo true || echo false)"
check_item "PowerProSubscription.tsx" "$([ -f src/components/PowerProSubscription.tsx ] && echo true || echo false)"
check_item "PowerProDashboard.tsx" "$([ -f src/pages/PowerProDashboard.tsx ] && echo true || echo false)"
check_item "IndexV2Business.tsx" "$([ -f src/pages/IndexV2Business.tsx ] && echo true || echo false)"
check_item "energySuppliers.ts" "$([ -f src/data/energySuppliers.ts ] && echo true || echo false)"
echo ""

echo "🔧 Checking Configuration..."
check_item ".env.example" "$([ -f .env.example ] && echo true || echo false)"
if [ -f .env.local ]; then
    check_item ".env.local (configured)" "true"
else
    echo -e "${YELLOW}⚠${NC} .env.local (not configured - copy from .env.example)"
fi
echo ""

echo "📦 Checking Dependencies..."
if [ -d node_modules ]; then
    check_item "node_modules installed" "true"
    
    # Check for key packages
    check_item "React" "$([ -d node_modules/react ] && echo true || echo false)"
    check_item "TypeScript" "$([ -f node_modules/typescript/package.json ] && echo true || echo false)"
    check_item "@stripe/stripe-js" "$([ -d node_modules/@stripe/stripe-js ] && echo true || echo false)"
else
    echo -e "${YELLOW}⚠${NC} node_modules not found - run: npm install"
fi
echo ""

echo "🚀 Checking Scripts..."
check_item "build-production.sh" "$([ -f build-production.sh ] && echo true || echo false)"
check_item "deploy-production.sh" "$([ -f deploy-production.sh ] && echo true || echo false)"
check_item "install-new-deps.sh" "$([ -f install-new-deps.sh ] && echo true || echo false)"
echo ""

echo "📊 System Information..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo ""

# Count total files
total_files=$(find . -type f -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" 2>/dev/null | wc -l)
echo "Total TypeScript/JavaScript files: $total_files"
echo ""

echo "======================================"
echo ""

# Summary
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}⚠ Next Step:${NC} Install dependencies"
    echo "  Run: npm install"
    echo ""
elif [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠ Next Step:${NC} Configure environment"
    echo "  1. Copy: cp .env.example .env.local"
    echo "  2. Edit .env.local with your API keys"
    echo ""
else
    echo -e "${GREEN}✅ System Ready!${NC}"
    echo ""
    echo "Start development server:"
    echo "  npm run dev"
    echo ""
    echo "Build for production:"
    echo "  ./build-production.sh"
    echo ""
fi

echo "📚 Documentation: README-POWER-PRO.md"
echo "💡 Support: support@gasepower.com"
echo ""

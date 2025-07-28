#!/bin/bash

# Test script for Gas-Power-Compara v2.0 Marketing Strategy
# Validates that all v2.0 components and features work correctly

echo "🧪 Testing Gas-Power-Compara v2.0 Marketing Strategy..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "${BLUE}Testing: ${test_name}${NC}"
    
    if eval "$test_command"; then
        echo -e "${GREEN}✅ PASS: ${test_name}${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAIL: ${test_name}${NC}"
    fi
    echo ""
}

# Start testing
echo "🚀 Starting v2.0 component tests..."
echo ""

# Test 1: Check if v2.0 components exist
run_test "v2.0 Components Exist" "[ -f 'src/components/v2/HeroSectionV2.tsx' ] && [ -f 'src/components/v2/PowerProPresentation.tsx' ]"

# Test 2: Check if tracking utilities exist
run_test "Tracking Utilities Exist" "[ -f 'src/utils/v2/trackingManager.ts' ] && [ -f 'src/hooks/usePowerProLeads.ts' ]"

# Test 3: Check if analytics dashboard exists
run_test "Analytics Dashboard Exists" "[ -f 'src/components/v2/AnalyticsDashboard.tsx' ] && [ -f 'src/pages/AnalyticsV2.tsx' ]"

# Test 4: Check if project builds successfully
run_test "Project Builds Successfully" "npm run build > /dev/null 2>&1"

# Test 5: Check if required dependencies are installed
run_test "Dependencies Installed" "[ -d 'node_modules' ] && npm list lucide-react > /dev/null 2>&1"

# Test 6: Check if main entry point is updated
run_test "Main Entry Updated" "grep -q 'HeroSectionV2' src/pages/Index.tsx && grep -q 'PowerProPresentation' src/pages/Index.tsx"

# Test 7: Check if App.tsx has analytics route
run_test "Analytics Route Added" "grep -q 'AnalyticsV2' src/App.tsx"

# Test 8: Validate TypeScript compilation
run_test "TypeScript Compilation" "npx tsc --noEmit > /dev/null 2>&1"

# Test 9: Check if documentation exists
run_test "v2.0 Documentation Exists" "[ -f 'docs/STRATEGIC_EVOLUTION_v2.0.md' ] && [ -f 'docs/MARKETING_IMPLEMENTATION_v2.0.md' ]"

# Test 10: Lint check
run_test "ESLint Passes" "npm run lint > /dev/null 2>&1"

# Summary
echo "📊 Test Results Summary:"
echo "========================"
echo -e "Total Tests: ${BLUE}${TOTAL_TESTS}${NC}"
echo -e "Passed: ${GREEN}${PASSED_TESTS}${NC}"
echo -e "Failed: ${RED}$((TOTAL_TESTS - PASSED_TESTS))${NC}"

if [ $PASSED_TESTS -eq $TOTAL_TESTS ]; then
    echo -e "${GREEN}🎉 All tests passed! v2.0 is ready for deployment.${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Please review and fix issues before deploying.${NC}"
    exit 1
fi

echo ""
echo "🔍 Manual Testing Checklist:"
echo "=============================="
echo "□ Visit homepage and verify Hero v2.0 loads"
echo "□ Check Power Pro section displays correctly"
echo "□ Test 'Sono Interessato' button functionality"
echo "□ Verify mobile responsiveness"
echo "□ Test analytics dashboard at /analytics-v2"
echo "□ Confirm tracking events fire in browser console"
echo "□ Check development toggle works (v1.0 ↔ v2.0)"
echo "□ Validate SEO meta tags for v2.0 content"
echo "□ Test phone number links work correctly"
echo "□ Verify waitlist data saves to localStorage"
echo ""
echo "📈 Performance Testing:"
echo "======================="
echo "□ Lighthouse score > 90"
echo "□ LCP < 2.5s"
echo "□ CLS < 0.1"
echo "□ Bundle size reasonable"
echo ""
echo "🎯 A/B Testing Setup:"
echo "====================="
echo "□ Test version toggle in development mode"
echo "□ Verify tracking events differentiate v1.0 vs v2.0"
echo "□ Check analytics show both versions correctly"
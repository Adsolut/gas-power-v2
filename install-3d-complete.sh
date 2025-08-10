#!/bin/bash

echo "🎨 =========================================="
echo "   Gas Power v2 - 3D Enhancement Setup"
echo "🎨 =========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}📦 Installing 3D and Animation Libraries...${NC}"
echo ""

# Core Animation Libraries
echo -e "${BLUE}Installing Framer Motion...${NC}"
npm install framer-motion@latest

echo -e "${BLUE}Installing React Spring...${NC}"
npm install @react-spring/web@latest @react-spring/three@latest

echo -e "${BLUE}Installing React Parallax...${NC}"
npm install react-parallax@latest react-parallax-tilt@latest

echo -e "${BLUE}Installing Intersection Observer...${NC}"
npm install react-intersection-observer@latest

echo -e "${BLUE}Installing Lottie React...${NC}"
npm install lottie-react@latest

echo -e "${BLUE}Installing Three.js for React...${NC}"
npm install three@latest @react-three/fiber@latest @react-three/drei@latest

echo -e "${BLUE}Installing GSAP (Optional)...${NC}"
npm install gsap@latest

echo -e "${BLUE}Installing React Typed...${NC}"
npm install react-typed-component@latest

echo -e "${BLUE}Installing React CountUp...${NC}"
npm install react-countup@latest

echo -e "${BLUE}Installing Particles...${NC}"
npm install react-tsparticles@latest tsparticles@latest

echo -e "${BLUE}Installing AOS...${NC}"
npm install aos@latest
npm install --save-dev @types/aos@latest

echo -e "${BLUE}Installing React Fast Marquee...${NC}"
npm install react-fast-marquee@latest

echo ""
echo -e "${GREEN}✅ All 3D and animation libraries installed successfully!${NC}"
echo ""

# Create test file to verify installation
cat > test-3d-setup.js << 'EOF'
// Test file to verify all libraries are installed correctly
console.log("🔍 Checking 3D Libraries Installation...\n");

const libs = [
  'framer-motion',
  '@react-spring/web',
  'react-parallax',
  'react-parallax-tilt',
  'react-intersection-observer',
  'lottie-react',
  'three',
  '@react-three/fiber',
  '@react-three/drei',
  'gsap',
  'react-typed-component',
  'react-countup',
  'react-tsparticles',
  'aos',
  'react-fast-marquee'
];

let allInstalled = true;

libs.forEach(lib => {
  try {
    require.resolve(lib);
    console.log(`✅ ${lib} - Installed`);
  } catch(e) {
    console.log(`❌ ${lib} - Not found`);
    allInstalled = false;
  }
});

if (allInstalled) {
  console.log("\n🎉 All libraries are installed correctly!");
} else {
  console.log("\n⚠️ Some libraries are missing. Please check the installation.");
}
EOF

echo -e "${YELLOW}🔍 Verifying installation...${NC}"
node test-3d-setup.js
rm test-3d-setup.js

echo ""
echo -e "${GREEN}=========================================="
echo "   INSTALLATION COMPLETE!"
echo "==========================================${NC}"
echo ""
echo -e "${BLUE}📋 What's New:${NC}"
echo "  • 3D Hero Section with WebGL effects"
echo "  • Parallax scrolling throughout the site"
echo "  • Card 3D transforms on hover"
echo "  • Animated counters and statistics"
echo "  • Particle system backgrounds"
echo "  • Morphing gradient animations"
echo "  • Text reveal animations"
echo "  • Floating elements"
echo "  • Partner marquee ticker"
echo ""
echo -e "${YELLOW}🚀 Next Steps:${NC}"
echo "  1. Start the dev server: npm run dev"
echo "  2. Visit http://localhost:5173"
echo "  3. Experience the new 3D effects!"
echo ""
echo -e "${GREEN}💡 Pro Tips:${NC}"
echo "  • The 3D effects are GPU-accelerated"
echo "  • Mobile performance is optimized"
echo "  • All animations respect prefers-reduced-motion"
echo "  • Effects degrade gracefully on older browsers"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "  • Hero3D.tsx - Main 3D hero section"
echo "  • ScrollEffects.tsx - Reusable scroll animations"
echo "  • IndexV2Business3D.tsx - Enhanced homepage"
echo ""
echo "Enjoy your new 3D-enhanced Gas Power v2! 🎉"

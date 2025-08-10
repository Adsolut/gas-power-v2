#!/bin/bash

# Make all scripts executable
echo "🔧 Making all scripts executable..."

chmod +x install-new-deps.sh
chmod +x install-3d-libraries.sh
chmod +x install-3d-complete.sh
chmod +x build-production.sh
chmod +x deploy-production.sh
chmod +x system-check.sh
chmod +x make-all-executable.sh

echo "✅ All scripts are now executable!"
echo ""
echo "📋 Available Scripts:"
echo "  ./install-3d-complete.sh   - Install all 3D libraries"
echo "  ./system-check.sh          - Check system status"
echo "  ./build-production.sh      - Build for production"
echo "  ./deploy-production.sh     - Deploy to server"
echo ""
echo "🚀 Quick Start:"
echo "  1. ./install-3d-complete.sh"
echo "  2. npm run dev"
echo "  3. Open http://localhost:5173"
echo ""
echo "Enjoy your 3D-enhanced Gas Power v2! 🎨"

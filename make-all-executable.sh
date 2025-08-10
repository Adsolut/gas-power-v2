#!/bin/bash

# Make all scripts executable
chmod +x install-new-deps.sh
chmod +x build-production.sh
chmod +x deploy-production.sh
chmod +x system-check.sh

echo "✅ All scripts are now executable!"
echo ""
echo "You can now run:"
echo "  ./system-check.sh     - Check system status"
echo "  ./install-new-deps.sh  - Install new dependencies"
echo "  ./build-production.sh  - Build for production"
echo "  ./deploy-production.sh - Deploy to server"

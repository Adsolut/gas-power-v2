#!/bin/bash

# 🚀 Gas e Power - Script Deploy Automatico
# Uso: ./deploy.sh [your-domain.com]

set -e

echo "🚀 Gas e Power - Deploy Script"
echo "================================"

# Verifica parametri
if [ -z "$1" ]; then
    echo "❌ Errore: Specifica il dominio"
    echo "💡 Uso: ./deploy.sh tuodominio.it"
    exit 1
fi

DOMAIN=$1
echo "🌐 Dominio target: $DOMAIN"

# Step 1: Clean previous builds
echo ""
echo "🧹 Step 1: Pulizia build precedenti..."
rm -rf dist/
echo "✅ Build precedenti rimosse"

# Step 2: Install dependencies
echo ""
echo "📦 Step 2: Installazione dipendenze..."
npm install
echo "✅ Dipendenze installate"

# Step 3: Update domain in files
echo ""
echo "🔄 Step 3: Aggiornamento domini nei file..."

# Update index.html
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" index.html
echo "✅ index.html aggiornato"

# Update sitemap.xml
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" public/sitemap.xml
echo "✅ sitemap.xml aggiornato"

# Update robots.txt
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" public/robots.txt
echo "✅ robots.txt aggiornato"

# Update SEO components
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" src/components/SEO/SEOHead.tsx
echo "✅ SEOHead.tsx aggiornato"

# Update SEO utils
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" src/utils/seoUtils.ts
echo "✅ seoUtils.ts aggiornato"

# Step 4: Build for production
echo ""
echo "🏗️  Step 4: Build di produzione..."
npm run build
echo "✅ Build completata"

# Step 5: Optimize dist folder
echo ""
echo "⚡ Step 5: Ottimizzazione finale..."

# Copy .htaccess to dist root (in caso Vite non lo faccia)
if [ -f "public/.htaccess" ]; then
    cp public/.htaccess dist/.htaccess
    echo "✅ .htaccess copiato in dist/"
fi

# Verify critical files
echo ""
echo "🔍 Step 6: Verifica file critici..."

CRITICAL_FILES=("dist/index.html" "dist/.htaccess" "dist/robots.txt" "dist/sitemap.xml" "dist/manifest.json")

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file presente"
    else
        echo "❌ $file mancante!"
        exit 1
    fi
done

# Step 7: Create deployment archive
echo ""
echo "📦 Step 7: Creazione archivio deploy..."
cd dist/
zip -r "../gas-power-deploy-$(date +%Y%m%d_%H%M%S).zip" *
cd ..
echo "✅ Archivio deploy creato"

# Step 8: Display next steps
echo ""
echo "🎉 BUILD COMPLETATO!"
echo "===================="
echo ""
echo "📁 File pronti per deploy:"
echo "   • Cartella: ./dist/"
echo "   • Archivio: ./gas-power-deploy-*.zip"
echo ""
echo "🚀 Prossimi passi:"
echo "   1. Carica contenuto di dist/ su cPanel public_html/"
echo "   2. Verifica SSL attivo su $DOMAIN"
echo "   3. Test sito: https://$DOMAIN"
echo "   4. Configura Google Search Console"
echo ""
echo "🔗 Link utili post-deploy:"
echo "   • Google Analytics: https://analytics.google.com"
echo "   • Tag Manager: https://tagmanager.google.com"
echo "   • PageSpeed Test: https://pagespeed.web.dev/?url=https://$DOMAIN"
echo ""
echo "📊 Tracking IDs configurati:"
echo "   • GTM: GTM-PMLRZS68"
echo "   • GA4: G-QK1QV0MMWG"
echo ""

# Cleanup backup files
rm -f index.html.bak public/sitemap.xml.bak public/robots.txt.bak src/components/SEO/SEOHead.tsx.bak src/utils/seoUtils.ts.bak

echo "✨ Deploy preparato con successo per $DOMAIN!"
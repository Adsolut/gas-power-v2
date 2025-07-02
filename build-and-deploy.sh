#!/bin/bash

# Auto-build script per cPanel dopo Git pull
# Posiziona questo file nella root del repository

echo "🚀 Avvio build automatico Gas e Power..."

# Verifica Node.js e npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm non trovato. Installa Node.js nel cPanel."
    exit 1
fi

# Installa dipendenze
echo "📦 Installazione dipendenze..."
npm install --production

# Build per produzione
echo "🏗️ Build di produzione..."
npm run build

# Copia file nella directory pubblica
echo "📂 Deploy file su public_html..."

# Se siamo in una sottocartella di public_html
if [ -d "../../../public_html" ]; then
    cp -R dist/* ../../../public_html/
    echo "✅ File copiati in public_html/"
elif [ -d "../../public_html" ]; then
    cp -R dist/* ../../public_html/
    echo "✅ File copiati in public_html/"
elif [ -d "../public_html" ]; then
    cp -R dist/* ../public_html/
    echo "✅ File copiati in public_html/"
else
    # Siamo già in public_html
    cp -R dist/* ./
    echo "✅ File copiati nella directory corrente"
fi

# Cleanup
echo "🧹 Pulizia file temporanei..."
rm -rf node_modules/.cache
rm -rf dist

echo "✨ Deploy completato con successo!"
echo "🌐 Sito aggiornato su: https://$(hostname -d)"

# Opzionale: notifica via webhook
# curl -X POST "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" \
#      -H "Content-Type: application/json" \
#      -d '{"text":"🚀 Gas e Power deploy completato!"}'
#!/bin/bash

# 🚀 Deploy Manuale con FTP - Gas e Power
# Uso: ./ftp-deploy.sh [dominio]

set -e

echo "🚀 Gas e Power - Deploy FTP"
echo "==========================="

# Verifica parametri
if [ -z "$1" ]; then
    echo "❌ Errore: Specifica il dominio"
    echo "💡 Uso: ./ftp-deploy.sh tuodominio.it"
    exit 1
fi

DOMAIN=$1
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🌐 Dominio target: $DOMAIN"
echo "⏰ Timestamp: $TIMESTAMP"

# Step 1: Aggiorna domini nei file
echo ""
echo "🔄 Step 1: Aggiornamento domini..."
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" index.html
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" public/sitemap.xml
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" public/robots.txt
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" src/components/SEO/SEOHead.tsx
sed -i.bak "s/tuodominio\.it/$DOMAIN/g" src/utils/seoUtils.ts
echo "✅ Domini aggiornati"

# Step 2: Install & Build
echo ""
echo "🏗️  Step 2: Build di produzione..."
npm install
npm run build
echo "✅ Build completata"

# Step 3: Prepara archivio
echo ""
echo "📦 Step 3: Preparazione archivio deploy..."
cd dist/
zip -r "../deploy-$DOMAIN-$TIMESTAMP.zip" *
cd ..
echo "✅ Archivio creato: deploy-$DOMAIN-$TIMESTAMP.zip"

# Step 4: Istruzioni manuali
echo ""
echo "📋 ISTRUZIONI DEPLOY MANUALE:"
echo "=============================="
echo ""
echo "1. 📤 UPLOAD VIA cPANEL FILE MANAGER:"
echo "   • Login cPanel → File Manager"
echo "   • Vai in public_html/"
echo "   • Upload: deploy-$DOMAIN-$TIMESTAMP.zip"
echo "   • Estrai archivio in public_html/"
echo ""
echo "2. 🗂️  VERIFICA FILE PRINCIPALI:"
echo "   • index.html"
echo "   • .htaccess"
echo "   • robots.txt"
echo "   • sitemap.xml"
echo "   • cartella assets/"
echo ""
echo "3. 🌐 TEST SITO:"
echo "   • Apri: https://$DOMAIN"
echo "   • Verifica responsive"
echo "   • Test Console (F12) per tracking"
echo ""
echo "4. 🔍 VERIFICA SEO:"
echo "   • https://$DOMAIN/robots.txt"
echo "   • https://$DOMAIN/sitemap.xml"
echo "   • Test Google Rich Results"
echo ""

# Step 5: Genera FTP script (opzionale)
echo "5. 🚀 UPLOAD FTP AUTOMATICO (se hai credenziali):"
echo "   • Modifica ftp-config.txt con le tue credenziali"
echo "   • Esegui: ./ftp-upload.sh"
echo ""

# Genera file di configurazione FTP
cat > ftp-config.txt << EOF
# Configurazione FTP per deploy automatico
# ATTENZIONE: Non committare questo file su Git!

FTP_HOST=tuoserver.com
FTP_USER=tuousername
FTP_PASS=tuapassword
FTP_DIR=/public_html/

# Per usare:
# 1. Compila le credenziali sopra
# 2. Esegui: ./ftp-upload.sh
EOF

# Genera script FTP upload
cat > ftp-upload.sh << 'EOF'
#!/bin/bash

# Carica configurazione FTP
source ftp-config.txt

echo "🚀 Upload FTP automatico..."

# Upload via lftp (se disponibile)
if command -v lftp &> /dev/null; then
    echo "📤 Upload con lftp..."
    lftp -c "
        open -u $FTP_USER,$FTP_PASS $FTP_HOST
        cd $FTP_DIR
        mirror -R dist/ ./
        quit
    "
    echo "✅ Upload completato via lftp"
elif command -v ncftp &> /dev/null; then
    echo "📤 Upload con ncftp..."
    ncftpput -R -v -u $FTP_USER -p $FTP_PASS $FTP_HOST $FTP_DIR dist/*
    echo "✅ Upload completato via ncftp"
else
    echo "❌ Installa lftp o ncftp per upload automatico"
    echo "💡 Oppure usa il File Manager di cPanel"
fi
EOF

chmod +x ftp-upload.sh

# Cleanup backup files
rm -f *.bak src/components/SEO/*.bak src/utils/*.bak public/*.bak

echo ""
echo "✨ DEPLOY PREPARATO PER: $DOMAIN"
echo "📦 File pronti: deploy-$DOMAIN-$TIMESTAMP.zip"
echo "🔧 Script FTP: ftp-upload.sh (configurazione in ftp-config.txt)"
echo ""
echo "🎯 NEXT STEPS:"
echo "1. Upload manuale via cPanel File Manager"
echo "2. Oppure configura e usa ftp-upload.sh"
echo "3. Test sito su https://$DOMAIN"
echo ""
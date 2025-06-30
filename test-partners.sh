#!/bin/bash

# 🎯 Test Partners Section - Versioni Multiple
echo "🤝 Test Sezione Partners - Confronto Versioni"
echo "============================================="
echo ""

# Verifica esistenza loghi
echo "📁 Verifica esistenza loghi partners:"
partners_dir="public/img/partners"
logo_count=0

if [ -d "$partners_dir" ]; then
    for logo in "$partners_dir"/*.svg; do
        if [ -f "$logo" ]; then
            size=$(du -h "$logo" | cut -f1)
            name=$(basename "$logo" .svg)
            echo "✅ $name.svg ($size)"
            ((logo_count++))
        fi
    done
    echo ""
    echo "📊 Totale loghi trovati: $logo_count"
else
    echo "❌ Directory $partners_dir non trovata!"
fi

echo ""
echo "🔧 Versioni componenti disponibili:"

# Verifica versione completa (8 partners)
if [ -f "src/components/PartnerLogos.tsx" ]; then
    echo "✅ PartnerLogos.tsx (8 partners) - Layout completo"
    if grep -q "8+" src/components/PartnerLogos.tsx; then
        echo "   📏 Layout: Grid 2x4 responsive"
        echo "   🎨 Features: Stats section, hover effects, CTA bottom"
        echo "   📱 Mobile: 2 colonne, stack verticale"
    fi
else
    echo "❌ PartnerLogos.tsx (versione completa) non trovata"
fi

# Verifica versione compatta (4 partners)
if [ -f "src/components/PartnerLogosCompact.tsx" ]; then
    echo "✅ PartnerLogosCompact.tsx (4 partners) - Layout premium"
    if grep -q "Sorgenia" src/components/PartnerLogosCompact.tsx; then
        echo "   📏 Layout: Grid 1x4 responsive (Enel, Eni, Edison, Sorgenia)"
        echo "   🎨 Features: Market share badges, premium CTA, glow effects"
        echo "   📱 Mobile: 1 colonna, card più grandi"
    fi
else
    echo "❌ PartnerLogosCompact.tsx (versione compatta) non trovata"
fi

echo ""
echo "📋 Quale versione vuoi usare?"
echo ""
echo "1️⃣  VERSIONE COMPLETA (8 Partners)"
echo "   ✅ Mostra tutti i partner disponibili"
echo "   ✅ Design più completo con statistiche"
echo "   ✅ Maggiore credibilità (più fornitori)"
echo "   ❌ Potrebbe sembrare 'affollato'"
echo ""
echo "2️⃣  VERSIONE COMPATTA (4 Partners Premium)"
echo "   ✅ Focus sui partner principali (60% market share)"
echo "   ✅ Design più pulito e premium"
echo "   ✅ Maggiore attenzione per ogni partner"
echo "   ✅ Performance migliore (meno immagini)"
echo "   ❌ Meno fornitori mostrati"
echo ""

# Verifica quale è attualmente attiva
if grep -q "PartnerLogosCompact" src/pages/Index.tsx 2>/dev/null; then
    echo "🎯 ATTUALMENTE ATTIVA: Versione Compatta (4 partners)"
elif grep -q "PartnerLogos" src/pages/Index.tsx 2>/dev/null; then
    echo "🎯 ATTUALMENTE ATTIVA: Versione Completa (8 partners)"
else
    echo "⚠️  Nessuna versione rilevata in Index.tsx"
fi

echo ""
echo "🔄 Per cambiare versione:"
echo ""
echo "USARE VERSIONE COMPLETA (8 partners):"
echo "sed -i '' 's/PartnerLogosCompact/PartnerLogos/g' src/pages/Index.tsx"
echo ""
echo "USARE VERSIONE COMPATTA (4 partners):"
echo "sed -i '' 's/PartnerLogos/PartnerLogosCompact/g' src/pages/Index.tsx"
echo ""

echo "🚀 TEST COMPLETO:"
echo "1. npm run dev"
echo "2. Verifica layout partners"
echo "3. Testa hover effects"
echo "4. Controlla responsive mobile"
echo "5. Verifica console per caricamento loghi"
echo ""

if [ $logo_count -eq 8 ]; then
    echo "✅ TUTTO PRONTO! Tutti gli 8 loghi sono presenti"
    echo "💡 Raccomandazione: Prova entrambe le versioni e scegli quella che preferisci"
elif [ $logo_count -ge 4 ]; then
    echo "✅ PRONTO! Almeno 4 loghi disponibili"
    echo "💡 Raccomandazione: Usa la versione compatta (4 partners)"
else
    echo "⚠️  ATTENZIONE: Solo $logo_count loghi trovati"
    echo "📝 Aggiungi più loghi SVG nella directory $partners_dir"
fi

echo ""
echo "🎨 CONFRONTO VISIVO:"
echo "• Versione Completa: Più fornitori = maggiore scelta percepita"
echo "• Versione Compatta: Partner premium = maggiore qualità percepita"
echo ""
echo "📈 IMPATTO CONVERSIONI:"
echo "• Completa: Più opzioni può creare paralisi decisionale"
echo "• Compatta: Focus sui top player aumenta fiducia"

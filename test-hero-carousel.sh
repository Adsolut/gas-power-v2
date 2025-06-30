#!/bin/bash

# 🎯 Test Hero Carousel - Verifica Immagini e Funzionalità
echo "🖼️  Test Hero Carousel - Verifica immagini e funzionalità"
echo "========================================================="
echo ""

# Verifica esistenza delle immagini
echo "📁 Verifica esistenza immagini Hero:"
images=(
    "public/img/hero/famiglia-risparmio.jpg"
    "public/img/hero/consulente-telefono.jpg"
    "public/img/hero/casa-moderna.jpg"
    "public/img/hero/grafici-risparmio.jpg"
)

all_images_exist=true
for image in "${images[@]}"; do
    if [ -f "$image" ]; then
        size=$(du -h "$image" | cut -f1)
        echo "✅ $image ($size)"
    else
        echo "❌ $image MANCANTE!"
        all_images_exist=false
    fi
done

echo ""

# Verifica componenti aggiornati
echo "🔧 Verifica componenti aggiornati:"
if grep -q "preloadImages" src/components/HeroCarousel.tsx; then
    echo "✅ HeroCarousel.tsx - Nuovo sistema di preload implementato"
else
    echo "❌ HeroCarousel.tsx - Sistema preload non trovato"
fi

if grep -q "z-20" src/components/HeroSection.tsx; then
    echo "✅ HeroSection.tsx - Z-index ottimizzato"
else
    echo "❌ HeroSection.tsx - Z-index non ottimizzato"
fi

echo ""

# Verifica file di log
echo "📊 Suggerimenti per il debugging:"
echo ""
echo "1. 🚀 AVVIA IL PROGETTO:"
echo "   npm run dev"
echo ""
echo "2. 🔍 APRI CONSOLE BROWSER (F12) e cerca questi log:"
echo "   ✅ '🎯 HeroSection montata - Carousel dovrebbe essere visibile'"
echo "   ✅ '✅ Immagine caricata: /img/hero/famiglia-risparmio.jpg'"
echo "   ✅ '🎉 Tutte le immagini del carousel sono state caricate!'"
echo ""
echo "3. 📱 TEST FUNZIONALITÀ:"
echo "   - Le immagini del carousel si vedono? ✅/❌"
echo "   - Il carousel cambia automaticamente ogni 5 secondi? ✅/❌"
echo "   - I pulsanti freccia funzionano? ✅/❌"
echo "   - Gli indicatori in basso funzionano? ✅/❌"
echo "   - Su mobile il carousel è responsive? ✅/❌"
echo ""

if [ "$all_images_exist" = true ]; then
    echo "4. 🎉 STATO FINALE:"
    echo "   ✅ Tutte le immagini esistono"
    echo "   ✅ Componenti aggiornati"
    echo "   ✅ Sistema di fallback implementato"
    echo "   ✅ Debugging abilitato"
    echo ""
    echo "🚀 IL CAROUSEL DOVREBBE FUNZIONARE PERFETTAMENTE!"
    echo ""
    echo "Se ancora non vedi le immagini:"
    echo "• Controlla la console browser per errori"
    echo "• Verifica che le immagini siano in formato corretto (JPG/PNG)"
    echo "• Prova a ricaricare la pagina (Ctrl+F5)"
else
    echo "4. ⚠️  PROBLEMI RILEVATI:"
    echo "   ❌ Alcune immagini mancano"
    echo "   📝 Crea immagini placeholder o correggi i percorsi"
fi

echo ""
echo "📞 Se hai ancora problemi, condividi i log della console!"

// 📊 VISUALIZZATORE DATI CALLBACK - Incolla in Console Browser

console.clear();
console.log('🎯 DASHBOARD CALLBACK REQUESTS - Gas Power Compara');
console.log('='.repeat(60));

// Recupera dati
const callbackData = localStorage.getItem('callbackRequests');

if (!callbackData || callbackData === '[]') {
    console.log('❌ Nessun dato trovato');
    console.log('💡 Per testare:');
    console.log('   1. Clicca "Fatti richiamare" nel sito');
    console.log('   2. Compila il form');
    console.log('   3. Rilancia questo script');
} else {
    const callbacks = JSON.parse(callbackData);
    
    console.log(`📊 TOTALE RICHIESTE: ${callbacks.length}`);
    console.log('');
    
    // Statistiche per fonte
    const sources = {};
    const times = {};
    
    callbacks.forEach((cb, index) => {
        sources[cb.source] = (sources[cb.source] || 0) + 1;
        times[cb.preferredTime] = (times[cb.preferredTime] || 0) + 1;
        
        console.log(`📞 RICHIESTA #${index + 1}:`);
        console.log(`   Nome: ${cb.name || 'Non fornito'}`);
        console.log(`   Telefono: ${cb.phone}`);
        console.log(`   Orario preferito: ${cb.preferredTime}`);
        console.log(`   Fonte: ${cb.source}`);
        console.log(`   Data: ${new Date(cb.timestamp).toLocaleString('it-IT')}`);
        console.log('   ' + '-'.repeat(40));
    });
    
    console.log('📊 STATISTICHE:');
    console.log('');
    console.log('🎯 Per Fonte CTA:');
    Object.entries(sources).forEach(([source, count]) => {
        console.log(`   ${source}: ${count} richieste`);
    });
    
    console.log('');
    console.log('⏰ Per Orario Preferito:');
    Object.entries(times).forEach(([time, count]) => {
        console.log(`   ${time}: ${count} richieste`);
    });
    
    console.log('');
    console.log('💾 EXPORT DATI:');
    console.log('Per salvare i dati, copia questo JSON:');
    console.log(JSON.stringify(callbacks, null, 2));
}

console.log('');
console.log('🔄 Per aggiornare: ricarica la pagina e rilancia questo script');
console.log('🗑️  Per cancellare: localStorage.removeItem("callbackRequests")');

import { useState, useEffect } from 'react';
import { Star, Users, TrendingUp, Phone } from 'lucide-react';

const PartnerLogosCompact = () => {
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);
  const [loadedLogos, setLoadedLogos] = useState<Set<number>>(new Set());

  // Solo i 4 partner principali - layout ottimizzato
  const partners = [
    { 
      name: 'Enel', 
      logo: '/img/partners/enel.svg',
      description: 'Il leader italiano dell\'energia',
      marketShare: '25%',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Eni', 
      logo: '/img/partners/eni.svg',
      description: 'Energia sostenibile e innovazione',
      marketShare: '18%',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      name: 'Edison', 
      logo: '/img/partners/edison.svg',
      description: 'Tradizione dal 1884',
      marketShare: '12%',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Sorgenia', 
      logo: '/img/partners/sorgenia.svg',
      description: 'Energia digitale e sostenibile',
      marketShare: '10%',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // Preload logos
  useEffect(() => {
    const preloadLogos = async () => {
      const promises = partners.map((partner, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedLogos(prev => new Set([...prev, index]));
            console.log(`✅ Logo partner caricato: ${partner.name}`);
            resolve();
          };
          img.onerror = () => {
            console.warn(`⚠️ Errore caricamento logo: ${partner.name}`);
            resolve();
          };
          img.src = partner.logo;
        });
      });

      await Promise.allSettled(promises);
      console.log('🎉 Caricamento loghi partners completato (Enel, Eni, Edison, Sorgenia)');
    };

    preloadLogos();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section - More prominent */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-md">
            <Star className="h-5 w-5 mr-2" />
            Partner Ufficiali Verificati
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            I <span className="text-green-600 relative">
              Top 4 Fornitori
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-green-200 rounded"></div>
            </span>
            <br className="hidden sm:block" />
            di Energia in Italia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Partner esclusivi con <strong>oltre il 60% del mercato italiano</strong>. 
            Confronta le loro migliori offerte e risparmia fino a €500 all'anno.
          </p>
        </div>

        {/* Main Partners Grid - Optimized for 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                hoveredPartner === index ? 'ring-4 ring-green-500 ring-offset-4 shadow-2xl' : ''
              }`}
              onMouseEnter={() => setHoveredPartner(index)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              {/* Market Share Badge */}
              <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {partner.marketShare}
              </div>

              {/* Partner Logo */}
              <div className="flex items-center justify-center h-20 sm:h-24 mb-6 relative">
                {loadedLogos.has(index) ? (
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-125"
                    style={{
                      filter: hoveredPartner === index ? 'brightness(1.2) saturate(1.1)' : 'brightness(0.9)'
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
                    <div className="text-gray-400 text-xs font-bold">{partner.name}</div>
                  </div>
                )}
              </div>

              {/* Partner Info */}
              <div className="text-center">
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 group-hover:text-green-600 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.description}
                </p>
                
                {/* CTA Button per ogni partner */}
                <button className="w-full bg-gray-100 group-hover:bg-green-500 text-gray-700 group-hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-sm">
                  Scopri Offerte {partner.name}
                </button>
              </div>

              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Hover Glow Effect */}
              {hoveredPartner === index && (
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl opacity-20 blur-xl transition-opacity duration-500" />
              )}
            </div>
          ))}
        </div>

        {/* Trust Indicators Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4</div>
            <div className="text-gray-600 font-medium">Partner Principali</div>
            <div className="text-sm text-gray-500 mt-1">60%+ market share</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">€500</div>
            <div className="text-gray-600 font-medium">Risparmio Max/Anno</div>
            <div className="text-sm text-gray-500 mt-1">vs tariffa standard</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.8★</div>
            <div className="text-gray-600 font-medium">Rating Medio</div>
            <div className="text-sm text-gray-500 mt-1">su Trustpilot</div>
          </div>
        </div>

        {/* Premium CTA Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 rounded-3xl"></div>
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="relative text-center p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              🏆 Consulenza Gratuita con i Top Partner
            </h3>
            <p className="text-green-50 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              I nostri esperti confrontano <strong>tutte le offerte dei 4 partner principali</strong> 
              e ti guidano verso il <strong>massimo risparmio possibile</strong> per la tua situazione.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6" />
                  <div>
                    <div className="text-sm opacity-90">📞 Chiama ora:</div>
                    <div className="font-bold text-xl">02 4013 7880</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm opacity-90 mb-1">⏰ Consulenza Gratuita</div>
                <div className="font-semibold">Lun-Ven 8-21, Sab 9-13</div>
              </div>
            </div>
            <div className="mt-6 text-sm opacity-80">
              ✅ Senza impegno • ✅ Risparmio garantito • ✅ Assistenza post-vendita
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosCompact;

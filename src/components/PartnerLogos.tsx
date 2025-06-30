import { useState, useEffect } from 'react';
import { Star, Users, TrendingUp } from 'lucide-react';

const PartnerLogos = () => {
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);
  const [loadedLogos, setLoadedLogos] = useState<Set<number>>(new Set());

  // Partners principali - facilmente modificabile per mostrare solo quelli desiderati
  const partners = [
    { 
      name: 'Enel', 
      logo: '/img/partners/enel.svg',
      description: 'Leader in Italia',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Eni', 
      logo: '/img/partners/eni.svg',
      description: 'Energia sostenibile',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      name: 'Edison', 
      logo: '/img/partners/edison.svg',
      description: 'Dal 1884',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'A2A', 
      logo: '/img/partners/a2a.svg',
      description: 'Multi-utility',
      color: 'from-red-500 to-red-600'
    },
    { 
      name: 'Iren', 
      logo: '/img/partners/iren.svg',
      description: 'Gruppo integrato',
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      name: 'Acea', 
      logo: '/img/partners/acea.svg',
      description: 'Servizi essenziali',
      color: 'from-teal-500 to-teal-600'
    },
    { 
      name: 'Sorgenia', 
      logo: '/img/partners/sorgenia.svg',
      description: 'Energia digitale',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'Hera', 
      logo: '/img/partners/hera.svg',
      description: 'Servizi ambientali',
      color: 'from-emerald-500 to-emerald-600'
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
            console.log(`✅ Logo caricato: ${partner.name}`);
            resolve();
          };
          img.onerror = () => {
            console.warn(`⚠️ Errore caricamento logo: ${partner.name}`);
            resolve(); // Continua anche in caso di errore
          };
          img.src = partner.logo;
        });
      });

      await Promise.allSettled(promises);
      console.log('🎉 Preload partners completato');
    };

    preloadLogos();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            Fornitori Verificati
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Confronta i <span className="text-green-600">Migliori Fornitori</span>
            <br className="hidden sm:block" />
            Luce e Gas in Italia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Accedi alle offerte esclusive dei principali operatori energetici italiani. 
            Confronta prezzi, servizi e trova la soluzione perfetta per te.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">8+</div>
            <div className="text-gray-600">Fornitori Partner</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">€300</div>
            <div className="text-gray-600">Risparmio Medio/Anno</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.8★</div>
            <div className="text-gray-600">Rating Medio</div>
          </div>
        </div>

        {/* Partners Grid - Optimized for 8 partners */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200 cursor-pointer transform hover:scale-105 ${
                hoveredPartner === index ? 'ring-2 ring-green-500 ring-offset-2' : ''
              }`}
              onMouseEnter={() => setHoveredPartner(index)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              {/* Partner Logo */}
              <div className="flex items-center justify-center h-16 sm:h-20 mb-4 relative">
                {loadedLogos.has(index) ? (
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain filter transition-all duration-300 group-hover:scale-110"
                    style={{
                      filter: hoveredPartner === index ? 'brightness(1.1)' : 'brightness(0.9)'
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                    <div className="text-gray-400 text-xs font-medium">{partner.name}</div>
                  </div>
                )}
              </div>

              {/* Partner Name */}
              <div className="text-center">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-green-600 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Active Indicator */}
              {hoveredPartner === index && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            Non sai quale scegliere?
          </h3>
          <p className="text-green-50 mb-6 max-w-2xl mx-auto">
            I nostri consulenti ti aiutano a trovare l'offerta perfetta per le tue esigenze. 
            Confrontiamo tutte le tariffe e ti guidiamo nella scelta migliore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-sm opacity-90">📞 Chiamaci ora:</div>
              <div className="font-bold text-lg">02 4013 7880</div>
            </div>
            <div className="text-sm opacity-90">
              ⏰ Lun-Ven 8-21, Sab 9-13
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;

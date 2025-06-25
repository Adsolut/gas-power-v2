
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PartnerLogos = () => {
  const partners = [
    { name: 'Enel', logo: '/img/partners/enel.svg' },
    { name: 'Eni', logo: '/img/partners/eni.svg' },
    { name: 'Edison', logo: '/img/partners/edison.svg' },
    { name: 'A2A', logo: '/img/partners/a2a.svg' },
    { name: 'Iren', logo: '/img/partners/iren.svg' },
    { name: 'Acea', logo: '/img/partners/acea.svg' },
    { name: 'Sorgenia', logo: '/img/partners/sorgenia.svg' },
    { name: 'Hera', logo: '/img/partners/hera.svg' },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Selectra confronta i migliori fornitori luce e gas in Italia
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-gaspower-green to-gaspower-darkgreen rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs text-center">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;

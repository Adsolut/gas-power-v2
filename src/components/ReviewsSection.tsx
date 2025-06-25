
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ReviewsSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            I clienti soddisfatti di Selectra
          </h2>
          <div className="flex items-center justify-center space-x-8 mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gaspower-blue">4.9</div>
              <div className="text-gray-600">/5</div>
              <div className="flex text-yellow-400 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="text-sm text-gray-600">Calcolato su 4690 opinioni totali</div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold mb-2">★ Trustpilot</div>
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-gray-600">/5</div>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-2">G</div>
              <div className="text-2xl font-bold">4.7</div>
              <div className="text-gray-600">/5</div>
            </div>
            
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-2">G</div>
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-gray-600">/5</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gaspower-green rounded-full flex items-center justify-center text-white font-bold mr-3">
                  G
                </div>
                <div>
                  <div className="font-semibold">Gianni</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                "Io sto avendo a che fare con *** e posso affermare che è la migliore persona con cui abbia avuto mai a che fare."
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gaspower-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                  L
                </div>
                <div>
                  <div className="font-semibold">Luca</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                "Un servizio davvero efficiente, gentilezza e professionalità. Io ho parlato con la signora *** che è stata gentilissima. Voto 5 stelle super!"
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gaspower-green rounded-full flex items-center justify-center text-white font-bold mr-3">
                  M
                </div>
                <div>
                  <div className="font-semibold">Maria</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                "Ottima assistenza, competente e risolutiva. Bello poter parlare sempre con lo stesso operatore così da non dover spiegare le cose 10 volte."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

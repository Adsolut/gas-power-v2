
import { useState } from 'react';
import { Phone, Zap, Users, Shield, CheckCircle, Calculator, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import HeroCarousel from '@/components/HeroCarousel';
import DetailedComparisonForm from '@/components/DetailedComparisonForm';
import PartnerLogos from '@/components/PartnerLogos';
import FAQ from '@/components/FAQ';

const Index = () => {
  const phoneNumber = '0240137880';
  
  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleFormSubmit = () => {
    handleCallNow();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-primary-200 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/placeholder.svg" 
                alt="Gas & Power Logo" 
                className="h-8 sm:h-12 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gaspower-green to-gaspower-darkgreen rounded-lg flex items-center justify-center hidden">
                <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Gas & Power</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleCallNow} 
                className="bg-gaspower-blue hover:bg-blue-600 text-white font-semibold px-3 sm:px-6 py-2 text-sm sm:text-base"
              >
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">06 </span>9450 0303
              </Button>
              <Button 
                variant="outline"
                className="text-gaspower-blue border-gaspower-blue hover:bg-gaspower-blue hover:text-white font-semibold px-3 sm:px-6 py-2 text-sm sm:text-base"
              >
                📞 Fatti richiamare
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with 16:9 Aspect Ratio */}
      <section className="relative w-full aspect-video flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Carousel */}
        <HeroCarousel />
        
        {/* Main Content Over Background */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 animate-fade-in drop-shadow-lg leading-tight">
              Confronta le <span className="text-gaspower-green">Migliori Offerte</span>
              <br />
              Luce e Gas
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 animate-fade-in drop-shadow-md px-2">
              Trova la tariffa più conveniente per la tua casa. Confronta gratuitamente 
              le offerte dei principali fornitori e inizia subito a risparmiare.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center animate-scale-in mb-4 sm:mb-6 md:mb-8">
              <Button 
                onClick={handleCallNow} 
                className="bg-gaspower-blue hover:bg-blue-600 text-white font-bold text-sm sm:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Chiama Ora: 06 9450 0303
              </Button>
              <p className="text-xs sm:text-sm text-white/80 drop-shadow-md text-center px-2">
                Consulenza gratuita dal lunedì al venerdì 8-21, sabato 9-13
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center animate-fade-in">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-white drop-shadow-md">Oltre 200.000 Clienti</h3>
                <p className="text-xs sm:text-base text-white/80 drop-shadow-md">Si sono fidati di noi dal 2015</p>
              </div>
              <div className="text-center animate-fade-in">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-white drop-shadow-md">100% Gratuito</h3>
                <p className="text-xs sm:text-base text-white/80 drop-shadow-md">Confronto e consulenza senza costi</p>
              </div>
              <div className="text-center animate-fade-in">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-white drop-shadow-md">Risparmio Immediato</h3>
                <p className="text-xs sm:text-base text-white/80 drop-shadow-md">Attivazione in pochi minuti</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Form */}
      <DetailedComparisonForm onSubmit={handleFormSubmit} />

      {/* Partner Logos */}
      <PartnerLogos />

      {/* Process Steps */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Come funziona il comparatore?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-gaspower-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl relative">
                1
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <div className="w-6 h-0.5 bg-gaspower-blue"></div>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gaspower-blue">Compila i dati di consumo e dell'utenza</h3>
              <p className="text-gray-600 text-sm">Se non conosci i tuoi consumi, niente panico: puoi fare una stima con le caratteristiche della casa.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gaspower-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl relative">
                2
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <div className="w-6 h-0.5 bg-gaspower-blue"></div>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gaspower-blue">Valuta e confronta le offerte</h3>
              <p className="text-gray-600 text-sm">Scopri le offerte migliori, leggi il prezzo, i vantaggi e valuta il fornitore adatto per te e la tua famiglia.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gaspower-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl relative">
                3
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <div className="w-6 h-0.5 bg-gaspower-blue"></div>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gaspower-blue">Attiva un'offerta conveniente</h3>
              <p className="text-gray-600 text-sm">Puoi farlo in autonomia o chiamando un operatore di Selectra, il cambio è gratuito e avviene in pochi minuti.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gaspower-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gaspower-green">Inizia a risparmiare in bolletta</h3>
              <p className="text-gray-600 text-sm">Bene, noi pensiamo a tutta la burocrazia, tu devi solo aspettare la comunicazione dal nuovo fornitore scelto.</p>
            </div>
          </div>

          <div className="text-center mt-12 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gaspower-blue text-white px-4 py-2 rounded-lg text-2xl font-bold mr-4">
                Più di 200000
              </div>
              <span className="text-lg text-gray-700">italiani si sono fidati di noi dal 2015</span>
              <Button className="ml-6 bg-gaspower-blue hover:bg-blue-600">
                📞 06 9450 0303
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
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

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-gaspower-green to-gaspower-darkgreen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Il portale Luce e Gas numero uno in Italia
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-center">
                <div className="text-white font-bold">💬 Chiamaci per info e attivazioni</div>
                <div className="text-white/80 text-sm">dal lunedì al venerdì dalle 8 alle 21 e il sabato dalle 9 alle 13</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleCallNow} 
                className="bg-gaspower-blue hover:bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                📞 06 9450 0303
              </Button>
              <Button 
                variant="outline"
                className="bg-white text-gaspower-blue border-2 border-white hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-lg"
              >
                📞 Ti richiamiamo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Gas & Power Logo" 
                  className="h-6 sm:h-8 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gaspower-green to-gaspower-darkgreen rounded-lg flex items-center justify-center hidden">
                  <Zap className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Gas & Power</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Il comparatore luce e gas numero uno in Italia
              </p>
              <div className="bg-yellow-500 text-black px-3 py-2 rounded text-sm font-semibold inline-block">
                Luce-Gas.it è valutato 4.88/5 dai suoi clienti
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Offerte</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-gaspower-green transition-colors">Offerte Luce e Gas</a></li>
                <li><a href="#" className="hover:text-gaspower-green transition-colors">Offerte Luce</a></li>
                <li><a href="#" className="hover:text-gaspower-green transition-colors">Offerte Gas</a></li>
                <li><a href="#" className="hover:text-gaspower-green transition-colors">Gestore Energia più conveniente</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Servizi Utili</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-gaspower-green transition-colors">Confronta le offerte</a></li>
                <li><a href="#" className="hover:text-gaspower-green transition-colors">Bollettometro</a></li>
                <li><a href="#" className="hover:text-gaspower-green transition-colors">Abbassa Bolletta</a></li>
                <li><a href="#" className="hover:text-gaspower-green transition-colors">Trova tuo Distributore</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contatti</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  <button 
                    onClick={handleCallNow}
                    className="hover:text-gaspower-green transition-colors"
                  >
                    06 9450 0303
                  </button>
                </li>
                <li>Lun-Ven: 8:00-21:00</li>
                <li>Sab: 9:00-13:00</li>
                <li><a href="#" className="hover:text-gaspower-green transition-colors">Chi siamo</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-6 sm:my-8 bg-gray-800" />
          
          <div className="text-center text-xs sm:text-sm text-gray-400">
            <p>&copy; 2024 Gas & Power. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

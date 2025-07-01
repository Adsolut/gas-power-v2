
import { Phone, Zap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  onCallNow: () => void;
}

const Footer = ({ onCallNow }: FooterProps) => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 sm:py-12 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <img 
                src="/img/logos/gas-power-logo.svg" 
                alt="Gas & Power Logo" 
                className="h-8 sm:h-10 w-auto drop-shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gaspower-green to-gaspower-darkgreen rounded-lg flex items-center justify-center hidden shadow-lg">
                <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Il comparatore luce e gas numero uno in Italia
            </p>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-2 rounded-lg text-sm font-semibold inline-block shadow-lg">
              Luce-Gas.it è valutato 4.88/5 dai suoi clienti
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-gaspower-green">Offerte</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li><a href="#" className="hover:text-gaspower-green transition-colors hover:drop-shadow-lg">Offerte Luce e Gas</a></li>
              <li><a href="#" className="hover:text-gaspower-green transition-colors hover:drop-shadow-lg">Offerte Luce</a></li>
              <li><a href="#" className="hover:text-gaspower-green transition-colors hover:drop-shadow-lg">Offerte Gas</a></li>
              <li><a href="#" className="hover:text-gaspower-green transition-colors hover:drop-shadow-lg">Gestore Energia più conveniente</a></li>
            </ul>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-gaspower-green">Servizi Utili</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li><a href="#" className="hover:text-gaspower-green transition-colors hover:drop-shadow-lg">Confronta le offerte</a></li>
              <li><a href="#" className="hover:text-gaspower-green transition-colors hover:drop-shadow-lg">Bollettometro</a></li>
              <li><a href="#" className="hover:text-gaspower-green transition-colors hover:drop-shadow-lg">Abbassa Bolletta</a></li>
              <li><a href="#" className="hover:text-gaspower-green transition-colors hover:drop-shadow-lg">Trova tuo Distributore</a></li>
            </ul>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-gaspower-green">Contatti</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-gaspower-blue" />
                <button 
                  onClick={onCallNow}
                  className="hover:text-gaspower-green transition-colors font-semibold hover:drop-shadow-lg active:scale-95 transition-transform"
                >
                  Chiama ora!
                </button>
              </li>
              <li className="text-gray-400">Lun-Ven: 8:00-21:00</li>
              <li className="text-gray-400">Sab: 9:00-13:00</li>
              <li><a href="#" className="hover:text-gaspower-green transition-colors hover:drop-shadow-lg">Chi siamo</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 sm:my-8 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="text-center text-xs sm:text-sm text-gray-400 bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10">
          <div className="mb-3">
            <p className="font-semibold text-gray-300 mb-1">GAS & POWER RETAIL S.R.L.</p>
            <p>Via A. Gramsci 17/B, Napoli 80122</p>
            <p>P.IVA: IT09909151210</p>
          </div>
          <p>&copy; 2025 Gas & Power. Tutti i diritti riservati.</p>
          <a 
            href="/dashboard" 
            className="text-gray-600 hover:text-gray-400 text-xs opacity-50 hover:opacity-100 transition-all"
            title="Dashboard Admin"
          >
            .
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

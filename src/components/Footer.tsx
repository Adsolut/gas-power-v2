
import { Phone, Zap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  onCallNow: () => void;
}

const Footer = ({ onCallNow }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <img 
                src="/img/logos/gas-power-logo.svg" 
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
                  onClick={onCallNow}
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
  );
};

export default Footer;

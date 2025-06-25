
import { Phone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCallNow: () => void;
}

const Header = ({ onCallNow }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg border-b border-primary-200 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/img/logos/gas-power-logo.svg" 
              alt="Gas & Power Logo" 
              className="h-12 sm:h-16 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gaspower-green to-gaspower-darkgreen rounded-lg flex items-center justify-center hidden">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={onCallNow} 
              className="bg-gaspower-blue hover:bg-blue-600 text-white font-semibold px-3 sm:px-6 py-2 text-sm sm:text-base shadow-lg"
            >
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">02 </span>4013 7880
            </Button>
            <Button 
              variant="outline"
              className="text-gaspower-blue border-gaspower-blue hover:bg-gaspower-blue hover:text-white font-semibold px-3 sm:px-6 py-2 text-sm sm:text-base shadow-md"
            >
              📞 Fatti richiamare
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

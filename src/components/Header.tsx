
import { Phone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCallNow: () => void;
}

const Header = ({ onCallNow }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-primary-200 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/img/logos/gas-power-logo.svg" 
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
              onClick={onCallNow} 
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
  );
};

export default Header;

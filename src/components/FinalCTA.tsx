
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  onCallNow: () => void;
}

const FinalCTA = ({ onCallNow }: FinalCTAProps) => {
  return (
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
              onClick={onCallNow} 
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
  );
};

export default FinalCTA;

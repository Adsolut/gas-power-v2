import { useState } from 'react';
import { Phone, Zap, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OptimizedHeaderProps {
  onCallNow: () => void;
  onCallbackRequest?: (data: any) => void;
}

const OptimizedHeader = ({ onCallNow, onCallbackRequest }: OptimizedHeaderProps) => {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackData, setCallbackData] = useState({
    name: '',
    phone: '',
    preferredTime: 'mattina'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDirectCall = () => {
    onCallNow();
  };

  const handleCallbackSubmit = async () => {
    if (!callbackData.phone.trim()) {
      alert('Inserisci il tuo numero di telefono');
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        ...callbackData,
        source: 'header'
      };

      onCallbackRequest?.(requestData);
      
      // Show success message
      alert(`Perfetto! Ti richiameremo al ${callbackData.phone} ${callbackData.preferredTime === 'mattina' ? 'in mattinata' : 'nel pomeriggio'}`);
      
      setIsCallbackOpen(false);
      setCallbackData({ name: '', phone: '', preferredTime: 'mattina' });
    } catch (error) {
      console.error('Error submitting callback request:', error);
      alert('Errore nell\'invio della richiesta. Riprova o chiama direttamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-primary-200 relative z-30 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
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
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center hidden">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>

          {/* Trust Signal Desktop */}
          <div className="hidden lg:flex items-center text-sm text-gray-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
            <Users className="h-4 w-4 mr-2 text-green-600" />
            <span className="font-semibold text-green-600">200.000+</span>
            <span className="ml-1">clienti soddisfatti dal 2015</span>
          </div>
          
          {/* CTA Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Direct Call Button */}
            <a
              href="tel:+390299220697"
              onClick={handleDirectCall} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95 inline-flex items-center rounded-md no-underline"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
              0299220697
            </a>
            
            {/* Callback Button with Dialog */}
            <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-3 sm:px-6 py-2 text-sm sm:text-base shadow-md transform hover:scale-105 transition-all duration-200"
                >
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Chiamiamo noi!
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center text-blue-600">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Chiamiamo noi gratis!
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 font-medium">
                      ✅ Consulenza gratuita e senza impegno
                    </p>
                    <p className="text-sm text-green-700">
                      ⚡ Ti chiamiamo entro 15 minuti in orario lavorativo
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="callback-name">Nome (opzionale)</Label>
                      <Input
                        id="callback-name"
                        value={callbackData.name}
                        onChange={(e) => setCallbackData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Il tuo nome"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="callback-phone">Numero di telefono *</Label>
                      <Input
                        id="callback-phone"
                        type="tel"
                        value={callbackData.phone}
                        onChange={(e) => setCallbackData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="3XX XXX XXXX"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="callback-time">Quando preferisci essere ricontattato?</Label>
                      <Select value={callbackData.preferredTime} onValueChange={(value) => setCallbackData(prev => ({ ...prev, preferredTime: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mattina">Mattina (9:00-13:00)</SelectItem>
                          <SelectItem value="pomeriggio">Pomeriggio (14:00-18:00)</SelectItem>
                          <SelectItem value="sera">Sera (18:00-21:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleCallbackSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-green-600 hover:bg-green-700 font-bold"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Invio...
                        </div>
                      ) : (
                        <>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chiamatemi!
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCallbackOpen(false)}
                      disabled={isSubmitting}
                    >
                      Annulla
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    🕐 Lun-Ven 8:00-21:00, Sab 9:00-13:00
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      {/* Mobile Trust Bar */}
      <div className="lg:hidden bg-green-600 text-white px-4 py-2 text-center text-sm font-medium">
        👥 Oltre 200.000 clienti si sono fidati di noi • Consulenza 100% gratuita
      </div>
    </header>
  );
};

export default OptimizedHeader;

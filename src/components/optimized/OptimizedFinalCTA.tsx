import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Clock, Users, Star } from 'lucide-react';
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

interface CallbackData {
  name: string;
  phone: string;
  preferredTime: string;
  source?: string;
}

interface OptimizedFinalCTAProps {
  onCallNow: () => void;
  onCallbackRequest?: (data: CallbackData) => void;
}

const OptimizedFinalCTA = ({ onCallNow, onCallbackRequest }: OptimizedFinalCTAProps) => {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackData, setCallbackData] = useState({
    name: '',
    phone: '',
    preferredTime: 'mattina'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onlineUsers] = useState(Math.floor(Math.random() * 6) + 1); // Simula consulenti disponibili (1-6)
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minuti in secondi

  // Countdown timer per urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          return 25 * 60; // Reset a 25 minuti
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
        source: 'final_cta'
      };

      onCallbackRequest?.(requestData);
      
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
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-green-500 to-green-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Urgency Banner */}
        <div className="bg-red-500 text-white text-center py-3 rounded-lg mb-6 shadow-lg animate-pulse">
          <div className="flex items-center justify-center space-x-4">
            <Clock className="h-5 w-5" />
            <span className="font-bold">
              ⏰ OFFERTA LIMITATA: consulenza gratuita scade tra {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            🏆 Il portale Luce e Gas #1 in Italia
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6">
            Unisciti a oltre <span className="font-bold text-yellow-300">2.000.000 famiglie</span> che risparmiano con noi
          </p>
        </div>

        {/* Stats and Social Proof */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-300 mb-2">€300</div>
            <div className="text-white text-sm">Risparmio medio annuo</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-300 mb-2">4.8★</div>
            <div className="text-white text-sm">Rating clienti su Trustpilot</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-300 mb-2">2min</div>
            <div className="text-white text-sm">Tempo medio attivazione</div>
          </div>
        </div>

        {/* Main CTA Box */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 sm:p-8 mb-6 shadow-2xl">
          
          {/* Live Status */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              CONSULENTI ONLINE
            </div>
            <div className="text-white font-medium">
              <Users className="h-4 w-4 inline mr-1" />
              {onlineUsers} consulenti disponibili ora
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-white font-bold text-lg mb-2">
              💬 Chiamaci per info e attivazioni GRATUITE
            </div>
            <div className="text-white/80 text-sm">
              📞 Dal lunedì al venerdì dalle 8 alle 21 e il sabato dalle 9 alle 13
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+390299220697"
              onClick={handleDirectCall} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto min-w-[250px] sm:min-w-[200px] active:scale-95 inline-flex items-center justify-center no-underline text-center"
            >
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              📞 0299220697
            </a>
            
            {/* Callback Dialog */}
            <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="bg-white/90 text-blue-600 border-2 border-white hover:bg-white hover:scale-105 font-bold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-200 min-w-[200px]"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  📞 Chiamiamo noi!
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center text-blue-600">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Ti richiamiamo in 15 minuti!
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 font-medium">
                      ✅ Consulenza 100% gratuita e senza impegno
                    </p>
                    <p className="text-sm text-green-700">
                      ⚡ Risparmio garantito o rimborsi il tempo perso
                    </p>
                    <p className="text-sm text-green-700">
                      🏆 Assistenza post-vendita dedicata
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="final-name">Nome (opzionale)</Label>
                      <Input
                        id="final-name"
                        value={callbackData.name}
                        onChange={(e) => setCallbackData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Il tuo nome"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="final-phone">Numero di telefono *</Label>
                      <Input
                        id="final-phone"
                        type="tel"
                        value={callbackData.phone}
                        onChange={(e) => setCallbackData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="3XX XXX XXXX"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="final-time">Quando preferisci essere ricontattato?</Label>
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
                          Richiedi chiamata
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
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Final Trust Signals */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-6 text-white/80 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-300" />
              4.8/5 su Trustpilot
            </div>
            <div>🔒 GDPR Compliant</div>
            <div>✅ Certificato ISO 9001</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedFinalCTA;

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StickyMobileCTAProps {
  phoneNumber?: string;
  onDirectCall?: () => void;
  onRequestCallback?: (data: any) => void;
  className?: string;
}

const StickyMobileCTA = ({ 
  phoneNumber = '0240137880',
  onDirectCall,
  onRequestCallback,
  className 
}: StickyMobileCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackData, setCallbackData] = useState({
    phone: '',
    name: '',
    preferredTime: 'mattina'
  });

  useEffect(() => {
    const handleScroll = () => {
      // Mostra il sticky CTA dopo aver scrollato 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDirectCall = () => {    
    onDirectCall?.();
  };

  const handleCallbackRequest = () => {
    if (!callbackData.phone.trim()) {
      alert('Inserisci il tuo numero di telefono');
      return;
    }

    const requestData = {
      ...callbackData,
      source: 'sticky_mobile'
    };

    onRequestCallback?.(requestData);
    
    // Show success message
    alert(`Perfetto! Ti richiameremo al ${callbackData.phone} ${callbackData.preferredTime === 'mattina' ? 'in mattinata' : 'nel pomeriggio'}`);
    
    setShowCallbackForm(false);
    setIsExpanded(false);
    setCallbackData({ phone: '', name: '', preferredTime: 'mattina' });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      {showCallbackForm && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowCallbackForm(false)}
        />
      )}

      {/* Sticky CTA Container */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
        className
      )}>
        
        {/* Callback Form Modal */}
        {showCallbackForm && (
          <div className="bg-white p-6 border-t border-gray-200 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-blue-600">Ti richiamiamo gratis!</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowCallbackForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={callbackData.name}
                  onChange={(e) => setCallbackData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Il tuo nome"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Telefono *</label>
                <input
                  type="tel"
                  value={callbackData.phone}
                  onChange={(e) => setCallbackData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="3XX XXX XXXX"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Quando preferisci?</label>
                <select
                  value={callbackData.preferredTime}
                  onChange={(e) => setCallbackData(prev => ({ ...prev, preferredTime: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="mattina">Mattina (9:00-13:00)</option>
                  <option value="pomeriggio">Pomeriggio (14:00-18:00)</option>
                  <option value="sera">Sera (18:00-21:00)</option>
                </select>
              </div>
              
              <Button 
                onClick={handleCallbackRequest}
                className="w-full bg-green-600 hover:bg-green-700 font-bold py-3"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Richiedi la chiamata
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Ti ricontatteremo entro 15 minuti in orario lavorativo
              </p>
            </div>
          </div>
        )}

        {/* Main CTA Bar */}
        <div className="bg-white border-t border-gray-200 shadow-lg">
          {isExpanded ? (
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-blue-600">💰 Risparmia fino a €300/anno!</p>
                  <p className="text-sm text-gray-600">⚡ Consulenza gratuita immediata</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleDirectCall}
                  className="bg-blue-600 hover:bg-blue-700 font-bold py-3 shadow-lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Chiama Ora
                </Button>
                <Button 
                  onClick={() => setShowCallbackForm(true)}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ti richiamiamo
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">🕐 Lun-Ven 8-21, Sab 9-13</p>
              </div>
            </div>
          ) : (
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-blue-600">Confronto Gratuito</p>
                  <p className="text-sm text-gray-600">Tocca per risparmiare!</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  LIVE
                </div>
                <p className="text-xs text-gray-500 mt-1">👥 12 online ora</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StickyMobileCTA;

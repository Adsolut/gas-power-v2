// src/components/AnimatedHeader.tsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Phone, MessageCircle, Menu, X, Shield, Clock, Star } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { useConversionTracking } from '@/hooks/useConversionTracking';

interface AnimatedHeaderProps {
  onCallNow?: () => void;
  onCallbackRequest?: (data: any) => void;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ 
  onCallNow, 
  onCallbackRequest 
}) => {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useConversionTracking();
  
  const [callbackData, setCallbackData] = useState({
    name: '',
    phone: '',
    preferredTime: 'mattina'
  });

  const { scrollY } = useScroll();
  
  // Logo animations based on scroll
  const logoScale = useTransform(scrollY, [0, 100, 200], [1, 0.8, 0.7]);
  const logoX = useTransform(scrollY, [0, 100, 200], [0, -10, -20]);
  const logoY = useTransform(scrollY, [0, 100, 200], [0, -5, -10]);
  
  // Smooth spring animations
  const springConfig = { stiffness: 300, damping: 30 };
  const springScale = useSpring(logoScale, springConfig);
  const springX = useSpring(logoX, springConfig);
  const springY = useSpring(logoY, springConfig);
  
  // Header background opacity based on scroll
  const headerBg = useTransform(scrollY, [0, 50], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.98)']);
  const headerShadow = useTransform(scrollY, [0, 50], ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.1)']);
  const headerBorder = useTransform(scrollY, [0, 50], ['rgba(229,231,235,0)', 'rgba(229,231,235,1)']);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
      
      // Calculate scroll progress for additional effects
      const maxScroll = 300;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDirectCall = () => {
    trackEvent('header_call_click');
    onCallNow?.();
  };

  const handleCallbackSubmit = async () => {
    if (!callbackData.phone.trim()) {
      alert('Inserisci il tuo numero di telefono');
      return;
    }

    setIsSubmitting(true);
    
    try {
      trackEvent('callback_request', { source: 'header' });
      onCallbackRequest?.({
        ...callbackData,
        source: 'header',
        timestamp: new Date().toISOString()
      });
      
      // Success feedback
      alert(`Perfetto! Ti richiameremo al ${callbackData.phone} ${
        callbackData.preferredTime === 'mattina' ? 'in mattinata' : 
        callbackData.preferredTime === 'pomeriggio' ? 'nel pomeriggio' : 'in serata'
      }`);
      
      setIsCallbackOpen(false);
      setCallbackData({ name: '', phone: '', preferredTime: 'mattina' });
    } catch (error) {
      console.error('Callback request error:', error);
      alert('Errore nell\'invio. Riprova o chiama direttamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: headerBg,
          boxShadow: headerShadow,
          borderBottom: `1px solid ${headerBorder}`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3 md:py-4">
            
            {/* Logo Section with Advanced Animations */}
            <motion.div 
              className="flex items-center relative z-10"
              style={{
                scale: springScale,
                x: springX,
                y: springY,
              }}
            >
              {/* Logo Container with Glow Effect */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated Glow Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    opacity: scrollProgress * 0.5
                  }}
                />
                
                {/* Gas & Power Logo */}
                <img 
                  src={`${import.meta.env.BASE_URL}img/logos/gas-power-logo.svg`}
                  alt="Gas & Power Logo" 
                  className="h-12 md:h-16 w-auto transition-all duration-300"
                  style={{
                    filter: isScrolled ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' : 'none',
                    maxHeight: '64px',
                    width: 'auto'
                  }}
                />
              </motion.div>
              
              {/* Animated Badge Next to Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden md:block ml-4"
              >
                <Badge 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                  style={{
                    opacity: 1 - scrollProgress
                  }}
                >
                  <Star className="w-3 h-3 mr-1" />
                  15.000+ Clienti
                </Badge>
              </motion.div>
            </motion.div>

            {/* Center Trust Indicators - Desktop Only */}
            <motion.div 
              className="hidden lg:flex items-center gap-6"
              style={{
                opacity: 1 - scrollProgress * 0.5
              }}
            >
              {[
                { icon: Shield, text: '100% Gratuito' },
                { icon: Clock, text: 'Attivazione 24h' },
                { icon: Star, text: '4.8/5 Rating' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <item.icon className="w-4 h-4 text-blue-600" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Mobile Menu Toggle */}
              <motion.button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </motion.button>

              {/* Desktop CTAs */}
              <div className="hidden md:flex items-center gap-3">
                {/* Callback Button */}
                <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
                  <DialogTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        opacity: 1 - scrollProgress * 0.3
                      }}
                    >
                      <Button 
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Ti Chiamiamo
                      </Button>
                    </motion.div>
                  </DialogTrigger>
                  
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center text-blue-600">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Richiedi Callback Gratuita
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800 font-medium">
                          ✅ Consulenza gratuita e senza impegno
                        </p>
                        <p className="text-sm text-green-700">
                          ⚡ Ti chiamiamo entro 15 minuti
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name">Nome (opzionale)</Label>
                          <Input
                            id="name"
                            value={callbackData.name}
                            onChange={(e) => setCallbackData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Il tuo nome"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Telefono *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={callbackData.phone}
                            onChange={(e) => setCallbackData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="333 1234567"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="time">Quando preferisci?</Label>
                          <Select 
                            value={callbackData.preferredTime} 
                            onValueChange={(value) => setCallbackData(prev => ({ ...prev, preferredTime: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mattina">Mattina (9-13)</SelectItem>
                              <SelectItem value="pomeriggio">Pomeriggio (14-18)</SelectItem>
                              <SelectItem value="sera">Sera (18-21)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          onClick={handleCallbackSubmit}
                          disabled={isSubmitting}
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                        >
                          {isSubmitting ? 'Invio...' : 'Chiamatemi!'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsCallbackOpen(false)}
                        >
                          Annulla
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Main CTA - Phone */}
                <motion.a
                  href="tel:+390212345678"
                  onClick={handleDirectCall}
                  className="no-underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-bold">02 1234 5678</span>
                  </Button>
                </motion.a>
              </div>

              {/* Mobile CTA - Always Visible */}
              <motion.a
                href="tel:+390212345678"
                onClick={handleDirectCall}
                className="md:hidden no-underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  scale: 1 + scrollProgress * 0.1
                }}
              >
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg px-3 py-2">
                  <Phone className="h-4 w-4 mr-1" />
                  <span className="text-sm font-bold">Chiama</span>
                </Button>
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <motion.div
            initial={false}
            animate={{
              height: isMobileMenuOpen ? 'auto' : 0,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-gray-200"
          >
            <div className="py-4 space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCallbackOpen(true);
                }}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Richiedi Callback
              </Button>
              
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 pt-2">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.8/5</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
          style={{
            width: `${scrollProgress * 100}%`,
            opacity: scrollProgress
          }}
        />
      </motion.header>

      {/* Spacer to prevent content jump */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default AnimatedHeader;

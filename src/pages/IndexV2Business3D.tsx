// src/pages/IndexV2Business3D.tsx
import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversionTracking } from '@/hooks/useConversionTracking';
import { useSEO } from '@/hooks/useSEO';
import SEOHead from '@/components/SEO/SEOHead';
import AnimatedHeader from '@/components/AnimatedHeader';
import Hero3D from '@/components/Hero3D';
import { 
  ParallaxSection, 
  Card3D, 
  FadeInWhenVisible, 
  ScaleOnScroll,
  Hover3DCard,
  TextReveal,
  FloatingElement,
  MorphingBackground
} from '@/components/ScrollEffects';
import { 
  Zap, Shield, TrendingUp, Users, ChartBar, Clock, 
  ArrowRight, CheckCircle, Star, Phone, Mail, Crown,
  FileText, Bell, Euro, Sparkles, Target, Activity,
  Award, Rocket, Gift, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Marquee from 'react-fast-marquee';

// Lazy load heavy components
const BillUploadAnalyzer = lazy(() => import('@/components/BillUploadAnalyzer'));
const PowerProSubscription = lazy(() => import('@/components/PowerProSubscription'));

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
    />
  </div>
);

const IndexV2Business3D = () => {
  const { trackEvent, handleDirectCall, handleCallbackRequest } = useConversionTracking();
  const { initSEO } = useSEO();
  const [showPowerPro, setShowPowerPro] = useState(false);
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    initSEO({
      title: 'Gas Power Compara - Risparmia fino al 40% su Luce e Gas | Analisi Gratuita',
      description: 'Confronta le migliori offerte luce e gas in Italia. Upload bolletta per analisi immediata. Power Pro: il tuo consulente energetico personale a €1.99/mese.',
      keywords: 'confronto bollette, risparmio energia, offerte luce gas, power pro, consulenza energetica',
      ogImage: '/og-image-v2.jpg',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Gas Power Compara",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "description": "Analisi bolletta gratuita"
        }
      }
    });
    
    trackEvent('page_view', { page: 'index_v2_business_3d' });
  }, [initSEO, trackEvent]);

  const stats = [
    { label: 'Utenti Attivi', value: 15000, suffix: '+', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Risparmio Medio', value: 327, prefix: '€', suffix: '/anno', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'Bollette Analizzate', value: 50000, suffix: '+', icon: FileText, color: 'from-purple-500 to-purple-600' },
    { label: 'Soddisfazione', value: 4.8, decimals: 1, suffix: '/5.0', icon: Star, color: 'from-yellow-500 to-yellow-600' }
  ];

  const features = [
    {
      title: 'Upload e Analisi Immediata',
      description: 'Carica la bolletta e ricevi subito il confronto con le migliori offerte',
      icon: Zap,
      badge: 'Gratuito',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Monitoraggio Intelligente',
      description: 'Power Pro monitora i tuoi consumi e ti avvisa quando puoi risparmiare',
      icon: Activity,
      badge: 'Premium',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Consulenza Dedicata',
      description: 'Supporto personalizzato per ottimizzare i tuoi contratti energetici',
      icon: Phone,
      badge: 'Premium',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Report Dettagliati',
      description: 'Analisi mensili con insights AI per ridurre i consumi',
      icon: ChartBar,
      badge: 'Premium',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Marco Bianchi',
      role: 'Imprenditore',
      content: 'Ho risparmiato oltre €800 in un anno grazie a Power Pro. Il sistema di alert è fantastico!',
      rating: 5,
      saving: '€800/anno',
      avatar: '👨‍💼'
    },
    {
      name: 'Laura Santini',
      role: 'Famiglia di 4',
      content: 'Finalmente capisco le mie bollette! I report mensili sono chiarissimi e utili.',
      rating: 5,
      saving: '€450/anno',
      avatar: '👩‍👧‍👦'
    },
    {
      name: 'Giuseppe Romano',
      role: 'Ristoratore',
      content: 'Il consulente dedicato mi ha aiutato a ridurre i costi energetici del 35%.',
      rating: 5,
      saving: '€2.400/anno',
      avatar: '👨‍🍳'
    }
  ];

  const partners = [
    'Enel Energia', 'Eni Plenitude', 'Iren', 'A2A Energia', 
    'Edison', 'Sorgenia', 'Acea', 'Hera Comm', 'Illumia', 'Wekiwi'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
      <SEOHead />
      
      {/* Animated Header with Logo */}
      <AnimatedHeader 
        onCallNow={() => handleDirectCall('header')}
        onCallbackRequest={handleCallbackRequest}
      />
      
      {/* 3D Hero Section */}
      <Hero3D />

      {/* Animated Stats Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <MorphingBackground className="opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              I Numeri del <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Successo</span>
            </h2>
          </FadeInWhenVisible>
          
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <FadeInWhenVisible key={idx} delay={idx * 0.1}>
                <Card3D>
                  <div className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-2xl`}>
                    <stat.icon className="w-10 h-10 mb-4 opacity-80" />
                    <div className="text-3xl font-bold mb-2">
                      {statsInView && (
                        <>
                          {stat.prefix}
                          <CountUp
                            end={stat.value}
                            decimals={stat.decimals || 0}
                            duration={2.5}
                            separator=","
                          />
                          {stat.suffix}
                        </>
                      )}
                    </div>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                  </div>
                </Card3D>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="py-8 bg-white border-y">
        <Marquee gradient={false} speed={40}>
          {partners.concat(partners).map((partner, idx) => (
            <div key={idx} className="mx-8 flex items-center">
              <span className="text-gray-400 font-medium text-lg">{partner}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Main Service Section with 3D Cards */}
      <section id="upload-section" className="py-20 relative">
        <ParallaxSection className="absolute inset-0" bgImage="/img/energy-bg.jpg" strength={200} />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScaleOnScroll>
            <div className="text-center mb-12">
              <Badge className="mb-4 px-6 py-2 text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Scegli il Tuo Percorso
              </Badge>
              <TextReveal 
                text="Come Preferisci Iniziare il Tuo Viaggio nel Risparmio?" 
                className="text-4xl font-bold mb-4"
              />
              <p className="text-gray-600 text-lg">Scegli il servizio più adatto alle tue esigenze</p>
            </div>
          </ScaleOnScroll>
          
          <Tabs defaultValue="free" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100/50 backdrop-blur">
              <TabsTrigger 
                value="free" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                <FileText className="mr-2 h-4 w-4" />
                Analisi Gratuita
              </TabsTrigger>
              <TabsTrigger 
                value="pro" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Crown className="mr-2 h-4 w-4" />
                Power Pro Premium
              </TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <TabsContent value="free" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Hover3DCard>
                    <Card className="shadow-2xl border-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
                      <CardHeader className="relative">
                        <CardTitle className="text-2xl">Analisi Gratuita Immediata</CardTitle>
                        <CardDescription>
                          Carica la tua bolletta e ricevi subito il confronto con le migliori offerte
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative">
                        <Suspense fallback={<LoadingSpinner />}>
                          <BillUploadAnalyzer />
                        </Suspense>
                      </CardContent>
                    </Card>
                  </Hover3DCard>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="pro" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Suspense fallback={<LoadingSpinner />}>
                    <PowerProSubscription />
                  </Suspense>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Features Grid with 3D Effects */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Perché Scegliere <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Gas Power Compara</span>
              </h2>
              <p className="text-gray-600 text-lg">Strumenti professionali per gestire e ottimizzare le tue bollette</p>
            </div>
          </FadeInWhenVisible>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FadeInWhenVisible key={idx} delay={idx * 0.1} direction="up">
                <Card3D scale={1.1}>
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <CardHeader className="relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 shadow-lg`}>
                        <feature.icon className="w-full h-full text-white" />
                      </div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <Badge variant={feature.badge === 'Gratuito' ? 'secondary' : 'default'} className="w-fit">
                        {feature.badge}
                      </Badge>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Card3D>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with 3D Cards */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <ScaleOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Storie di <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Successo</span>
              </h2>
              <p className="text-gray-600 text-lg">Oltre 15.000 famiglie e aziende risparmiano con noi</p>
            </div>
          </ScaleOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <FadeInWhenVisible key={idx} delay={idx * 0.2} direction="up">
                <Hover3DCard>
                  <Card className="h-full shadow-xl border-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full -mr-16 -mt-16 opacity-20" />
                    <CardHeader className="relative">
                      <div className="text-5xl mb-4">{testimonial.avatar}</div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Badge className="w-fit bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        Risparmio: {testimonial.saving}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                      <div className="pt-4 border-t">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Hover3DCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with 3D Effect */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        <MorphingBackground className="opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScaleOnScroll maxScale={1.1}>
            <div className="text-center text-white">
              <FloatingElement duration={3}>
                <Gift className="w-20 h-20 mx-auto mb-6 text-yellow-300" />
              </FloatingElement>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Inizia a Risparmiare <span className="text-yellow-300">Oggi Stesso</span>
              </h2>
              
              <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                Unisciti a oltre 15.000 clienti soddisfatti che risparmiano ogni mese grazie ai nostri servizi
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold shadow-2xl"
                    onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Rocket className="mr-2 h-6 w-6" />
                    Inizia Analisi Gratuita
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/20 px-8 py-6 text-lg font-bold"
                    onClick={() => window.location.href = 'tel:+390212345678'}
                  >
                    <Phone className="mr-2 h-6 w-6" />
                    Chiama: 02 1234 5678
                  </Button>
                </motion.div>
              </div>
              
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>100% Sicuro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Attivazione 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>Garanzia Risparmio</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>Zero Commissioni</span>
                </div>
              </div>
            </div>
          </ScaleOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-4">© 2024 Gas Power Compara. Tutti i diritti riservati.</p>
            <p className="text-gray-400">
              Sviluppato con <Heart className="inline w-4 h-4 text-red-500" /> per aiutare famiglie e aziende italiane
            </p>
          </div>
        </div>
      </footer>

      {/* Power Pro Modal */}
      <AnimatePresence>
        {showPowerPro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4 z-50"
            onClick={() => setShowPowerPro(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl max-w-6xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold">Power Pro Premium</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowPowerPro(false)}
                >
                  ×
                </Button>
              </div>
              <div className="p-4">
                <Suspense fallback={<LoadingSpinner />}>
                  <PowerProSubscription />
                </Suspense>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndexV2Business3D;

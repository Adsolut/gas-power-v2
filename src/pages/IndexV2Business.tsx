// src/pages/IndexV2Business.tsx
import { lazy, Suspense, useEffect, useState } from 'react';
import { useConversionTracking } from '@/hooks/useConversionTracking';
import { useSEO } from '@/hooks/useSEO';
import SEOHead from '@/components/SEO/SEOHead';
import { 
  Zap, Shield, TrendingUp, Users, ChartBar, Clock, 
  ArrowRight, CheckCircle, Star, Phone, Mail, Crown,
  FileText, Bell, Euro, Sparkles, Target, Activity, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Lazy load heavy components
const BillUploadAnalyzer = lazy(() => import('@/components/BillUploadAnalyzer'));
const PowerProSubscription = lazy(() => import('@/components/PowerProSubscription'));

const IndexV2Business = () => {
  const { trackEvent } = useConversionTracking();
  const { initSEO } = useSEO();
  const [showPowerPro, setShowPowerPro] = useState(false);

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
    
    trackEvent('page_view', { page: 'index_v2_business' });
  }, [initSEO, trackEvent]);

  const stats = [
    { label: 'Utenti Attivi', value: '15.000+', icon: Users, color: 'text-blue-600' },
    { label: 'Risparmio Medio', value: '€327/anno', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Bollette Analizzate', value: '50.000+', icon: FileText, color: 'text-purple-600' },
    { label: 'Soddisfazione', value: '4.8/5.0', icon: Star, color: 'text-yellow-600' }
  ];

  const features = [
    {
      title: 'Upload e Analisi Immediata',
      description: 'Carica la bolletta e ricevi subito il confronto con le migliori offerte',
      icon: Zap,
      badge: 'Gratuito'
    },
    {
      title: 'Monitoraggio Intelligente',
      description: 'Power Pro monitora i tuoi consumi e ti avvisa quando puoi risparmiare',
      icon: Activity,
      badge: 'Premium'
    },
    {
      title: 'Consulenza Dedicata',
      description: 'Supporto personalizzato per ottimizzare i tuoi contratti energetici',
      icon: Phone,
      badge: 'Premium'
    },
    {
      title: 'Report Dettagliati',
      description: 'Analisi mensili con insights AI per ridurre i consumi',
      icon: ChartBar,
      badge: 'Premium'
    }
  ];

  const testimonials = [
    {
      name: 'Marco Bianchi',
      role: 'Imprenditore',
      content: 'Ho risparmiato oltre €800 in un anno grazie a Power Pro. Il sistema di alert è fantastico!',
      rating: 5,
      saving: '€800/anno'
    },
    {
      name: 'Laura Santini',
      role: 'Famiglia di 4',
      content: 'Finalmente capisco le mie bollette! I report mensili sono chiarissimi e utili.',
      rating: 5,
      saving: '€450/anno'
    },
    {
      name: 'Giuseppe Romano',
      role: 'Ristoratore',
      content: 'Il consulente dedicato mi ha aiutato a ridurre i costi energetici del 35%.',
      rating: 5,
      saving: '€2.400/anno'
    }
  ];

  const faqs = [
    {
      question: 'Come funziona l\'analisi gratuita della bolletta?',
      answer: 'Carica una foto o PDF della tua bolletta. Il nostro sistema analizza automaticamente i tuoi consumi e confronta con oltre 50 fornitori per trovare le migliori offerte.'
    },
    {
      question: 'Cos\'è Power Pro?',
      answer: 'Power Pro è il servizio premium che monitora continuamente le tue bollette, ti avvisa di opportunità di risparmio e fornisce consulenza personalizzata. Solo €1.99/mese, cancellabile sempre.'
    },
    {
      question: 'I miei dati sono al sicuro?',
      answer: 'Assolutamente sì. Utilizziamo crittografia bancaria e siamo conformi GDPR. Non vendiamo mai i tuoi dati a terzi.'
    },
    {
      question: 'Quanto posso risparmiare realmente?',
      answer: 'I nostri utenti risparmiano in media €327/anno. Con Power Pro e la consulenza dedicata, molti superano i €500 di risparmio annuale.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SEOHead />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="inline-flex items-center gap-2 px-4 py-2" variant="secondary">
              <Sparkles className="h-4 w-4" />
              Nuovo: Power Pro - Il tuo consulente energetico personale
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Risparmia fino al 40% su Luce e Gas
            </h1>
            
            <p className="text-xl text-gray-600">
              Confronta gratuitamente le migliori offerte energetiche in Italia.
              <br />Upload la bolletta e scopri subito quanto puoi risparmiare.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Zap className="mr-2 h-5 w-5" />
                Analizza Bolletta Gratis
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowPowerPro(true)}
              >
                <Crown className="mr-2 h-5 w-5 text-yellow-500" />
                Scopri Power Pro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Service Tabs */}
      <section id="upload-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Come Preferisci Iniziare?</h2>
            <p className="text-gray-600">Scegli il servizio più adatto alle tue esigenze</p>
          </div>
          
          <Tabs defaultValue="free" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="free" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                <FileText className="mr-2 h-4 w-4" />
                Analisi Gratuita
              </TabsTrigger>
              <TabsTrigger value="pro" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                <Crown className="mr-2 h-4 w-4" />
                Power Pro Premium
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="free" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Analisi Gratuita Immediata</CardTitle>
                  <CardDescription>
                    Carica la tua bolletta e ricevi subito il confronto con le migliori offerte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  }>
                    <BillUploadAnalyzer />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pro" className="mt-8">
              <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              }>
                <PowerProSubscription />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perché Scegliere Gas Power Compara</h2>
            <p className="text-gray-600">Strumenti professionali per gestire e ottimizzare le tue bollette</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <Badge variant={feature.badge === 'Gratuito' ? 'secondary' : 'default'}>
                    {feature.badge}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cosa Dicono i Nostri Clienti</h2>
            <p className="text-gray-600">Oltre 15.000 famiglie e aziende risparmiano con noi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge className="w-fit bg-green-100 text-green-800">
                    Risparmio: {testimonial.saving}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Inizia a Risparmiare Oggi Stesso
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Analisi gratuita immediata • Nessun vincolo • Risultati garantiti
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="mr-2 h-5 w-5" />
              Inizia Analisi Gratuita
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white"
              onClick={() => window.location.href = 'tel:+390212345678'}
            >
              <Phone className="mr-2 h-5 w-5" />
              Chiama: 02 1234 5678
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Domande Frequenti</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Gas Power Compara</h3>
              <p className="text-sm text-gray-400">
                Il tuo partner per il risparmio energetico
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Servizi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Analisi Bollette</li>
                <li>Power Pro Premium</li>
                <li>Consulenza Business</li>
                <li>API Enterprise</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Supporto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Centro Assistenza</li>
                <li>FAQ</li>
                <li>Contatti</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contatti</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  02 1234 5678
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  info@gasepower.com
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-800" />
          
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 Gas Power Compara. Tutti i diritti riservati.</p>
            <p className="mt-2">
              P.IVA 12345678901 | Privacy Policy | Termini e Condizioni
            </p>
          </div>
        </div>
      </footer>

      {/* Power Pro Modal */}
      {showPowerPro && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-y-auto">
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
              <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              }>
                <PowerProSubscription />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexV2Business;

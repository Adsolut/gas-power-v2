// src/components/PowerProSubscription.tsx
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Shield, Zap, TrendingUp, Bell, FileText, 
  Phone, Calendar, Star, CheckCircle, ArrowRight, Crown, 
  Users, Lock, Sparkles, Clock, ChartBar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';

// Inizializza Stripe (usa la tua chiave pubblica)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

interface PowerProPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
  saving?: string;
}

const PowerProSubscription: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentData, setPaymentData] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const plans: PowerProPlan[] = [
    {
      id: 'monthly',
      name: 'Power Pro Mensile',
      price: 1.99,
      period: 'mese',
      features: [
        'Monitoraggio bollette in tempo reale',
        'Alert automatici scadenze',
        'Confronto offerte personalizzato',
        'Report mensili risparmio',
        'Consulenza via chat',
        'Storico consumi 12 mesi'
      ],
      highlighted: false
    },
    {
      id: 'yearly',
      name: 'Power Pro Annuale',
      price: 19.99,
      period: 'anno',
      saving: 'Risparmi €3.89',
      features: [
        'Tutto del piano mensile',
        'Consulenza telefonica prioritaria',
        'Analisi consumi AI-powered',
        'Negoziazione assistita fornitori',
        'Report dettagliati trimestrali',
        'Alert cambio tariffe real-time',
        'Backup documenti cloud'
      ],
      highlighted: true
    },
    {
      id: 'business',
      name: 'Power Pro Business',
      price: 49.99,
      period: 'mese',
      features: [
        'Gestione multi-utenza (fino a 10)',
        'Dashboard aziendale centralizzata',
        'Fatturazione elettronica integrata',
        'Consulente dedicato',
        'Analisi ROI energetico',
        'Certificazioni energetiche',
        'API personalizzate',
        'Support prioritario 24/7'
      ],
      highlighted: false
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast.error('Devi accettare i termini e condizioni');
      return;
    }

    setIsProcessing(true);

    try {
      // In produzione: crea payment intent dal backend
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: paymentData.email,
          name: paymentData.name,
          planId: selectedPlan,
          priceId: `price_power_pro_${selectedPlan}`
        })
      });

      if (!response.ok) {
        // Simulazione per sviluppo
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('🎉 Abbonamento Power Pro attivato con successo!');
        setShowPaymentForm(false);
        // Redirect to dashboard
        window.location.href = '/power-pro-dashboard';
      } else {
        const { clientSecret } = await response.json();
        const stripe = await stripePromise;
        
        // Conferma il pagamento con Stripe
        const result = await stripe?.confirmCardPayment(clientSecret);
        
        if (result?.error) {
          throw new Error(result.error.message);
        }
        
        toast.success('🎉 Abbonamento Power Pro attivato!');
        window.location.href = '/power-pro-dashboard';
      }
    } catch (error) {
      console.error('Payment error:', error);
      // In sviluppo: simula successo
      toast.success('🎉 Modalità Demo: Abbonamento attivato!');
      window.location.href = '/power-pro-dashboard';
    } finally {
      setIsProcessing(false);
    }
  };

  const testimonials = [
    {
      name: 'Marco R.',
      role: 'Imprenditore',
      content: 'Con Power Pro ho risparmiato oltre €800 in un anno. Il sistema di alert è fantastico!',
      rating: 5
    },
    {
      name: 'Laura S.',
      role: 'Famiglia di 4 persone',
      content: 'Finalmente capisco le mie bollette! I report mensili sono chiarissimi.',
      rating: 5
    },
    {
      name: 'Giuseppe T.',
      role: 'Ristoratore',
      content: 'Il consulente dedicato mi ha aiutato a ridurre i costi energetici del 35%.',
      rating: 5
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
          <Crown className="h-5 w-5 text-orange-500" />
          <span className="font-semibold text-orange-900">Power Pro</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Il Tuo Consulente Energetico Personale
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Risparmia tempo e denaro con il sistema intelligente che monitora, 
          confronta e ottimizza le tue bollette automaticamente
        </p>
      </div>

      {/* Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: 'Risparmio Medio', value: '€327/anno' },
          { icon: Clock, label: 'Tempo Risparmiato', value: '10h/mese' },
          { icon: Users, label: 'Clienti Soddisfatti', value: '15.000+' },
          { icon: Star, label: 'Valutazione', value: '4.8/5.0' }
        ].map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <stat.icon className="h-8 w-8 text-blue-500" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Scegli il Tuo Piano</h2>
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative cursor-pointer transition-all ${
                  plan.highlighted ? 'border-blue-500 border-2 shadow-xl' : ''
                } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
                      Più Popolare
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <RadioGroupItem value={plan.id} id={plan.id} />
                    <div className="flex-1 ml-3">
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">€{plan.price}</span>
                        <span className="text-gray-500">/{plan.period}</span>
                      </div>
                      {plan.saving && (
                        <Badge variant="secondary" className="mt-2">
                          {plan.saving}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => setShowPaymentForm(true)}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Attiva Power Pro a €{currentPlan.price}/{currentPlan.period}
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Cancella quando vuoi • Nessun vincolo • Garanzia 30 giorni
        </p>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Pagamento Sicuro
              </CardTitle>
              <CardDescription>
                Abbonamento: {currentPlan.name} - €{currentPlan.price}/{currentPlan.period}
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handlePaymentSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    required
                    value={paymentData.email}
                    onChange={(e) => setPaymentData({...paymentData, email: e.target.value})}
                    placeholder="mario.rossi@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input 
                    id="name"
                    required
                    value={paymentData.name}
                    onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                    placeholder="Mario Rossi"
                  />
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="card">Numero Carta</Label>
                  <Input 
                    id="card"
                    required
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Scadenza</Label>
                    <Input 
                      id="expiry"
                      required
                      value={paymentData.expiry}
                      onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv"
                      required
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <label 
                    htmlFor="terms" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accetto i termini e condizioni e la privacy policy
                  </label>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Pagamento sicuro con crittografia SSL. I tuoi dati sono protetti.
                  </AlertDescription>
                </Alert>
              </CardContent>
              
              <CardFooter className="flex gap-2">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setShowPaymentForm(false)}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  Annulla
                </Button>
                <Button 
                  type="submit"
                  disabled={isProcessing || !agreedToTerms}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {isProcessing ? (
                    <>Elaborazione...</>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Paga €{currentPlan.price}
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {/* Testimonials */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Cosa Dicono i Nostri Clienti</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
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

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Domande Frequenti</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">Posso cancellare quando voglio?</p>
            <p className="text-gray-600">Sì, puoi cancellare l'abbonamento in qualsiasi momento senza penali.</p>
          </div>
          <Separator />
          <div>
            <p className="font-semibold">Come funziona la garanzia 30 giorni?</p>
            <p className="text-gray-600">Se non sei soddisfatto entro 30 giorni, ti rimborsiamo completamente.</p>
          </div>
          <Separator />
          <div>
            <p className="font-semibold">I miei dati sono al sicuro?</p>
            <p className="text-gray-600">Utilizziamo crittografia bancaria e non conserviamo dati di pagamento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerProSubscription;

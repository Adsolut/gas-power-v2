import React, { useState } from 'react';
import { Phone, TrendingUp, FileText, Calendar, Home, Zap, CheckCircle, ArrowRight, Star, Users, Euro, Calculator } from 'lucide-react';

// Extend Window interface for analytics
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

interface PowerProPresentationProps {
  onCallNow?: () => void;
}

const PowerProPresentation: React.FC<PowerProPresentationProps> = ({ onCallNow }) => {
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [waitlistData, setWaitlistData] = useState({
    email: '',
    phone: '',
    notify: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const powerProServices = [
    {
      icon: Home,
      title: "Analisi Personalizzata Abitazione",
      description: "Valutazione completa dei consumi della tua casa",
      details: "Setup iniziale + aggiornamenti trimestrali",
      value: "Identificazione sprechi nascosti"
    },
    {
      icon: Zap,
      title: "Alert Mensili Automatici", 
      description: "Notifiche su nuove opportunità di risparmio",
      details: "Email personalizzate ogni mese",
      value: "Non perdi mai un'opportunità di risparmio"
    },
    {
      icon: FileText,
      title: "Report Efficientamento Dettagliato",
      description: "Analisi mensile progressi e risparmi ottenuti",
      details: "PDF scaricabile con grafici e raccomandazioni",
      value: "Monitoraggio ROI investimenti"
    },
    {
      icon: Phone,
      title: "Consulenza Prioritaria",
      description: "Supporto prioritario vs clienti gratuiti",
      details: "Linea dedicata + email prioritaria",
      value: "Risposte immediate a domande complesse"
    },
    {
      icon: TrendingUp,
      title: "Monitoraggio Automatico Mercato",
      description: "Surveillanza continua nuove offerte mercato",
      details: "AI monitoring 24/7",
      value: "Sempre aggiornato sulle migliori opportunità"
    },
    {
      icon: Calendar,
      title: "Raccomandazioni Stagionali",
      description: "Consigli specifici per ottimizzazione stagionale",
      details: "4 volte l'anno + aggiornamenti meteo",
      value: "Massimizza efficienza in base alla stagione"
    }
  ];

  const handleWaitlistSubmit = () => {
    if (!waitlistData.email) return;
    
    // Qui normalmente salveresti in un database o Google Sheets
    console.log('Waitlist signup:', waitlistData);
    
    // Simula invio
    setTimeout(() => {
      setIsSubmitted(true);
      // Track event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'power_pro_waitlist_signup', {
          event_category: 'conversion',
          event_label: 'marketing_v2',
          value: 1
        });
      }
    }, 1000);
  };

  const trackInterest = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'power_pro_interest_shown', {
        event_category: 'engagement',
        event_label: 'marketing_v2'
      });
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white" id="power-pro-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-lg rounded-full font-bold">
            💎 POWER PRO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Il tuo consulente energetico 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}personale
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Non vendiamo energia, ti aiutiamo a usarla meglio. 
            Analisi, ottimizzazione e monitoraggio automatico per la tua abitazione.
          </p>
          
          {/* Price Display */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">€1,99</div>
              <div className="text-gray-500 mb-4">/mese</div>
              <div className="text-sm text-green-600 font-semibold">
                ☕ Meno di un caffè al giorno per risparmi da centinaia di euro
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Cosa è incluso nel servizio
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {powerProServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="border-2 border-gray-200 hover:border-purple-300 transition-colors bg-white rounded-xl p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h4>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-blue-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {service.details}
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {service.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROI Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Calcola il tuo ROI</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Calculator className="w-8 h-8 mb-4 mx-auto" />
                <div className="text-2xl font-bold mb-2">1,420%</div>
                <div className="text-purple-100">ROI medio Power Pro</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Euro className="w-8 h-8 mb-4 mx-auto" />
                <div className="text-2xl font-bold mb-2">€340</div>
                <div className="text-purple-100">Risparmio medio annuo</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mb-4 mx-auto" />
                <div className="text-2xl font-bold mb-2">1.2</div>
                <div className="text-purple-100">Mesi payback medio</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto per il tuo consulente energetico personale?
            </h3>
            <p className="text-gray-600 mb-8">
              Power Pro sarà disponibile da <strong>Settembre 2025</strong>. 
              I primi 100 clienti avranno il <strong>50% di sconto</strong> il primo mese.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                onClick={() => {
                  trackInterest();
                  alert('Grazie per l\'interesse! Power Pro sarà disponibile a Settembre 2025. Ti contatteremo per maggiori informazioni.');
                }}
              >
                💎 Sono Interessato
              </button>
              
              <button 
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                onClick={() => {
                  if (onCallNow) onCallNow();
                  window.open('tel:+390299220697');
                }}
              >
                📞 Consulenza Gratuita
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerProPresentation;
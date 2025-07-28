# 🚀 Gas Power Compara v2.0

**Consulenti per l'Efficientamento Energetico - Power Pro: il tuo consulente energetico personale**

[![Version](https://img.shields.io/badge/version-2.0.0-purple.svg)](./docs/STRATEGIC_EVOLUTION_v2.0.md)
[![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen.svg)]()
[![Strategy](https://img.shields.io/badge/strategy-Marketing%20Evolution-purple.svg)]()
[![Performance](https://img.shields.io/badge/Lighthouse-90+-brightgreen.svg)]()
[![Mobile](https://img.shields.io/badge/Mobile%20First-✓-blue.svg)]()

---

## 🎯 **Obiettivo del Progetto v2.0**

**"Non vendiamo energia, ti aiutiamo a usarla meglio"**

Gas Power Compara v2.0 si posiziona come **consulenti per l'efficientamento energetico** offrendo:

### **🆓 Servizio Gratuito** 
- Confronto tariffe energetiche nazionali
- Consulenza telefonica immediata ☎️ **+39 02 99 22 06 97**
- Nessun dato personale richiesto

### **💎 Power Pro (€1.99/mese)**
- **Analisi personalizzata** della tua abitazione
- **Alert mensili automatici** su nuove opportunità di risparmio
- **Report dettagliati** scaricabili con ROI tracking  
- **Consulenza prioritaria** e supporto dedicato
- **Monitoraggio mercato 24/7** con AI
- **Raccomandazioni stagionali** per massima efficienza

**Lancio Power Pro**: Settembre 2025 • **Primi 100 clienti**: 50% sconto primo mese

---

## 🚀 **Come Iniziare**

### **Prerequisiti**
- Node.js 18+ 
- npm o bun

### **Setup Locale**
```bash
# 1. Clona il repository
git clone <YOUR_GIT_URL>

# 2. Entra nella directory
cd gas-power-compara

# 3. Installa le dipendenze
npm install

# 4. Avvia il server di sviluppo
npm run dev
```

## 🚀 **v2.0 Features & Testing**

### **🔄 Strategy Toggle (Development)**
```bash
# Test both strategies locally
npm run dev

# Toggle v1.0 ↔ v2.0 using bottom-left button
# Version indicator shows current strategy (top-right)
```

### **📊 Analytics Dashboard**
```bash
# View v2.0 marketing analytics
open http://localhost:5173/analytics-v2

# Monitor:
# - Waitlist signups
# - Power Pro interest rate  
# - Hero v2.0 engagement
# - Conversion funnel
```

### **🧪 Testing & Deployment**
```bash
# Run comprehensive v2.0 tests
./test-v2.sh

# Deploy v2.0 to production
./deploy-v2.sh
```

---

## 🏗️ **Stack Tecnologico**

### **Core Framework**
- **React 18.3.1** + **TypeScript 5.8.3** - UI library moderna con type safety
- **Vite 7.0.0** - Build tool ultrarapido e HMR
- **React Router 6.30.1** - Routing SPA avanzato

### **State Management & Forms**
- **TanStack React Query 5.81.5** - Server state management
- **React Hook Form 7.59.0** + **Zod 3.25.67** - Form handling e validazione

### **UI/UX & Design System**
- **shadcn/ui** + **Radix UI** - Componenti accessibili by design
- **Tailwind CSS 3.4.17** - Utility-first styling + custom theming
- **Lucide React 0.525.0** - Icon library moderna
- **Next Themes 0.4.6** - Dark mode support

### **Performance & SEO**
- **React Helmet Async 2.0.5** - Meta tags dinamici
- **Lazy Loading** - Componenti caricati on-demand
- **Code Splitting** - Bundle optimization automatico

### **Analytics & Tracking**
- **Google Tag Manager** + **GA4** - Analytics avanzato
- **Facebook Pixel** - Enhanced e-commerce events
- **Custom Conversion Tracking** - Sistema proprietario di tracking conversioni
- **A/B Testing** - Framework integrato per esperimenti

---

## 📂 **Struttura del Progetto**

```
gas-power-compara/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── v2/                   # v2.0 Marketing Components
│   │   │   ├── HeroSectionV2.tsx
│   │   │   ├── PowerProPresentation.tsx
│   │   │   └── AnalyticsDashboard.tsx
│   │   ├── optimized/            # Componenti ottimizzati per performance
│   │   │   ├── OptimizedHeader.tsx
│   │   │   ├── StickyMobileCTA.tsx
│   │   │   └── OptimizedFinalCTA.tsx
│   │   ├── SEO/                  # Componenti SEO
│   │   │   └── SEOHead.tsx
│   │   └── [feature-components]  # Componenti specifici
│   ├── hooks/
│   │   ├── useConversionTracking.ts  # Sistema tracking avanzato
│   │   ├── usePowerProLeads.ts   # v2.0 Lead management
│   │   ├── useSEO.ts
│   │   └── [custom-hooks]
│   ├── pages/
│   │   ├── Index.tsx             # Homepage (v1.0 + v2.0 toggle)
│   │   ├── AnalyticsV2.tsx       # v2.0 Analytics Dashboard
│   │   ├── Admin.tsx             # Dashboard avanzato
│   │   ├── AdminSimple.tsx       # Dashboard semplificato
│   │   └── NotFound.tsx
│   ├── utils/
│   │   ├── v2/                   # v2.0 Specific utilities
│   │   │   └── trackingManager.ts
│   │   ├── seoUtils.ts           # Utilities SEO e structured data
│   │   ├── gtmConfig.ts          # Configurazione GTM
│   │   └── [utilities]
│   └── lib/                      # Utilities condivise
├── docs/                         # 📚 Knowledge Base
│   ├── VERSIONING_v1.0.md       # Documentazione v1.0 (legacy)
│   ├── STRATEGIC_EVOLUTION_v2.0.md  # Evoluzione strategica v2.0
│   ├── MARKETING_IMPLEMENTATION_v2.0.md  # Implementazione marketing
│   ├── IMPLEMENTATION_COMPLETE_v2.0.md   # Guida completa v2.0
│   └── README.md                 # Indice documentazione
├── public/                       # Assets statici
│   └── img/                     # Immagini e loghi
└── [config files]               # Configurazioni build e deploy
```

---

## ✨ **Funzionalità Chiave v2.0**

### **🎯 Nuovo Posizionamento Brand**
- **From**: Venditori di servizi energetici
- **To**: Consulenti per l'efficientamento energetico  
- **Messaging**: "Non vendiamo energia, ti aiutiamo a usarla meglio"
- **Power Pro**: Servizio premium €1.99/mese (launch Settembre 2025)

### **🚀 Sistema di Conversione Dual-Tier**
- **Free Tier**: Comparazione + consulenza telefonica gratuita
- **Premium Tier**: Power Pro con 6 servizi inclusi (waitlist attiva)
- **Conversion Tracking**: Differenziato per v1.0 vs v2.0
- **A/B Testing**: Framework integrato per comparazione strategie

### **📊 Enhanced Analytics & Tracking**
- **v2.0 Dashboard**: `/analytics-v2` per metriche specifiche
- **Waitlist Management**: Sistema raccolta lead Power Pro
- **Interest Tracking**: Monitoraggio interesse servizi premium
- **ROI Calculator**: Dimostratore valore Power Pro (1,420% ROI medio)

### **📱 Mobile-First Experience v2.0**
- **Hero dinamico**: Testimonial carousel + value propositions  
- **Power Pro section**: 6 servizi presentati graficamente
- **Case studies**: ROI reali e social proof
- **Responsive**: Touch-optimized per tutte le interazioni

---

## 📊 **Performance & Metrics**

### **✅ Core Web Vitals Targets**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **INP (Interaction to Next Paint)**: < 200ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Lighthouse Score**: 90+ (Performance, SEO, Accessibility)

### **🎯 Business KPIs**
- **Primary**: Chiamate dirette + callback requests
- **Secondary**: Tempo permanenza, scroll depth, form completion
- **Lead Quality**: Score medio lead generati
- **Attribution**: UTM tracking completo per ROI

---

## 🚀 **Deployment**

### **Build per Production**
```bash
# Build standard
npm run build

# Build con deploy automatico
npm run build:deploy
```

### **Configurazione Deploy**
- **Auto-deploy**: `build-and-deploy.sh` + `ftp-deploy.sh`
- **Environment**: Support per `.env` files
- **SSL Ready**: HTTPS enforced
- **CDN Optimized**: Static assets ottimizzati

---

## 📚 **Documentazione**

### **📖 Documentazione Completa**
- **[docs/VERSIONING_v1.0.md](./docs/VERSIONING_v1.0.md)** - Documentazione tecnica completa
- **[docs/README.md](./docs/README.md)** - Indice knowledge base
- **[.claude/project_context.md](./.claude/project_context.md)** - Context per AI development

### **🔧 Guide di Riferimento**
- **Knowledge Base Modulare**: 10 aree tematiche per best practices
- **Design System**: shadcn/ui + Radix UI patterns
- **Performance**: Vite optimization + Core Web Vitals
- **SEO**: Structured data + meta tags dinamici

---

## 🔮 **Roadmap v2.0**

### **🎯 Planned Features (Q4 2025)**
- **Dashboard Analytics**: Real-time conversion metrics
- **API Integration**: Partner connections + pricing feeds in tempo reale
- **PWA Implementation**: Offline functionality + push notifications
- **AI-Powered**: Smart recommendations + chatbot integration
- **Multi-Channel**: WhatsApp Business + email automation

### **📈 Technical Improvements**
- **Testing**: Jest + Cypress integration
- **Monitoring**: Real-time error tracking
- **Security**: CSP + security headers avanzati
- **Performance**: Bundle size < 500kb

---

## 📞 **Contatti & Support**

### **🏢 Business**
- **Telefono**: +39 02 99 22 06 97
- **Azienda**: Adsolut S.R.L.S.
- **Lead Developer**: Aldo Santoro

### **🛠️ Technical**
- **Version**: v1.0.0 (Production Ready)
- **Status**: ✅ All systems operational
- **Documentation**: Completa e aggiornata

---

## 🎉 **Credits**

### **Development Team**
- **Lead Developer**: Aldo Santoro (Adsolut S.R.L.S.)
- **Frontend Architecture**: React + TypeScript + Vite
- **UI/UX Design**: shadcn/ui + Tailwind CSS
- **Analytics**: GTM + GA4 + FB Pixel implementation

### **Technologies**
Grazie ai team di **React**, **Vercel**, **shadcn**, **Radix UI** e a tutti i maintainer open source che rendono possibile questo progetto.

---

**📅 Ultima modifica**: Luglio 2025  
**📊 Status**: ✅ Production Ready v1.0 → Planning v2.0  
**🎯 Prossimo milestone**: Dashboard Analytics Q4 2025
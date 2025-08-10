# 🚀 Gas Power Compara v2 - Sistema Completo con Power Pro

## 📋 Overview

Gas Power Compara v2 è una piattaforma completa per il confronto delle offerte energetiche in Italia, con sistema di abbonamento Power Pro integrato.

### ✨ Funzionalità Principali

- **📊 Analisi Gratuita Bollette**: Upload PDF/immagini e parsing automatico
- **👑 Power Pro Premium**: Servizio in abbonamento a €1.99/mese
- **📈 Dashboard Utente**: Monitoraggio consumi e risparmio
- **🏢 Database Fornitori**: 50+ fornitori energetici italiani reali
- **💳 Pagamenti Stripe**: Sistema di pagamento integrato
- **📱 Mobile-First**: Design responsive ottimizzato
- **🔍 SEO Optimized**: Meta tags, structured data, sitemap
- **📊 Analytics**: Google Analytics 4 integrato

## 🛠️ Tecnologie Utilizzate

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Node.js, Express (template incluso)
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Analytics**: GA4, PostHog
- **Deployment**: FTP/Rsync ready

## 📦 Installazione

### 1. Clona il Repository
```bash
cd /Users/aldosantoro/Desktop/gas-power-v2
```

### 2. Installa le Dipendenze
```bash
# Frontend dependencies
npm install

# Additional dependencies for Power Pro
chmod +x install-new-deps.sh
./install-new-deps.sh

# Backend API (optional)
cd api
npm install
cd ..
```

### 3. Configura le Variabili d'Ambiente
```bash
# Copia il file di esempio
cp .env.example .env.local

# Modifica .env.local con i tuoi valori:
# - Stripe keys
# - Supabase credentials
# - Google Analytics ID
# - Altri servizi
```

### 4. Configura Supabase
1. Crea un progetto su [Supabase](https://supabase.com)
2. Esegui lo schema SQL:
   ```sql
   -- Apri Supabase SQL Editor
   -- Copia e incolla il contenuto di database/schema.sql
   ```
3. Copia le credenziali in `.env.local`

### 5. Configura Stripe
1. Crea un account su [Stripe](https://stripe.com)
2. Ottieni le chiavi API dal dashboard
3. Configura i webhook per:
   - `payment_intent.succeeded`
   - `customer.subscription.created`
   - `customer.subscription.deleted`

## 🚀 Avvio in Sviluppo

```bash
# Frontend
npm run dev
# Apri http://localhost:5173

# Backend API (in un altro terminale)
cd api
npm run dev
# API disponibile su http://localhost:3001
```

## 📱 Struttura del Progetto

```
gas-power-v2/
├── src/
│   ├── components/
│   │   ├── BillUploadAnalyzer.tsx    # Upload e analisi bollette
│   │   ├── PowerProSubscription.tsx   # Sistema abbonamento
│   │   └── SEO/
│   │       └── SEOHead.tsx           # Meta tags SEO
│   ├── pages/
│   │   ├── IndexV2Business.tsx       # Homepage business
│   │   └── PowerProDashboard.tsx     # Dashboard utenti premium
│   ├── data/
│   │   └── energySuppliers.ts        # Database fornitori
│   ├── hooks/
│   │   ├── useConversionTracking.ts  # Analytics tracking
│   │   └── useSEO.ts                 # SEO management
│   └── App.tsx                       # Router principale
├── api/
│   ├── server.js                     # Backend Express
│   └── package.json
├── database/
│   └── schema.sql                    # Schema Supabase
├── .env.example                      # Template variabili ambiente
├── build-production.sh               # Script build
└── deploy-production.sh              # Script deployment
```

## 🏗️ Build per Produzione

```bash
# Rendi eseguibili gli script
chmod +x build-production.sh
chmod +x deploy-production.sh

# Build dell'applicazione
./build-production.sh

# Deploy su server
./deploy-production.sh
```

## 🌐 Deployment

### Opzione 1: FTP
1. Configura le credenziali in `deploy-production.sh`
2. Esegui: `./deploy-production.sh`

### Opzione 2: Manuale
1. Build: `npm run build`
2. Upload contenuto di `dist/` in `public_html/v2/`
3. Configura `.htaccess` per SPA routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /v2/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /v2/index.html [L]
</IfModule>
```

## 💰 Modello di Business

### Servizi Gratuiti
- Upload e analisi bollette
- Confronto base offerte
- 3 confronti al mese

### Power Pro Premium (€1.99/mese)
- Monitoraggio continuo
- Alert automatici
- Report mensili PDF
- Consulenza prioritaria
- Dashboard avanzata
- Confronti illimitati

### Power Pro Business (€49.99/mese)
- Multi-utenza (fino a 10)
- API dedicate
- Consulente personale
- Report personalizzati

## 📊 Analytics e KPI

### Metriche da Monitorare
- **Conversioni**: Upload bollette → Abbonamenti
- **Retention**: Tasso di rinnovo mensile
- **LTV**: Lifetime value clienti
- **CAC**: Costo acquisizione cliente
- **Churn Rate**: Tasso di abbandono

### Eventi Tracciati
```javascript
// Eventi principali
- page_view
- bill_upload_start
- bill_analysis_complete
- power_pro_view
- power_pro_subscription_start
- payment_success
- dashboard_interaction
```

## 🔧 Manutenzione

### Aggiornamento Fornitori
```javascript
// Modifica src/data/energySuppliers.ts
// Aggiungi nuovi fornitori o aggiorna prezzi
```

### Backup Database
```bash
# Supabase backup automatico
# Configura backup giornalieri dal dashboard Supabase
```

### Monitoraggio
- **Uptime**: UptimeRobot / Pingdom
- **Errors**: Sentry integration
- **Analytics**: Google Analytics dashboard
- **Payments**: Stripe dashboard

## 📝 TODO List

- [ ] Implementare OCR reale per parsing bollette
- [ ] Integrare email marketing (SendGrid/Resend)
- [ ] Aggiungere PWA support
- [ ] Implementare chat support (Intercom/Crisp)
- [ ] Creare app mobile (React Native)
- [ ] Aggiungere A/B testing
- [ ] Implementare referral program
- [ ] Creare API pubblica per partner

## 🆘 Troubleshooting

### Errore: "Stripe key not found"
```bash
# Verifica .env.local
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Errore: "Supabase connection failed"
```bash
# Verifica URL e chiavi
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### Build fallisce
```bash
# Pulisci cache e reinstalla
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📞 Supporto

- Email: support@gasepower.com
- Documentazione: [docs.gasepower.com](https://docs.gasepower.com)
- GitHub Issues: [github.com/yourusername/gas-power-v2](https://github.com)

## 📄 Licenza

Copyright © 2024 Gas Power Compara. Tutti i diritti riservati.

---

**Sviluppato con ❤️ per aiutare famiglie e aziende italiane a risparmiare su luce e gas**

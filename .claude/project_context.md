# Gas-Power-Compara - Project Context

## Project Overview
**Name**: Gas-Power-Compara v1.0
**Type**: Energy Comparison Platform with Telephone Conversion Focus
**Status**: Production Ready
**Company**: Adsolut S.R.L.S.
**Lead Developer**: Aldo Santoro

## Business Model Evolution
### v1.0 (Current)
- **Primary Goal**: Telephone conversions for energy consulting
- **Value Proposition**: Save up to €300/year on energy bills
- **Service**: 100% free consultation and comparison
- **Contact**: +39 02 99 22 06 97
- **Privacy Approach**: No personal data required for comparison

### v2.0 (Strategic Evolution - Q4 2025)
- **Business Model**: Freemium SaaS (Free tier + Premium subscription)
- **Power Pro Premium**: €1.99/mese for personalized energy efficiency consulting
- **Dual Service**: Free comparison + Premium automated alerts & consulting
- **Target Revenue**: €5,000+ MRR by month 6
- **Value Prop**: Free tier remains + Premium gets monthly personalized savings alerts

## Technical Architecture

### Core Stack
- **Frontend**: React 18.3.1 + TypeScript 5.8.3 + Vite 7.0.0
- **Routing**: React Router 6.30.1
- **State**: TanStack React Query 5.81.5
- **Forms**: React Hook Form 7.59.0 + Zod 3.25.67
- **UI**: shadcn/ui + Radix UI + Tailwind CSS 3.4.17
- **SEO**: React Helmet Async 2.0.5
- **Analytics**: GTM + GA4 + Facebook Pixel + Custom Tracking

### Key Features Implemented
1. **Advanced Conversion Tracking**
   - UTM attribution
   - Lead quality scoring
   - Multi-platform analytics
   - A/B testing framework

2. **Optimized Components**
   - OptimizedHeader with dual CTA strategy
   - StickyMobileCTA for mobile conversions
   - SEOHead with dynamic meta tags and structured data
   - Lazy-loaded components for performance

3. **Mobile-First Design**
   - Responsive across all devices
   - Touch-optimized interactions
   - Performance optimized for mobile networks

4. **SEO & Performance**
   - Core Web Vitals compliant (LCP < 2.5s, INP < 200ms, CLS < 0.1)
   - Structured data (JSON-LD)
   - Dynamic meta tags
   - Progressive enhancement

## Project Structure
```
gas-power-compara/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── optimized/            # Performance-optimized components
│   │   ├── SEO/                  # SEO-related components
│   │   └── [feature-components]
│   ├── hooks/
│   │   ├── useConversionTracking.ts  # Advanced tracking system
│   │   └── [other-hooks]
│   ├── pages/
│   │   ├── Index.tsx             # Homepage with comparator
│   │   ├── Admin.tsx             # Advanced dashboard
│   │   ├── AdminSimple.tsx       # Simplified dashboard
│   │   └── NotFound.tsx
│   ├── utils/
│   │   ├── seoUtils.ts           # SEO utilities
│   │   ├── gtmConfig.ts          # GTM configuration
│   │   └── [other-utils]
│   └── lib/                      # Shared utilities
├── docs/                         # Knowledge base
│   ├── VERSIONING_v1.0.md       # Complete v1.0 documentation
│   └── README.md                 # Documentation index
├── public/                       # Static assets
└── [config files]
```

## Knowledge Base Reference
The project follows a modular knowledge base structure based on 10 key areas:
1. User-Centered Design
2. Personas e User Journey
3. Mobile-First e Responsive
4. Accessibilità (WCAG 2.1)
5. Performance & Core Web Vitals
6. Progressive Enhancement & SEO
7. Sicurezza by Design
8. Architettura Moderna (JAMstack)
9. Design System & Atomic Design
10. UI/UX Avanzato

## Current Version Status (v1.0)
- ✅ Production ready
- ✅ All identified gaps from previous version resolved
- ✅ Advanced conversion tracking implemented
- ✅ Mobile-first optimization complete
- ✅ SEO optimization with structured data
- ✅ Performance optimization (Lighthouse 90+)

## Strategic Roadmap v2.0 (Q4 2025 Launch)
### Business Transformation
- **Freemium Model**: Free tier (existing) + Power Pro premium (€1.99/mese)
- **Premium Features**: Monthly personalized alerts, dashboard, efficiency consulting
- **Revenue Target**: €5,000+ MRR by month 6
- **Market Position**: Premium energy consultancy leader

### Technical Implementation
- **Authentication**: Supabase Auth + user management
- **Payments**: Stripe Subscriptions integration
- **Premium Dashboard**: Advanced analytics & personalized alerts
- **Notification System**: Email automation + push notifications
- **AI Features**: ML-powered savings recommendations

### UI/UX Strategy
- **Dual Design**: Standard free tier + premium gradient styling
- **Conversion Funnel**: Strategic upgrade prompts + value demonstration
- **Premium Experience**: Dashboard, notifications, reports, priority support

## Development Workflow
- **Scripts**: npm run dev, build, lint, preview
- **Deploy**: Automated via build-and-deploy.sh
- **Permissions**: Configured for npm, git, and build operations
- **Environment**: Production-ready with .env support

## Key Metrics & Targets
- **Performance**: LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Business**: Telephone conversions, lead quality scores
- **UX**: Form completion >75%, session duration >2min
- **SEO**: Core Web Vitals compliance, structured data

## Important Notes for Development
- Privacy-first approach: minimal data collection
- Mobile-first design priority
- Conversion optimization focus
- Performance is critical for SEO rankings
- All changes should be tracked in docs/VERSIONING_vX.X.md

## Documentation References
- **VERSIONING_v1.0.md**: Complete v1.0 technical documentation
- **STRATEGIC_EVOLUTION_v2.0.md**: Freemium business model evolution strategy
- **UI/UX Mockups**: Premium pricing page + dashboard designs created

Last Updated: July 2025 (v2.0 Strategic Evolution Added)
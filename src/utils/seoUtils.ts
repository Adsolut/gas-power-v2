// src/utils/seoUtils.ts
export const generateStructuredData = {
  // Homepage structured data
  homepage: () => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://gasepower.it/#organization",
        "name": "Gas e Power",
        "url": "https://gasepower.it/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gasepower.it/img/logo.png",
          "width": 200,
          "height": 60
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+39-02-4013-7880",
          "contactType": "Customer Service",
          "availableLanguage": ["Italian"],
          "areaServed": "IT",
          "hoursAvailable": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "21:00"
            },
            {
              "@type": "OpeningHoursSpecification", 
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "13:00"
            }
          ]
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IT",
          "addressRegion": "Lombardia",
          "addressLocality": "Milano"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1247",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://gasepower.it/#website",
        "url": "https://gasepower.it/",
        "name": "Gas e Power",
        "description": "Confronta e risparmia su luce, gas e internet con Gas e Power",
        "publisher": {
          "@id": "https://gasepower.it/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://gasepower.it/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Service",
        "@id": "https://gasepower.it/#service",
        "name": "Comparazione Offerte Energetiche",
        "description": "Servizio gratuito di confronto tra le migliori offerte di luce, gas e internet disponibili sul mercato italiano",
        "provider": {
          "@id": "https://gasepower.it/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Italy"
        },
        "offers": {
          "@type": "Offer",
          "description": "Consulenza gratuita per comparazione offerte energetiche",
          "price": "0",
          "priceCurrency": "EUR"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://gasepower.it/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Come funziona il confronto delle offerte?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Il nostro servizio analizza gratuitamente le tue esigenze energetiche e confronta le offerte di tutti i principali fornitori italiani per trovare quella più conveniente per te."
            }
          },
          {
            "@type": "Question",
            "name": "Il servizio è davvero gratuito?",
            "acceptedAnswer": {
              "@type": "Answer", 
              "text": "Sì, la consulenza e il confronto delle offerte sono completamente gratuiti. Non ci sono costi nascosti o commissioni."
            }
          },
          {
            "@type": "Question",
            "name": "Quanto posso risparmiare?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Il risparmio medio dei nostri clienti è di circa 300€ all'anno sulla bolletta energetica, ma può variare in base al consumo e alla tariffa attuale."
            }
          }
        ]
      }
    ]
  }),

  // Service page structured data
  service: (serviceName: string, serviceDescription: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@type": "Organization",
      "name": "Gas e Power"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Italy"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  }),

  // FAQ page structured data
  faq: (faqItems: Array<{question: string, answer: string}>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }),

  // Local business structured data
  localBusiness: () => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Gas e Power",
    "description": "Servizio di comparazione offerte luce, gas e internet",
    "telephone": "+39-02-4013-7880",
    "url": "https://gasepower.it/",
    "areaServed": {
      "@type": "Country",
      "name": "Italy"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247"
    }
  })
};
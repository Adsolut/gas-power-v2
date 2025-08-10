#!/bin/bash

echo "🚀 Installazione dipendenze per Power Pro Business System..."

# Stripe per pagamenti
npm install @stripe/stripe-js @stripe/react-stripe-js

# File upload e parsing
npm install react-dropzone
npm install pdf-parse
npm install tesseract.js

# PDF Generation per report
npm install jspdf html2canvas

# Database e auth
npm install @supabase/supabase-js

# Animazioni e UI avanzate
npm install framer-motion
npm install @react-spring/web

# Analytics e tracking
npm install react-ga4
npm install posthog-js

# Utilities aggiuntive
npm install axios
npm install uuid
npm install dayjs

echo "✅ Installazione completata!"

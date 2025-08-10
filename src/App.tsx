import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Existing pages
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import AdminSimple from "./pages/AdminSimple";
import AnalyticsV2 from "./pages/AnalyticsV2";
import NotFound from "./pages/NotFound";

// New Power Pro pages - Lazy loaded for performance
const PowerProDashboard = lazy(() => import("./pages/PowerProDashboard"));
const IndexV2Business = lazy(() => import("./pages/IndexV2Business"));
const IndexV2Business3D = lazy(() => import("./pages/IndexV2Business3D"));

const queryClient = new QueryClient();

// Loading component with 3D effect
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
      <Loader2 className="relative h-12 w-12 animate-spin text-blue-600" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/v2">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Main Business Homepage with 3D Effects */}
              <Route path="/" element={<IndexV2Business3D />} />
              
              {/* Alternative versions */}
              <Route path="/classic" element={<Index />} />
              <Route path="/v2-standard" element={<IndexV2Business />} />
              
              {/* Power Pro Dashboard for subscribed users */}
              <Route path="/power-pro-dashboard" element={<PowerProDashboard />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/dashboard" element={<AdminSimple />} />
              <Route path="/analytics-v2" element={<AnalyticsV2 />} />
              
              {/* Catch-all route - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

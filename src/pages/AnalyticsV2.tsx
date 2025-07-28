import React from 'react';
import { Helmet } from 'react-helmet-async';
import V2AnalyticsDashboard from '@/components/v2/AnalyticsDashboard';

const AnalyticsV2 = () => {
  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | Gas & Power</title>
        <meta name="description" content="Dashboard analytics per i consulenti di efficientamento energetico" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <V2AnalyticsDashboard />
      </div>
    </>
  );
};

export default AnalyticsV2;
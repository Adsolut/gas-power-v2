import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Eye, 
  Phone, 
  Download,
  BarChart3,
  PieChart,
  Calendar,
  Target,
  Zap,
  DollarSign
} from 'lucide-react';
import { usePowerProLeads } from '@/hooks/usePowerProLeads';

// Simple analytics dashboard for v2.0 marketing strategy
const V2AnalyticsDashboard = () => {
  const { getWaitlistAnalytics, exportWaitlistData } = usePowerProLeads();
  const [analytics, setAnalytics] = useState(null);
  const [mockMetrics, setMockMetrics] = useState({
    pageViews: 0,
    heroV2Views: 0,
    powerProSectionViews: 0,
    interestClicks: 0,
    callsFromV2: 0,
    conversionRate: 0
  });

  useEffect(() => {
    // Load analytics data
    const data = getWaitlistAnalytics();
    setAnalytics(data);

    // Simulate some metrics (in real app, these would come from GA4/backend)
    setMockMetrics({
      pageViews: Math.floor(Math.random() * 1000) + 500,
      heroV2Views: Math.floor(Math.random() * 800) + 400,
      powerProSectionViews: Math.floor(Math.random() * 600) + 300,
      interestClicks: Math.floor(Math.random() * 100) + 50,
      callsFromV2: Math.floor(Math.random() * 50) + 25,
      conversionRate: Math.random() * 10 + 5
    });
  }, [getWaitlistAnalytics]);

  const kpiCards = [
    {
      title: "Waitlist Signups",
      value: analytics?.totalLeads || 0,
      change: "+23%",
      changeType: "positive",
      icon: Users,
      description: "Leads interessati a Power Pro"
    },
    {
      title: "Interest Shown", 
      value: analytics?.totalInterests || 0,
      change: "+45%",
      changeType: "positive",
      icon: Eye,
      description: "Utenti che hanno mostrato interesse"
    },
    {
      title: "Conversion Rate",
      value: `${analytics?.conversionRate?.toFixed(1) || 0}%`,
      change: "+12%",
      changeType: "positive",
      icon: TrendingUp,
      description: "Interest → Waitlist conversion"
    },
    {
      title: "Calls from v2.0",
      value: mockMetrics.callsFromV2,
      change: "+18%",
      changeType: "positive",
      icon: Phone,
      description: "Chiamate dalla nuova strategia"
    },
    {
      title: "Hero v2.0 Views",
      value: mockMetrics.heroV2Views,
      change: "New",
      changeType: "neutral",
      icon: Target,
      description: "Visualizzazioni nuovo hero"
    },
    {
      title: "Power Pro Views",
      value: mockMetrics.powerProSectionViews,
      change: "New",
      changeType: "neutral", 
      icon: Zap,
      description: "Sezione Power Pro vista"
    }
  ];

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Marketing Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Performance della nuova strategia di posizionamento
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={exportWaitlistData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {kpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </div>
                <div className="flex items-center text-sm">
                  <span className={getChangeColor(kpi.changeType)}>
                    {kpi.change}
                  </span>
                  <span className="text-gray-500 ml-1">vs last period</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
          <TabsTrigger value="leads">Lead Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strategy Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  v1.0 vs v2.0 Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Page Engagement</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <span className="text-sm font-medium">+75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Call-to-Action Clicks</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <span className="text-sm font-medium">+60%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Time on Page</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                      <span className="text-sm font-medium">+45%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Power Pro Interest */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Power Pro Interest Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      €{(analytics?.totalLeads * 1.99 * 12 || 0).toFixed(0)}
                    </div>
                    <p className="text-sm text-gray-600">
                      Potential Annual Revenue (if all convert)
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Average Interest per Day:</span>
                      <span className="font-medium">
                        {Math.round((analytics?.totalInterests || 0) / 7)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Estimated Launch Conversions:</span>
                      <span className="font-medium text-green-600">
                        {Math.round((analytics?.totalLeads || 0) * 0.3)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { stage: 'Page Views', count: mockMetrics.pageViews, conversion: 100 },
                  { stage: 'Hero v2.0 Views', count: mockMetrics.heroV2Views, conversion: 75 },
                  { stage: 'Power Pro Section Views', count: mockMetrics.powerProSectionViews, conversion: 60 },
                  { stage: 'Interest Shown', count: analytics?.totalInterests || 0, conversion: 25 },
                  { stage: 'Waitlist Signups', count: analytics?.totalLeads || 0, conversion: 15 },
                  { stage: 'Phone Calls', count: mockMetrics.callsFromV2, conversion: 8 }
                ].map((step, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{step.stage}</h4>
                      <p className="text-sm text-gray-600">{step.count} users</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{width: `${step.conversion}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12">{step.conversion}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics?.leadsBySource ? (
                <div className="space-y-4">
                  {Object.entries(analytics.leadsBySource).map(([source, leads]) => (
                    <div key={source} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium capitalize">{source.replace('_', ' ')}</span>
                      <Badge variant="secondary">{leads.length} leads</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No lead data available yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Lead Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Lead details will appear here as users sign up for the Power Pro waitlist</p>
                  <p className="text-sm mt-2">
                    Current waitlist size: <strong>{analytics?.totalLeads || 0}</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default V2AnalyticsDashboard;
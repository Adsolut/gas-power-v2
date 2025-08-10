// src/pages/PowerProDashboard.tsx
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Bell, FileText, Calendar, Euro, 
  Zap, Home, Phone, Download, Settings, Crown, AlertTriangle, 
  CheckCircle, Clock, ChartBar, ArrowUp, ArrowDown, Lightbulb,
  Shield, Target, Activity, BarChart3, PieChart, Users, Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';

// Types
interface UserData {
  name: string;
  email: string;
  plan: string;
  memberSince: string;
  totalSaved: number;
  contractsManaged: number;
}

interface ConsumptionData {
  month: string;
  electricity: number;
  gas: number;
  cost: number;
  previousCost: number;
}

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  date: string;
  read: boolean;
}

interface SavingOpportunity {
  id: string;
  provider: string;
  potentialSaving: number;
  type: 'electricity' | 'gas' | 'both';
  expiryDate: string;
  features: string[];
}

const PowerProDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const userData: UserData = {
    name: 'Mario Rossi',
    email: 'mario.rossi@email.com',
    plan: 'Power Pro Annuale',
    memberSince: 'Gennaio 2024',
    totalSaved: 452.78,
    contractsManaged: 2
  };

  // Mock consumption data
  const consumptionData: ConsumptionData[] = [
    { month: 'Gen', electricity: 450, gas: 180, cost: 245, previousCost: 280 },
    { month: 'Feb', electricity: 420, gas: 170, cost: 235, previousCost: 270 },
    { month: 'Mar', electricity: 380, gas: 150, cost: 210, previousCost: 250 },
    { month: 'Apr', electricity: 350, gas: 120, cost: 185, previousCost: 220 },
    { month: 'Mag', electricity: 320, gas: 90, cost: 165, previousCost: 200 },
    { month: 'Giu', electricity: 340, gas: 80, cost: 170, previousCost: 205 }
  ];

  // Mock saving opportunities
  const savingOpportunities: SavingOpportunity[] = [
    {
      id: '1',
      provider: 'Iren Luce Gas',
      potentialSaving: 327,
      type: 'both',
      expiryDate: '2024-12-31',
      features: ['Prezzo fisso 24 mesi', '100% energia verde', 'Zero costi attivazione']
    },
    {
      id: '2',
      provider: 'Sorgenia Next',
      potentialSaving: 245,
      type: 'electricity',
      expiryDate: '2024-12-15',
      features: ['Cashback 5%', 'Gestione digitale', 'Assistenza H24']
    }
  ];

  // Load alerts
  useEffect(() => {
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'warning',
        title: 'Bolletta in scadenza',
        description: 'La bolletta Enel di novembre scade tra 5 giorni',
        date: '2024-11-25',
        read: false
      },
      {
        id: '2',
        type: 'info',
        title: 'Nuova offerta disponibile',
        description: 'A2A Energia ha lanciato una tariffa che potrebbe farti risparmiare €25/mese',
        date: '2024-11-24',
        read: false
      },
      {
        id: '3',
        type: 'success',
        title: 'Report mensile pronto',
        description: 'Il tuo report di novembre è disponibile per il download',
        date: '2024-11-23',
        read: true
      }
    ];
    
    setAlerts(mockAlerts);
    setIsLoading(false);
  }, []);

  const totalCurrentCost = consumptionData.reduce((sum, d) => sum + d.cost, 0);
  const totalPreviousCost = consumptionData.reduce((sum, d) => sum + d.previousCost, 0);
  const totalSaving = totalPreviousCost - totalCurrentCost;
  const savingPercentage = ((totalSaving / totalPreviousCost) * 100).toFixed(1);

  const downloadReport = () => {
    toast.success('Download report in corso...');
    // In produzione: genera e scarica PDF
  };

  const markAlertAsRead = (alertId: string) => {
    setAlerts(alerts.map(a => 
      a.id === alertId ? { ...a, read: true } : a
    ));
  };

  const requestCallback = () => {
    toast.success('Richiesta inviata! Ti contatteremo entro 24 ore');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src="/avatar-placeholder.jpg" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  Ciao, {userData.name}!
                  <Crown className="h-5 w-5 text-yellow-400" />
                </h1>
                <p className="text-blue-100">Piano: {userData.plan}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Risparmio Totale</p>
                  <p className="text-2xl font-bold text-green-600">
                    €{userData.totalSaved.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">da {userData.memberSince}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Risparmio Mensile</p>
                  <p className="text-2xl font-bold">
                    €{(totalSaving / 6).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowDown className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-600">{savingPercentage}%</span>
                  </div>
                </div>
                <Euro className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Contratti Gestiti</p>
                  <p className="text-2xl font-bold">{userData.contractsManaged}</p>
                  <p className="text-xs text-gray-500">Attivi</p>
                </div>
                <FileText className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Alert Attivi</p>
                  <p className="text-2xl font-bold">{alerts.filter(a => !a.read).length}</p>
                  <p className="text-xs text-gray-500">Da controllare</p>
                </div>
                <Bell className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Panoramica</TabsTrigger>
            <TabsTrigger value="consumption">Consumi</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunità</TabsTrigger>
            <TabsTrigger value="reports">Report</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Alert e Notifiche</CardTitle>
                <CardDescription>
                  Le tue notifiche più recenti e azioni consigliate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <Alert key={alert.id} className={alert.read ? 'opacity-60' : ''}>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                        {alert.type === 'info' && <Bell className="h-4 w-4 text-blue-500" />}
                        {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        <div className="space-y-1">
                          <AlertTitle className="text-sm">{alert.title}</AlertTitle>
                          <AlertDescription className="text-xs">
                            {alert.description}
                          </AlertDescription>
                        </div>
                      </div>
                      {!alert.read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => markAlertAsRead(alert.id)}
                        >
                          Segna come letto
                        </Button>
                      )}
                    </div>
                  </Alert>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Azioni Rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto flex-col py-4">
                    <Upload className="h-6 w-6 mb-2" />
                    <span className="text-xs">Carica Bolletta</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col py-4" onClick={downloadReport}>
                    <Download className="h-6 w-6 mb-2" />
                    <span className="text-xs">Scarica Report</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col py-4" onClick={requestCallback}>
                    <Phone className="h-6 w-6 mb-2" />
                    <span className="text-xs">Richiedi Consulenza</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col py-4">
                    <Mail className="h-6 w-6 mb-2" />
                    <span className="text-xs">Invita Amici</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consumption Tab */}
          <TabsContent value="consumption" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Analisi Consumi</CardTitle>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Mensile</SelectItem>
                      <SelectItem value="quarter">Trimestrale</SelectItem>
                      <SelectItem value="year">Annuale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {/* Consumption Chart Placeholder */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Elettricità</span>
                        <Badge variant="outline">
                          <Zap className="h-3 w-3 mr-1" />
                          2,340 kWh
                        </Badge>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-gray-500">
                        -12% rispetto al periodo precedente
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Gas</span>
                        <Badge variant="outline">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          890 m³
                        </Badge>
                      </div>
                      <Progress value={45} className="h-2" />
                      <p className="text-xs text-gray-500">
                        -18% rispetto al periodo precedente
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Monthly breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Dettaglio Mensile</h4>
                    {consumptionData.map((data) => (
                      <div key={data.month} className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">€{data.cost}</p>
                            <p className="text-xs text-gray-500">
                              vs €{data.previousCost}
                            </p>
                          </div>
                          <Badge 
                            variant={data.cost < data.previousCost ? 'default' : 'secondary'}
                            className="min-w-[60px]"
                          >
                            {data.cost < data.previousCost ? (
                              <>
                                <ArrowDown className="h-3 w-3 mr-1" />
                                -€{(data.previousCost - data.cost).toFixed(0)}
                              </>
                            ) : (
                              <>
                                <ArrowUp className="h-3 w-3 mr-1" />
                                +€{(data.cost - data.previousCost).toFixed(0)}
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Insights AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    I tuoi consumi elettrici sono più alti del 23% la sera. 
                    Considera una tariffa bioraria per risparmiare fino a €15/mese.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    Il consumo di gas è diminuito del 30% rispetto all'anno scorso. 
                    Ottimo lavoro con l'efficientamento!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            {savingOpportunities.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{opportunity.provider}</CardTitle>
                      <CardDescription>
                        Scade il {new Date(opportunity.expiryDate).toLocaleDateString('it-IT')}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Risparmio: €{opportunity.potentialSaving}/anno
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {opportunity.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        Attiva Offerta
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Richiedi Info
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Garanzia Power Pro</AlertTitle>
              <AlertDescription>
                Tutte le offerte sono verificate e garantite. 
                Se non risparmi quanto promesso, ti rimborsiamo la differenza.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Disponibili</CardTitle>
                <CardDescription>
                  Scarica i tuoi report mensili e analisi dettagliate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Novembre 2024', 'Ottobre 2024', 'Settembre 2024'].map((month) => (
                    <div key={month} className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">Report {month}</p>
                          <p className="text-sm text-gray-500">
                            Generato il {new Date().toLocaleDateString('it-IT')}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={downloadReport}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PowerProDashboard;

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Clock,
  Download,
  RefreshCw
} from 'lucide-react';

interface ConversionDashboardProps {
  isAdmin?: boolean;
}

interface CallbackRequest {
  timestamp?: string;
  source?: string;
  name?: string;
  phone?: string;
  preferredTime?: string;
}

interface DashboardStats {
  totalCallbacks: number;
  todayCallbacks: number;
  sources: Record<string, number>;
  timePreferences: Record<string, number>;
  recentCallbacks: Array<{
    id: number;
    name: string;
    phone: string;
    time: string;
    source: string;
  }>;
}

const ConversionDashboard = ({ isAdmin = false }: ConversionDashboardProps) => {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Get data from localStorage
        const callbackRequests = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
        const today = new Date().toISOString().split('T')[0];
        
        const todayRequests = callbackRequests.filter((req: CallbackRequest) => 
          req.timestamp && req.timestamp.startsWith(today)
        );
        
        const stats = {
          totalCallbacks: callbackRequests.length,
          todayCallbacks: todayRequests.length,
          sources: callbackRequests.reduce((acc: Record<string, number>, req: CallbackRequest) => {
            const source = req.source || 'unknown';
            acc[source] = (acc[source] || 0) + 1;
            return acc;
          }, {}),
          timePreferences: callbackRequests.reduce((acc: Record<string, number>, req: CallbackRequest) => {
            const time = req.preferredTime || 'unknown';
            acc[time] = (acc[time] || 0) + 1;
            return acc;
          }, {}),
          recentCallbacks: callbackRequests
            .slice(-10)
            .reverse()
            .map((req: CallbackRequest, index: number) => ({
              id: index,
              name: req.name || 'Anonimo',
              phone: req.phone ? `${req.phone.slice(0, 3)}***${req.phone.slice(-4)}` : 'N/A',
              time: req.timestamp ? new Date(req.timestamp).toLocaleString('it-IT') : 'N/A',
              source: req.source || 'unknown'
            }))
        };
        
        setDashboardData(stats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const exportData = () => {
    const callbackRequests = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
    const dataStr = JSON.stringify(callbackRequests, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conversions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const clearData = () => {
    if (confirm('Sei sicuro di voler cancellare tutti i dati delle conversioni?')) {
      localStorage.removeItem('callbackRequests');
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Caricamento dashboard...</span>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Errore nel caricamento dei dati</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Conversioni</h1>
          <p className="text-gray-600">Monitora le performance delle CTA in tempo reale</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Aggiorna
          </Button>
          {isAdmin && (
            <>
              <Button onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Esporta Dati
              </Button>
              <Button variant="destructive" onClick={clearData}>
                Cancella Dati
              </Button>
            </>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Callback Totali</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{dashboardData.totalCallbacks}</div>
            <p className="text-xs text-muted-foreground">
              Tutte le richieste callback
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Callback Oggi</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dashboardData.todayCallbacks}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((dashboardData.todayCallbacks / Math.max(dashboardData.totalCallbacks, 1)) * 100)}% del totale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sorgente Top</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Object.keys(dashboardData.sources).length > 0 
                ? Object.entries(dashboardData.sources).sort(([,a], [,b]) => (b as number) - (a as number))[0][0]
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Migliore fonte di conversioni
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ora Preferita</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Object.keys(dashboardData.timePreferences).length > 0
                ? Object.entries(dashboardData.timePreferences).sort(([,a], [,b]) => (b as number) - (a as number))[0][0]
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Fascia oraria più richiesta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sources Detail */}
        <Card>
          <CardHeader>
            <CardTitle>Dettaglio Sorgenti CTA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(dashboardData.sources).map(([source, count], index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium capitalize">{source}</h4>
                    <p className="text-sm text-gray-600">
                      {count as number} richieste callback
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {Math.round(((count as number) / dashboardData.totalCallbacks) * 100)}%
                  </Badge>
                </div>
              ))}
              {Object.keys(dashboardData.sources).length === 0 && (
                <p className="text-gray-500 text-center py-4">Nessuna conversione registrata</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Callbacks */}
        <Card>
          <CardHeader>
            <CardTitle>Ultime Richieste Callback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentCallbacks.map((callback) => (
                <div key={callback.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{callback.name}</h4>
                    <p className="text-sm text-gray-600">{callback.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{callback.time}</p>
                    <Badge variant="outline" className="text-xs">
                      {callback.source}
                    </Badge>
                  </div>
                </div>
              ))}
              {dashboardData.recentCallbacks.length === 0 && (
                <p className="text-gray-500 text-center py-4">Nessuna richiesta registrata</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Preferences Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Preferenze Orarie Callback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(dashboardData.timePreferences).map(([time, count], index) => (
              <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{count as number}</div>
                <div className="text-sm text-gray-600 capitalize">{time}</div>
                <div className="text-xs text-gray-500">
                  {Math.round(((count as number) / dashboardData.totalCallbacks) * 100)}% del totale
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Istruzioni per l'Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🔧 Setup Analytics</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sostituisci GA_MEASUREMENT_ID in index.html</li>
                <li>• Configura Facebook Pixel se necessario</li>
                <li>• Testa il tracking in console browser</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📊 Monitoraggio</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Dati salvati in localStorage</li>
                <li>• Esporta regolarmente per backup</li>
                <li>• Monitora le sorgenti più performanti</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionDashboard;

// src/components/BillUploadAnalyzer.tsx
import React, { useState, useCallback } from 'react';
import { Upload, FileText, Zap, Euro, TrendingDown, CheckCircle, AlertCircle, Loader2, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface BillData {
  provider: string;
  period: string;
  totalAmount: number;
  consumption: {
    electricity: number;
    gas: number;
  };
  contractType: string;
  customerCode: string;
}

interface ComparisonResult {
  provider: string;
  annualCost: number;
  saving: number;
  features: string[];
  greenEnergy: boolean;
  rating: number;
}

const BillUploadAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [billData, setBillData] = useState<BillData | null>(null);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const analyzeBill = useCallback(async (fileToAnalyze: File) => {
    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulazione upload e parsing progressivo
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulazione parsing bolletta (in produzione useresti OCR/AI)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockBillData: BillData = {
        provider: 'Enel Energia',
        period: 'Nov-Dic 2024',
        totalAmount: 245.67,
        consumption: {
          electricity: 450,
          gas: 180
        },
        contractType: 'Mercato Libero',
        customerCode: 'IT0001234567'
      };

      setBillData(mockBillData);
      setUploadProgress(100);

      // Genera risultati comparazione
      const results = generateComparisonResults(mockBillData);
      setComparisonResults(results);

      toast.success('Analisi completata! Abbiamo trovato ' + results.length + ' offerte migliori');
    } catch (error) {
      toast.error('Errore nell\'analisi della bolletta');
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  }, []);

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.startsWith('image/'))) {
      setFile(droppedFile);
      analyzeBill(droppedFile);
    } else {
      toast.error('Per favore carica un PDF o un\'immagine della bolletta');
    }
  }, [analyzeBill]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      analyzeBill(selectedFile);
    }
  };

  const generateComparisonResults = (data: BillData): ComparisonResult[] => {
    // Database fornitori mock (in produzione userai dati reali)
    const providers = [
      {
        provider: 'Iren Luce Gas',
        annualCost: data.totalAmount * 6 * 0.85,
        saving: data.totalAmount * 6 * 0.15,
        features: ['Prezzo fisso 24 mesi', 'Zero costi attivazione', 'App mobile'],
        greenEnergy: true,
        rating: 4.7
      },
      {
        provider: 'Sorgenia Next Energy',
        annualCost: data.totalAmount * 6 * 0.88,
        saving: data.totalAmount * 6 * 0.12,
        features: ['100% energia verde', 'Gestione 100% digitale', 'Cashback 5%'],
        greenEnergy: true,
        rating: 4.5
      },
      {
        provider: 'A2A Energia',
        annualCost: data.totalAmount * 6 * 0.90,
        saving: data.totalAmount * 6 * 0.10,
        features: ['Prezzo indicizzato', 'Bonus fedeltà', 'Assistenza dedicata'],
        greenEnergy: false,
        rating: 4.3
      },
      {
        provider: 'Plenitude',
        annualCost: data.totalAmount * 6 * 0.92,
        saving: data.totalAmount * 6 * 0.08,
        features: ['Fibra inclusa', 'Punti premio', 'Manutenzione caldaia'],
        greenEnergy: true,
        rating: 4.4
      },
      {
        provider: 'Edison Energia',
        annualCost: data.totalAmount * 6 * 0.93,
        saving: data.totalAmount * 6 * 0.07,
        features: ['Prezzo bloccato', 'Edison World', 'Consulente dedicato'],
        greenEnergy: false,
        rating: 4.2
      }
    ];

    return providers.sort((a, b) => b.saving - a.saving);
  };

  const handleCallbackRequest = async () => {
    if (!userInfo.name || !userInfo.phone) {
      toast.error('Inserisci nome e telefono per richiedere la callback');
      return;
    }

    // In produzione: salva nel database e invia notifica
    toast.success('Richiesta inviata! Ti contatteremo entro 24 ore');
    setShowCallbackForm(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Upload Section */}
      {!billData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Carica la Tua Bolletta
            </CardTitle>
            <CardDescription>
              Upload PDF o foto della bolletta per analisi immediata e confronto offerte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            >
              <input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,image/*"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">
                  Trascina qui la bolletta o clicca per selezionare
                </p>
                <p className="text-sm text-gray-500">
                  Supportati: PDF, JPG, PNG (max 10MB)
                </p>
              </label>
            </div>

            {isAnalyzing && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Analisi in corso...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Bill Analysis Results */}
      {billData && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Analisi Completata
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Fornitore Attuale</p>
                  <p className="font-semibold">{billData.provider}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Spesa Bimestrale</p>
                  <p className="font-semibold">€{billData.totalAmount.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Stima Annuale</p>
                  <p className="font-semibold">€{(billData.totalAmount * 6).toFixed(2)}</p>
                </div>
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Potenziale Risparmio Identificato!</strong> Abbiamo trovato {comparisonResults.length} offerte 
                  che potrebbero farti risparmiare fino a €{Math.max(...comparisonResults.map(r => r.saving)).toFixed(2)}/anno
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Comparison Results */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Le Migliori Offerte per Te</h3>
            
            {comparisonResults.map((result, index) => (
              <Card key={index} className={index === 0 ? 'border-green-500 border-2' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold">{result.provider}</h4>
                        {index === 0 && <Badge variant="default">Miglior Risparmio</Badge>}
                        {result.greenEnergy && <Badge variant="secondary">100% Verde</Badge>}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        ⭐ {result.rating}/5.0 
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        -€{result.saving.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">risparmio annuo</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Costo annuale stimato:</span>
                      <span className="font-medium">€{result.annualCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => setShowCallbackForm(true)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Richiedi Consulenza Gratuita
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Callback Form Modal */}
          {showCallbackForm && (
            <Card className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-4 md:left-auto md:w-96 z-50 shadow-2xl">
              <CardHeader>
                <CardTitle>Richiedi Callback Gratuita</CardTitle>
                <CardDescription>
                  Un nostro consulente ti contatterà entro 24 ore
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome e Cognome</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefono</Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    placeholder="+39 333 1234567"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (opzionale)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    placeholder="mario.rossi@email.com"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCallbackForm(false)}
                    className="flex-1"
                  >
                    Annulla
                  </Button>
                  <Button 
                    onClick={handleCallbackRequest}
                    className="flex-1"
                  >
                    Invia Richiesta
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default BillUploadAnalyzer;

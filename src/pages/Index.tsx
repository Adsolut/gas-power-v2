import { useState } from 'react';
import { Phone, Zap, Users, Shield, CheckCircle, Calculator, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import HeroCarousel from '@/components/HeroCarousel';

const Index = () => {
  const [utilityType, setUtilityType] = useState('both');
  const [currentKnowledge, setCurrentKnowledge] = useState('');
  const [isResident, setIsResident] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [residents, setResidents] = useState('');
  const [heatingType, setHeatingType] = useState('');
  const [hotWaterType, setHotWaterType] = useState('');
  const [cookingType, setCookingType] = useState('');

  const handleCallNow = () => {
    window.location.href = 'tel:0240137880';
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the form data
    // For now, we'll just redirect to call
    handleCallNow();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/img/logos/gas-power-logo.svg" 
                alt="Gas & Power Logo" 
                className="h-12 w-auto"
                onError={(e) => {
                  // Fallback to icon if logo doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-10 h-10 bg-gradient-to-br from-gaspower-green to-gaspower-darkgreen rounded-lg flex items-center justify-center hidden">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Gas & Power</h1>
            </div>
            <Button onClick={handleCallNow} className="bg-gaspower-blue hover:bg-blue-600 text-white font-semibold px-6 py-2">
              <Phone className="h-4 w-4 mr-2" />
              02 40137880
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                Confronta le <span className="text-gaspower-green">Migliori Offerte</span>
                <br />
                Luce e Gas
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                Trova la tariffa più conveniente per la tua casa. Confronta gratuitamente 
                le offerte dei principali fornitori e inizia subito a risparmiare.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-scale-in">
                <Button 
                  onClick={handleCallNow} 
                  className="bg-gaspower-blue hover:bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Chiama Ora: 02 40137880
                </Button>
                <p className="text-sm text-gray-500">Consulenza gratuita dal lunedì al venerdì 8-21, sabato 9-13</p>
              </div>
            </div>

            {/* Right Column - Hero Carousel */}
            <div className="h-96 lg:h-[500px] animate-fade-in">
              <HeroCarousel />
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center animate-fade-in">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="h-8 w-8 text-gaspower-green" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Oltre 200.000 Clienti</h3>
              <p className="text-gray-600">Si sono fidati di noi dal 2015</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="h-8 w-8 text-gaspower-green" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Gratuito</h3>
              <p className="text-gray-600">Confronto e consulenza senza costi</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Clock className="h-8 w-8 text-gaspower-green" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Risparmio Immediato</h3>
              <p className="text-gray-600">Attivazione in pochi minuti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Confronta le Tariffe in 3 Semplici Passi
            </h2>
            <p className="text-lg text-gray-600">
              Inserisci i dati della tua bolletta per ricevere un confronto personalizzato
            </p>
          </div>

          <Card className="shadow-xl border-primary-200">
            <CardHeader className="bg-gradient-to-r from-gaspower-green to-gaspower-darkgreen text-white">
              <CardTitle className="text-xl flex items-center">
                <Calculator className="h-6 w-6 mr-2" />
                Comparatore Bollette - Inserisci i tuoi dati
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleFormSubmit} className="space-y-8">
                {/* Utility Type Selection */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">
                    Che tipo di offerta vuoi confrontare?
                  </Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button
                      type="button"
                      variant={utilityType === 'electricity' ? 'default' : 'outline'}
                      onClick={() => setUtilityType('electricity')}
                      className="p-4 h-auto"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      Solo Luce
                    </Button>
                    <Button
                      type="button"
                      variant={utilityType === 'gas' ? 'default' : 'outline'}
                      onClick={() => setUtilityType('gas')}
                      className="p-4 h-auto"
                    >
                      🔥 Solo Gas
                    </Button>
                    <Button
                      type="button"
                      variant={utilityType === 'both' ? 'default' : 'outline'}
                      onClick={() => setUtilityType('both')}
                      className="p-4 h-auto bg-gaspower-green hover:bg-gaspower-darkgreen"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      Luce + Gas
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* User Knowledge */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="font-semibold mb-4 block">Conosci i tuoi consumi?</Label>
                    <RadioGroup value={currentKnowledge} onValueChange={setCurrentKnowledge}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="know-yes" />
                        <Label htmlFor="know-yes">Sì</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="know-no" />
                        <Label htmlFor="know-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label className="font-semibold mb-4 block">Sei residente?</Label>
                    <RadioGroup value={isResident} onValueChange={setIsResident}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="resident-yes" />
                        <Label htmlFor="resident-yes">Sì</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="resident-no" />
                        <Label htmlFor="resident-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <Separator />

                {/* Home Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="homeSize" className="font-semibold">Dimensione abitazione (mq)</Label>
                    <Input
                      id="homeSize"
                      type="number"
                      placeholder="es. 80"
                      value={homeSize}
                      onChange={(e) => setHomeSize(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="residents" className="font-semibold">Numero di persone in casa</Label>
                    <Select value={residents} onValueChange={setResidents}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 persona</SelectItem>
                        <SelectItem value="2">2 persone</SelectItem>
                        <SelectItem value="3">3 persone</SelectItem>
                        <SelectItem value="4">4 persone</SelectItem>
                        <SelectItem value="5+">5+ persone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Energy Usage */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Tipo di energia utilizzata:</h3>
                  
                  <div>
                    <Label className="font-semibold mb-2 block">Riscaldamento:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button
                        type="button"
                        variant={heatingType === 'electricity' ? 'default' : 'outline'}
                        onClick={() => setHeatingType('electricity')}
                        className="p-3"
                      >
                        Elettrico
                      </Button>
                      <Button
                        type="button"
                        variant={heatingType === 'gas' ? 'default' : 'outline'}
                        onClick={() => setHeatingType('gas')}
                        className="p-3"
                      >
                        Gas
                      </Button>
                      <Button
                        type="button"
                        variant={heatingType === 'other' ? 'default' : 'outline'}
                        onClick={() => setHeatingType('other')}
                        className="p-3"
                      >
                        Altro
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold mb-2 block">Acqua calda sanitaria:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button
                        type="button"
                        variant={hotWaterType === 'electricity' ? 'default' : 'outline'}
                        onClick={() => setHotWaterType('electricity')}
                        className="p-3"
                      >
                        Elettrico
                      </Button>
                      <Button
                        type="button"
                        variant={hotWaterType === 'gas' ? 'default' : 'outline'}
                        onClick={() => setHotWaterType('gas')}
                        className="p-3"
                      >
                        Gas
                      </Button>
                      <Button
                        type="button"
                        variant={hotWaterType === 'other' ? 'default' : 'outline'}
                        onClick={() => setHotWaterType('other')}
                        className="p-3"
                      >
                        Altro
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold mb-2 block">Cucina:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button
                        type="button"
                        variant={cookingType === 'electricity' ? 'default' : 'outline'}
                        onClick={() => setCookingType('electricity')}
                        className="p-3"
                      >
                        Elettrico
                      </Button>
                      <Button
                        type="button"
                        variant={cookingType === 'gas' ? 'default' : 'outline'}
                        onClick={() => setCookingType('gas')}
                        className="p-3"
                      >
                        Gas
                      </Button>
                      <Button
                        type="button"
                        variant={cookingType === 'other' ? 'default' : 'outline'}
                        onClick={() => setCookingType('other')}
                        className="p-3"
                      >
                        Altro
                      </Button>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="bg-gradient-to-r from-gaspower-green to-gaspower-darkgreen p-6 rounded-lg text-center">
                  <h3 className="text-white font-bold text-xl mb-4">
                    Ricevi Subito le Migliori Offerte!
                  </h3>
                  <p className="text-white/90 mb-6">
                    I nostri esperti ti chiameranno per fornirti un confronto personalizzato e gratuito
                  </p>
                  <Button
                    type="submit"
                    onClick={handleCallNow}
                    className="bg-white text-gaspower-green hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Chiama Ora: 02 40137880
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Come Funziona il Comparatore?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gaspower-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Inserisci i Dati</h3>
              <p className="text-gray-600">Compila il form con le informazioni della tua casa</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gaspower-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Confronta le Offerte</h3>
              <p className="text-gray-600">I nostri esperti valutano le migliori tariffe per te</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gaspower-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Ricevi la Chiamata</h3>
              <p className="text-gray-600">Ti contatteremo per illustrarti le soluzioni migliori</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gaspower-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Inizia a Risparmiare</h3>
              <p className="text-gray-600">Attiviamo la nuova offerta in pochi minuti</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={handleCallNow} 
              className="bg-gaspower-blue hover:bg-blue-600 text-white font-bold text-lg px-8 py-4"
            >
              <Phone className="h-5 w-5 mr-2" />
              Parlaci Ora: 02 40137880
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cosa Dicono i Nostri Clienti
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold">4.9/5</span>
              <span className="text-gray-600">su oltre 4.690 recensioni</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Servizio eccellente! Mi hanno aiutato a risparmiare oltre 300€ all'anno sulla bolletta. 
                  Consiglio vivamente."
                </p>
                <p className="font-semibold">- Marco R.</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Operatori competenti e disponibili. Il cambio è stato rapidissimo e senza problemi. 
                  Finalmente bollette più leggere!"
                </p>
                <p className="font-semibold">- Sara T.</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Trasparenza totale e nessun costo nascosto. Mi hanno spiegato tutto nei dettagli. 
                  Molto soddisfatto!"
                </p>
                <p className="font-semibold">- Giuseppe M.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-gaspower-green to-gaspower-darkgreen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Non Aspettare! Inizia Subito a Risparmiare
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Chiamaci ora per ricevere una consulenza gratuita personalizzata
          </p>
          <div className="space-y-6">
            <Button 
              onClick={handleCallNow} 
              className="bg-white text-gaspower-green hover:bg-gray-100 font-bold text-xl px-12 py-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Phone className="h-6 w-6 mr-3" />
              02 40137880
            </Button>
            <p className="text-white/80 text-sm">
              Servizio attivo: Lunedì-Venerdì 8:00-21:00 | Sabato 9:00-13:00
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/img/logos/gas-power-logo-white.svg" 
                  alt="Gas & Power Logo" 
                  className="h-8 w-auto"
                  onError={(e) => {
                    // Fallback to icon if logo doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-8 h-8 bg-gradient-to-br from-gaspower-green to-gaspower-darkgreen rounded-lg flex items-center justify-center hidden">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Gas & Power</h3>
              </div>
              <p className="text-gray-400">
                Il comparatore luce e gas numero uno in Italia
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Servizi</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Confronto Offerte Luce</li>
                <li>Confronto Offerte Gas</li>
                <li>Consulenza Gratuita</li>
                <li>Gestione Contratti</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contatti</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  02 40137880
                </li>
                <li>Lun-Ven: 8:00-21:00</li>
                <li>Sab: 9:00-13:00</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Perché Sceglierci</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-gaspower-green" />
                  100% Gratuito
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-gaspower-green" />
                  200.000+ Clienti
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-gaspower-green" />
                  Attivi dal 2015
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-800" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Gas & Power. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

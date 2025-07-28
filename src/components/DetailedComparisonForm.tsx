import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Calculator, Phone, Zap } from 'lucide-react';
import ApplianceSelector from './ApplianceSelector';

interface DetailedComparisonFormProps {
  onSubmit: () => void;
}

const DetailedComparisonForm = ({
  onSubmit
}: DetailedComparisonFormProps) => {
  const [utilityType, setUtilityType] = useState('both');
  const [currentKnowledge, setCurrentKnowledge] = useState('');
  const [isResident, setIsResident] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [residents, setResidents] = useState('');
  const [heatingType, setHeatingType] = useState('');
  const [hotWaterType, setHotWaterType] = useState('');
  const [cookingType, setCookingType] = useState('');
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const appliances = ['Lavatrice', 'Asciugatrice', 'Lavastoviglie', 'Aria cond.', 'Forno elettrico', 'Piano cottura', 'Frigorifero', 'Congelatore'];
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - PowerPro Style */}
        <div className="text-center mb-16">
          <span className="inline-block mb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 text-lg rounded-full font-bold">
            🆓 SERVIZIO GRATUITO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comparatore luce e gas: 
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}confronta le tariffe
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Compilando il form con i dati della bolletta confronti le offerte in base ai tuoi consumi. 
            Non chiediamo i tuoi dati personali!
          </p>
        </div>

        {/* Form Section - PowerPro Style White Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Calculator className="h-8 w-8 mr-3 text-green-600" />
              Le tue utenze
            </h3>
            <p className="text-gray-600">
              Completa il form per ricevere le migliori offerte personalizzate
            </p>
          </div>
            <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
              
              {/* Utility Type Selection */}
              <div>
                <Label className="text-lg font-semibold mb-3 md:mb-4 block">
                  Che tipo di offerta vuoi confrontare?
                </Label>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button type="button" variant={utilityType === 'electricity' ? 'default' : 'outline'} onClick={() => setUtilityType('electricity')} className="p-4 md:p-6 h-auto text-base">
                    <Zap className="h-5 w-5 mr-2" />
                    Luce
                  </Button>
                  <Button type="button" variant={utilityType === 'gas' ? 'default' : 'outline'} onClick={() => setUtilityType('gas')} className="p-4 md:p-6 h-auto text-base">
                    🔥 Gas
                  </Button>
                  <Button type="button" variant={utilityType === 'both' ? 'default' : 'outline'} onClick={() => setUtilityType('both')} className="p-4 md:p-6 h-auto bg-gaspower-blue hover:bg-blue-600 text-base">
                    <Zap className="h-5 w-5 mr-2" />
                    Luce e gas
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Knowledge and Residency */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Label className="font-semibold mb-2 md:mb-3 block text-base">Conosci i tuoi consumi?</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant={currentKnowledge === 'yes' ? 'default' : 'outline'} onClick={() => setCurrentKnowledge('yes')} className="p-3 md:p-4">
                      Sì
                    </Button>
                    <Button type="button" variant={currentKnowledge === 'no' ? 'default' : 'outline'} onClick={() => setCurrentKnowledge('no')} className="p-3 md:p-4">
                      No
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="font-semibold mb-2 md:mb-3 block text-base">Sei residente?</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant={isResident === 'yes' ? 'default' : 'outline'} onClick={() => setIsResident('yes')} className="p-3 md:p-4">
                      Sì
                    </Button>
                    <Button type="button" variant={isResident === 'no' ? 'default' : 'outline'} onClick={() => setIsResident('no')} className="p-3 md:p-4">
                      No
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Home Consumption Section */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 md:p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                  🏠 Il tuo consumo
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <div>
                    <Label htmlFor="homeSize" className="font-semibold text-red-600">* Quant'è grande la tua abitazione?</Label>
                    <div className="flex mt-2">
                      <Input id="homeSize" type="number" placeholder="80" value={homeSize} onChange={e => setHomeSize(e.target.value)} className="rounded-r-none" />
                      <div className="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-md flex items-center">
                        m2
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="font-semibold text-red-600">* Quante persone abitano in casa?</Label>
                    <div className="mt-2">
                      <input type="range" min="1" max="5" value={residents || 2} onChange={e => setResidents(e.target.value)} className="w-full h-2 bg-gaspower-green rounded-lg appearance-none cursor-pointer" />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>1</span>
                        <span className="font-semibold text-gaspower-green">{residents || 2}</span>
                        <span>5+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Energy Usage Types */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <Label className="font-semibold mb-2 md:mb-3 block">Qual è l'energia utilizzata per il riscaldamento:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button type="button" variant={heatingType === 'electricity' ? 'default' : 'outline'} onClick={() => setHeatingType('electricity')} className="p-3 md:p-4">
                        Luce
                      </Button>
                      <Button type="button" variant={heatingType === 'gas' ? 'default' : 'outline'} onClick={() => setHeatingType('gas')} className="p-3 md:p-4">
                        Gas
                      </Button>
                      <Button type="button" variant={heatingType === 'other' ? 'default' : 'outline'} onClick={() => setHeatingType('other')} className="p-3 md:p-4">
                        Altro
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold mb-2 md:mb-3 block">Qual è l'energia utilizzata per l'acqua calda sanitaria:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button type="button" variant={hotWaterType === 'electricity' ? 'default' : 'outline'} onClick={() => setHotWaterType('electricity')} className="p-3 md:p-4">
                        Luce
                      </Button>
                      <Button type="button" variant={hotWaterType === 'gas' ? 'default' : 'outline'} onClick={() => setHotWaterType('gas')} className="p-3 md:p-4">
                        Gas
                      </Button>
                      <Button type="button" variant={hotWaterType === 'other' ? 'default' : 'outline'} onClick={() => setHotWaterType('other')} className="p-3 md:p-4">
                        Altro
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold mb-2 md:mb-3 block">Qual è l'energia utilizzata per la cucina:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button type="button" variant={cookingType === 'electricity' ? 'default' : 'outline'} onClick={() => setCookingType('electricity')} className="p-3 md:p-4">
                        Luce
                      </Button>
                      <Button type="button" variant={cookingType === 'gas' ? 'default' : 'outline'} onClick={() => setCookingType('gas')} className="p-3 md:p-4">
                        Gas
                      </Button>
                      <Button type="button" variant={cookingType === 'other' ? 'default' : 'outline'} onClick={() => setCookingType('other')} className="p-3 md:p-4">
                        Altro
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="my-4 md:my-6" />

                {/* Appliances */}
                <ApplianceSelector title="* I tuoi elettrodomestici" appliances={appliances} selectedAppliances={selectedAppliances} onSelectionChange={setSelectedAppliances} />
              </div>

              {/* CTA Section - PowerPro Style */}
              <div className="text-center mt-12">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8">
                  <h3 className="text-3xl font-bold mb-6">Ricevi le migliori offerte</h3>
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <Calculator className="w-8 h-8 mb-4 mx-auto" />
                      <div className="text-2xl font-bold mb-2">100%</div>
                      <div className="text-green-100">Personalizzato</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <Zap className="w-8 h-8 mb-4 mx-auto" />
                      <div className="text-2xl font-bold mb-2">€300</div>
                      <div className="text-green-100">Risparmio medio annuo</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <Phone className="w-8 h-8 mb-4 mx-auto" />
                      <div className="text-2xl font-bold mb-2">0€</div>
                      <div className="text-green-100">Consulenza gratuita</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    Pronto per confrontare le tue tariffe?
                  </h4>
                  <p className="text-gray-600 mb-8">
                    Chiamaci ora per ricevere subito le offerte più convenienti 
                    per la tua casa. <strong>Servizio 100% gratuito.</strong>
                  </p>
                  
                  <a
                    href="tel:+390299220697"
                    onClick={(e) => {
                      e.preventDefault();
                      onSubmit();
                    }}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center justify-center no-underline"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    📞 Chiama Ora: 02 99 22 06 97
                  </a>
                </div>
              </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default DetailedComparisonForm;

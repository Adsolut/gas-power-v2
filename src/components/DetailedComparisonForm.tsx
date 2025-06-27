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
  return <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Comparatore luce e gas: confronta le tariffe</h2>
          <p className="text-lg text-gray-600 px-4">
            Compilando il form con i dati della bolletta confronti le offerte in base ai tuoi consumi. 
            <span className="inline-flex items-center ml-2 px-3 py-1 bg-gaspower-blue text-white text-sm rounded-full">
              Selectra 🔒 non chiede i tuoi dati personali!
            </span>
          </p>
        </div>

        <Card className="shadow-xl border-primary-200">
          <CardHeader className="bg-gradient-to-r from-gaspower-green to-gaspower-darkgreen text-white p-6">
            <CardTitle className="text-xl flex items-center">
              <Calculator className="h-6 w-6 mr-3" />
              Le tue utenze
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
                  <Button type="button" variant={utilityType === 'electricity' ? 'default' : 'outline'} onClick={() => setUtilityType('electricity')} className="p-6 h-auto text-base">
                    <Zap className="h-5 w-5 mr-2" />
                    Elettricità
                  </Button>
                  <Button type="button" variant={utilityType === 'gas' ? 'default' : 'outline'} onClick={() => setUtilityType('gas')} className="p-6 h-auto text-base">
                    🔥 Gas
                  </Button>
                  <Button type="button" variant={utilityType === 'both' ? 'default' : 'outline'} onClick={() => setUtilityType('both')} className="p-6 h-auto bg-gaspower-blue hover:bg-blue-600 text-base">
                    <Zap className="h-5 w-5 mr-2" />
                    Elettricità e gas
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Knowledge and Residency */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Label className="font-semibold mb-4 block text-base">Conosci i tuoi consumi?</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant={currentKnowledge === 'yes' ? 'default' : 'outline'} onClick={() => setCurrentKnowledge('yes')} className="p-4">
                      Sì
                    </Button>
                    <Button type="button" variant={currentKnowledge === 'no' ? 'default' : 'outline'} onClick={() => setCurrentKnowledge('no')} className="p-4">
                      No
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="font-semibold mb-4 block text-base">Sei residente?</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant={isResident === 'yes' ? 'default' : 'outline'} onClick={() => setIsResident('yes')} className="p-4">
                      Sì
                    </Button>
                    <Button type="button" variant={isResident === 'no' ? 'default' : 'outline'} onClick={() => setIsResident('no')} className="p-4">
                      No
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Home Consumption Section */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  🏠 Il tuo consumo
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                <div className="space-y-6">
                  <div>
                    <Label className="font-semibold mb-3 block">Qual è l'energia utilizzata per il riscaldamento:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button type="button" variant={heatingType === 'electricity' ? 'default' : 'outline'} onClick={() => setHeatingType('electricity')} className="p-4">
                        Luce
                      </Button>
                      <Button type="button" variant={heatingType === 'gas' ? 'default' : 'outline'} onClick={() => setHeatingType('gas')} className="p-4">
                        Gas
                      </Button>
                      <Button type="button" variant={heatingType === 'other' ? 'default' : 'outline'} onClick={() => setHeatingType('other')} className="p-4">
                        Altro
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold mb-3 block">Qual è l'energia utilizzata per l'acqua calda sanitaria:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button type="button" variant={hotWaterType === 'electricity' ? 'default' : 'outline'} onClick={() => setHotWaterType('electricity')} className="p-4">
                        Luce
                      </Button>
                      <Button type="button" variant={hotWaterType === 'gas' ? 'default' : 'outline'} onClick={() => setHotWaterType('gas')} className="p-4">
                        Gas
                      </Button>
                      <Button type="button" variant={hotWaterType === 'other' ? 'default' : 'outline'} onClick={() => setHotWaterType('other')} className="p-4">
                        Altro
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold mb-3 block">Qual è l'energia utilizzata per la cucina:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button type="button" variant={cookingType === 'electricity' ? 'default' : 'outline'} onClick={() => setCookingType('electricity')} className="p-4">
                        Luce
                      </Button>
                      <Button type="button" variant={cookingType === 'gas' ? 'default' : 'outline'} onClick={() => setCookingType('gas')} className="p-4">
                        Gas
                      </Button>
                      <Button type="button" variant={cookingType === 'other' ? 'default' : 'outline'} onClick={() => setCookingType('other')} className="p-4">
                        Altro
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Appliances */}
                <ApplianceSelector title="* I tuoi elettrodomestici" appliances={appliances} selectedAppliances={selectedAppliances} onSelectionChange={setSelectedAppliances} />
              </div>

              {/* CTA Button */}
              <div className="bg-gradient-to-r from-gaspower-blue to-blue-600 p-8 rounded-lg text-center">
                <h3 className="text-white font-bold text-2xl mb-4">
                  Confronta le offerte
                </h3>
                <Button type="submit" className="bg-white text-gaspower-blue hover:bg-gray-100 font-bold text-lg px-12 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Phone className="h-5 w-5 mr-2" />
                  Chiama Ora: 02 40137880
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>;
};
export default DetailedComparisonForm;
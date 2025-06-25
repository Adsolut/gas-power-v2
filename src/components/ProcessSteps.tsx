
import { Button } from '@/components/ui/button';

interface ProcessStepsProps {
  onCallNow: () => void;
}

const ProcessSteps = ({ onCallNow }: ProcessStepsProps) => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Come funziona il comparatore?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="bg-gaspower-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl relative">
              1
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                <div className="w-6 h-0.5 bg-gaspower-blue"></div>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gaspower-blue">Compila i dati di consumo e dell'utenza</h3>
            <p className="text-gray-600 text-sm">Se non conosci i tuoi consumi, niente panico: puoi fare una stima con le caratteristiche della casa.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gaspower-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl relative">
              2
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                <div className="w-6 h-0.5 bg-gaspower-blue"></div>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gaspower-blue">Valuta e confronta le offerte</h3>
            <p className="text-gray-600 text-sm">Scopri le offerte migliori, leggi il prezzo, i vantaggi e valuta il fornitore adatto per te e la tua famiglia.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gaspower-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl relative">
              3
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                <div className="w-6 h-0.5 bg-gaspower-blue"></div>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gaspower-blue">Attiva un'offerta conveniente</h3>
            <p className="text-gray-600 text-sm">Puoi farlo in autonomia o chiamando un operatore di Selectra, il cambio è gratuito e avviene in pochi minuti.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gaspower-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              4
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gaspower-green">Inizia a risparmiare in bolletta</h3>
            <p className="text-gray-600 text-sm">Bene, noi pensiamo a tutta la burocrazia, tu devi solo aspettare la comunicazione dal nuovo fornitore scelto.</p>
          </div>
        </div>

        <div className="text-center mt-12 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gaspower-blue text-white px-4 py-2 rounded-lg text-2xl font-bold mr-4">
              Più di 200000
            </div>
            <span className="text-lg text-gray-700">italiani si sono fidati di noi dal 2015</span>
            <Button 
              onClick={onCallNow}
              className="ml-6 bg-gaspower-blue hover:bg-blue-600"
            >
              📞 06 9450 0303
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;

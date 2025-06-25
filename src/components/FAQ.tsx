
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Come confrontare i prezzi luce e gas?",
      answer: "Per confrontare efficacemente i prezzi di luce e gas, è importante analizzare non solo il prezzo dell'energia, ma anche i costi fissi, le condizioni contrattuali e i servizi inclusi. Il nostro comparatore ti aiuta a valutare tutte queste variabili per trovare l'offerta più conveniente."
    },
    {
      question: "Avere un unico fornitore conviene?",
      answer: "Avere un unico fornitore per luce e gas può offrire diversi vantaggi: gestione semplificata con un'unica bolletta, possibili sconti dual fuel, e un unico interlocutore per l'assistenza. Tuttavia, non sempre rappresenta la soluzione più economica, per questo è importante confrontare le offerte."
    },
    {
      question: "Da cosa dipende la convenienza di un'offerta luce o gas?",
      answer: "La convenienza di un'offerta dipende da diversi fattori: i tuoi consumi annui, il tipo di tariffa (monoraria, bioraria, trioraria), i costi fissi mensili, eventuali promozioni attive, e i servizi aggiuntivi inclusi. Il nostro team valuta tutti questi aspetti per consigliarti la soluzione migliore."
    },
    {
      question: "Che cos'è il Portale offerte di ARERA?",
      answer: "Il Portale Offerte di ARERA è uno strumento ufficiale che permette di confrontare tutte le offerte commerciali per luce e gas disponibili sul mercato libero. È gestito dall'Autorità di Regolazione per Energia Reti e Ambiente e fornisce informazioni trasparenti sui prezzi e le condizioni."
    },
    {
      question: "Come cambiare fornitore?",
      answer: "Cambiare fornitore è semplice e gratuito. Basta contattare il nuovo fornitore scelto che si occuperà di tutte le pratiche burocratiche. Non ci sono interruzioni nella fornitura e non è necessario disdire il contratto precedente. Il cambio avviene automaticamente entro qualche settimana."
    },
    {
      question: "Come richiedere il bonus luce e gas?",
      answer: "I bonus luce e gas sono sconti sulle bollette destinati alle famiglie in difficoltà economica. Dal 2021 sono erogati automaticamente ai soggetti che ne hanno diritto, senza necessità di presentare domanda, utilizzando i dati dell'ISEE in corso di validità."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Domande frequenti sul confronto delle tariffe di energia
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;


import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const HeroCarousel = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  const heroImages = [
    {
      src: '/img/hero/famiglia-risparmio.jpg',
      alt: 'Famiglia felice che risparmia sulla bolletta energetica',
      title: 'Risparmia fino a 500€ all\'anno'
    },
    {
      src: '/img/hero/consulente-telefono.jpg', 
      alt: 'Consulente Gas & Power al telefono pronto ad aiutarti',
      title: 'Consulenza gratuita e personalizzata'
    },
    {
      src: '/img/hero/casa-moderna.jpg',
      alt: 'Casa moderna con impianti energetici efficienti',
      title: 'Soluzioni per la tua casa'
    },
    {
      src: '/img/hero/grafici-risparmio.jpg',
      alt: 'Grafici che mostrano il risparmio energetico ottenuto',
      title: 'Confronta e scegli la migliore offerta'
    }
  ];

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(interval);
      api.destroy?.();
    };
  }, [api]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full overflow-hidden">
                {/* Background Image with 80% Opacity */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                  style={{ backgroundImage: `url(${image.src})` }}
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Image claim positioned at bottom */}
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-lg">
                    {image.title}
                  </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white z-20" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white z-20" />
      </Carousel>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Vai all'immagine ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

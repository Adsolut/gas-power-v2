
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

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
    }, 4000);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(interval);
      api.destroy?.();
    };
  }, [api]);

  return (
    <div className="relative w-full h-full">
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
              <Card className="h-full border-0 shadow-none">
                <CardContent className="relative h-full p-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <h3 className="text-white font-bold text-lg md:text-xl mb-2">
                      {image.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 shadow-lg" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 shadow-lg" />
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

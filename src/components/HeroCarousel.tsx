import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const heroImages = [
    {
      src: '/img/hero/famiglia-risparmio.jpg',
      alt: 'Famiglia felice che risparmia sulla bolletta energetica',
      title: 'Risparmia fino a €500 all\'anno'
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

  // Auto-scroll del carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Cambia slide ogni 5 secondi

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Preload delle immagini
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = heroImages.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log(`✅ Immagine caricata: ${image.src}`);
            resolve(img);
          };
          img.onerror = () => {
            console.error(`❌ Errore caricamento: ${image.src}`);
            reject(new Error(`Failed to load ${image.src}`));
          };
          img.src = image.src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoaded(true);
        console.log('🎉 Tutte le immagini del carousel sono state caricate!');
      } catch (error) {
        console.error('⚠️ Alcune immagini non sono state caricate:', error);
        setIsLoaded(true); // Mostra comunque il carousel
      }
    };

    preloadImages();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 w-full h-full">
        {/* Loading fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-green-500 to-blue-700 animate-pulse">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-sm opacity-80">Caricamento immagini...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Hero Image */}
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              onLoad={() => {
                console.log(`✅ Slide ${index + 1} visualizzata: ${image.src}`);
              }}
              onError={(e) => {
                console.error(`❌ Errore slide ${index + 1}: ${image.src}`);
                // Fallback gradient
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            
            {/* Fallback gradient background */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-600 hidden"
              style={{ display: 'none' }}
            />
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Image title positioned at bottom */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 z-20">
              <h3 className="text-white font-bold text-sm sm:text-lg md:text-xl drop-shadow-lg text-center sm:text-left opacity-90">
                {image.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white z-30 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Immagine precedente"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white z-30 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Immagine successiva"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              currentSlide === index 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Vai all'immagine ${index + 1}: ${heroImages[index].title}`}
          />
        ))}
      </div>

      {/* Slide Counter (Desktop only) */}
      <div className="hidden sm:block absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm z-30">
        {currentSlide + 1} / {heroImages.length}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / heroImages.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;

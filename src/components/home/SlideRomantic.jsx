import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const memories = [
    {
      id: 1,
      title: "Primer Encuentro",
      note: "Ese día, el tiempo se detuvo... y mi corazón comenzó a latir solo para ti"
    },
    {
      id: 2,
      title: "Bajo la Lluvia",
      note: "Bailamos sin música, solo con el sonido de la lluvia y nuestros latidos"
    },
    {
      id: 3,
      title: "Atardecer Eterno",
      note: "Prometimos que cada atardecer sería nuestro testigo de amor eterno"
    },
    {
      id: 4,
      title: "Risas Compartidas",
      note: "Nuestras risas son la melodía más hermosa que he escuchado jamás"
    },
    {
      id: 5,
      title: "Promesas Hechas",
      note: "En cada 'te amo' está escrita nuestra eternidad juntos"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentMemory = memories[currentIndex];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Recuerdos
        </motion.h1>

        <div className="relative w-full max-w-4xl">
          <div className="relative h-80 md:h-[450px] rounded-2xl border border-pink-500/20 bg-gray-900/50 shadow-xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ 
                  x: direction > 0 ? "100%" : "-100%",
                  opacity: 0
                }}
                animate={{ 
                  x: 0,
                  opacity: 1
                }}
                exit={{ 
                  x: direction > 0 ? "-100%" : "100%",
                  opacity: 0
                }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
              >
                <h2 
                  className="text-2xl md:text-3xl font-bold text-pink-300 mb-4"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {currentMemory.title}
                </h2>
                
                <p 
                  className="text-pink-200 text-lg md:text-xl max-w-2xl leading-relaxed px-4"
                  style={{ 
                    fontFamily: '"Caveat", cursive',
                    fontSize: '1.3rem'
                  }}
                >
                  {currentMemory.note}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 border border-pink-500/30 rounded-full flex items-center justify-center text-pink-300 hover:bg-black/70 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 border border-pink-500/30 rounded-full flex items-center justify-center text-pink-300 hover:bg-black/70 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
              {memories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-pink-400 w-3' 
                      : 'bg-pink-600/50 hover:bg-pink-500/70'
                  }`}
                  aria-label={`Ir al recuerdo ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`mt-6 px-5 py-2 rounded-lg font-medium transition-all duration-300 border flex items-center justify-center mx-auto ${
              isAutoPlaying 
                ? 'bg-green-900/40 border-green-700 text-green-300 hover:bg-green-900/60' 
                : 'bg-pink-900/40 border-pink-700 text-pink-300 hover:bg-pink-900/60'
            }`}
            aria-label={isAutoPlaying ? "Pausar presentación" : "Reanudar presentación"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Reproducir
              </>
            )}
          </button>
        </div>

        <p 
          className="mt-10 text-pink-300/80 text-lg italic text-center max-w-2xl px-4"
          style={{ fontFamily: '"Caveat", cursive' }}
        >
          Cada momento contigo es un tesoro que guardo para la eternidad.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}

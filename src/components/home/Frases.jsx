import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const vnsMoments = useMemo(() => [
    {
      id: 1,
      phrase: "Tu sonrisa ilumina mis días más oscuros",
      color: "from-pink-400 to-purple-500"
    },
    {
      id: 2,
      phrase: "En tus ojos encuentro mi hogar",
      color: "from-rose-400 to-pink-500"
    },
    {
      id: 3,
      phrase: "Cada latido es para ti, VNS",
      color: "from-purple-400 to-indigo-500"
    },
    {
      id: 4,
      phrase: "Eres mi paz en medio de la tormenta",
      color: "from-fuchsia-400 to-pink-500"
    },
    {
      id: 5,
      phrase: "Contigo, todo es posible",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 6,
      phrase: "Mi corazón late al ritmo de tu nombre",
      color: "from-indigo-400 to-purple-500"
    }
  ], []);

  useEffect(() => {
    if (!isPlaying || vnsMoments.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % vnsMoments.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPlaying, vnsMoments]);

  const currentMoment = vnsMoments[currentIndex] || vnsMoments[0];

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
      {/* Subtle cosmic background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.05)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(219,39,119,0.04)_0%,transparent_70%)]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Clean title */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 sm:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-400 to-violet-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            letterSpacing: '-0.01em'
          }}
        >
          Mi Razón de Sonreír
        </motion.h1>

        {/* Minimal photo container */}
        <div className="relative w-full max-w-3xl mb-8 sm:mb-10">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-pink-500/15 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-800">
            {/* Simple glow effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-500/5 rounded-full blur-xl"></div>
            
            {/* Subtle signature */}
            <div className="absolute bottom-4 right-4 text-pink-400/30 text-lg font-light">
              VNS
            </div>
          </div>
        </div>

        {/* Clean phrase display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`phrase-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative max-w-3xl mx-auto"
          >
            <p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-pink-200 font-light mb-1 px-4 leading-relaxed"
              style={{ 
                fontFamily: '"Caveat", cursive',
                textShadow: '0 1px 5px rgba(192, 38, 123, 0.3)',
                lineHeight: '1.5'
              }}
            >
              "{currentMoment.phrase}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Simple controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
          <div className="flex gap-1.5">
            {vnsMoments.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-pink-400 w-2.5' 
                    : 'bg-pink-600/40 hover:bg-pink-500/60'
                }`}
                aria-label={`Frase ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-md font-medium text-sm transition-all duration-300 border ${
              isPlaying 
                ? 'bg-green-900/30 border-green-700/50 text-green-300 hover:bg-green-900/40' 
                : 'bg-pink-900/30 border-pink-700/50 text-pink-300 hover:bg-pink-900/40'
            }`}
            aria-label={isPlaying ? "Pausar rotación" : "Reproducir rotación"}
          >
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </button>
        </div>

        {/* Simple subtitle */}
        <p 
          className="mt-8 text-pink-300/70 text-base sm:text-lg italic text-center max-w-md px-4"
          style={{ 
            fontFamily: '"Caveat", cursive'
          }}
        >
          Para VNS, mi eterno motivo de alegría
        </p>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-pink-900/10 to-transparent"></div>
    </section>
  );
}

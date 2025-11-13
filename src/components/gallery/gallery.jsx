import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  // Beautiful romantic images
  const romanticImages = [
    { id: 1, src: "img/gallery/01.jpg", title: "Vanesa", description: "El sol hoy amaneció más brillante, pero aún palidece comparado con el resplandor que siento cuando pienso en ti." },
    { id: 2, src: "img/gallery/02.jpg", title: "Vanesa", description: "El sol hoy amaneció más brillante, pero aún palidece comparado con el resplandor que siento cuando pienso en ti." },
    { id: 3, src: "img/gallery/03.jpg", title: "Vanesa", description: "No necesito fechas en el calendario para celebrarte, porque cada latido es una fiesta donde tú eres la invitada de honor." },
    { id: 4, src: "img/gallery/04.jpg", title: "Vanesa", description: "En el diccionario de mi vida, 'felicidad' tiene tu rostro." },
    // { id: 5, src: "img/history/01.png", title: "Vanesa", description: "El silencio cómodo de nuestras mañanas, donde cada sorbo es una caricia en forma de vapor." },
    // { id: 6, src: "https://placehold.co/600x600/magenta/8b5cf6?text=Promesas", title: "Promesas Hechas", description: "Tejiendo nuestro futuro con hilos de confianza, uno a uno, momento a momento." },
    // { id: 7, src: "https://placehold.co/600x600/deep-pink/f472b6?text=Caminatas", title: "Caminatas Sin Rumbo", description: "Descubriendo que el mejor destino siempre es tu mano en la mía." },
    // { id: 8, src: "https://placehold.co/600x600/rose/f9a8d4?text=Estrellas", title: "Contando Estrellas", description: "Encontrando constelaciones en tus ojos y promesas escritas en el cielo nocturno." }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Create romantic floating hearts
  const createFloatingHearts = () => {
    const hearts = [];
    for (let i = 0; i < 12; i++) {
      hearts.push(
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            scale: 0.2,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50
          }}
          animate={{ 
            opacity: [0.05, 0.2, 0.05],
            scale: [0.2, 0.5, 0.2],
            y: ["0%", "-120%"],
            rotate: [0, Math.random() > 0.5 ? 15 : -15, 0]
          }}
          transition={{ 
            duration: 15 + i * 2,
            repeat: Infinity,
            delay: i * 0.8
          }}
          className="absolute text-pink-400/40"
          style={{ 
            left: `${10 + i * 8}%`,
            bottom: `${5 + i * 6}%`,
            fontSize: `${0.8 + i * 0.1}rem`
          }}
        >
          <Heart className="w-3 h-3" fill="currentColor" />
        </motion.div>
      );
    }
    return hearts;
  };

  // Handle drag functionality
  const handleMouseDown = (e) => {
    if (selectedImage) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y
    };
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging || selectedImage) return;
    e.preventDefault();
    positionRef.current = {
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    };
    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="relative">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
          >
            <Heart className="w-16 h-16" fill="currentColor" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 border-2 border-pink-400/30 rounded-full animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/10 to-deep-black text-white overflow-hidden relative">
      {/* Romantic background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(219,39,119,0.06)_0%,transparent_70%)]"></div>
      
      {/* Floating hearts */}

      {/* Floating hearts */}
      {createFloatingHearts()}
      
      {/* Romantic cosmic glow at corners */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
      
      <header className="fixed top-0 left-0 w-full p-6 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1.5">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-pink-400 rounded-full drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="w-3 h-3 bg-purple-500 rounded-full drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              />
            </div>
            <motion.span 
              className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              NUESTRO UNIVERSO
            </motion.span>
          </div>
          <div className="text-center md:text-right">
            <motion.span 
              className="block text-sm md:text-base text-pink-300/90 italic drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              Para ti Vanesa, mi razón de sonreír
            </motion.span>
          </div>
        </div>
      </header>

      <main 
        className="pt-24 pb-20 px-4"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={containerRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 cursor-grab select-none"
            onMouseDown={handleMouseDown}
          >
            {romanticImages.map((image) => (
              <motion.div
                key={image.id}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedImage(image)}
                className="group cursor-pointer relative"
              >
                <div className="aspect-square overflow-hidden rounded-xl relative border-2 border-pink-500/0 group-hover:border-pink-500/30 transition-all duration-300">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 p-2">
                      <span className="block text-lg font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-1 drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]">
                        {image.title}
                      </span>
                      <p className="text-sm text-pink-200/90 italic leading-relaxed drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                         style={{ fontFamily: '"Caveat", cursive' }}>
                        "{image.description}"
                      </p>
                    </div>
                  </div>
                  
                  {/* Heart glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 border border-pink-500/0 group-hover:border-pink-500/20 rounded-xl transition-all duration-300 pointer-events-none"></div>
                </div>
                
                {/* Subtle heart at corner */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-2 right-2 text-pink-400/80"
                >
                  <Heart className="w-4 h-4" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 z-10">
        <div className="max-w-7xl mx-auto text-center text-pink-400/60 text-sm">
          <p className="drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
            Cada momento contigo es un tesoro que guardo para la eternidad • 2025
          </p>
        </div>
      </footer>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <div className="relative max-w-5xl w-full mx-4" onClick={e => e.stopPropagation()}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-pink-500/20">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Romantic glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="block text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 drop-shadow-[0_0_25px_rgba(236,72,153,0.8)] mb-2"
                      style={{ fontFamily: '"Playfair Display", serif' }}>
                      {selectedImage.title}
                    </span>
                  </motion.div>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl italic text-pink-200/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]"
                    style={{ fontFamily: '"Caveat", cursive' }}>
                    "{selectedImage.description}"
                  </motion.p>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <motion.button
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = romanticImages.findIndex(img => img.id === selectedImage.id);
                    if (currentIndex > 0) setSelectedImage(romanticImages[currentIndex - 1]);
                  }}
                  className="p-3 bg-black/40 backdrop-blur-sm border border-pink-500/30 rounded-full text-pink-300 hover:bg-pink-500/10 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
              </div>
              
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = romanticImages.findIndex(img => img.id === selectedImage.id);
                    if (currentIndex < romanticImages.length - 1) setSelectedImage(romanticImages[currentIndex + 1]);
                  }}
                  className="p-3 bg-black/40 backdrop-blur-sm border border-pink-500/30 rounded-full text-pink-300 hover:bg-pink-500/10 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm border border-pink-500/30 rounded-full text-pink-300 hover:bg-pink-500/10 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom romantic glow */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-pink-900/20 to-transparent"></div>
      
      {/* Elegant border glow */}
      <div className="absolute inset-0 border border-pink-500/10 rounded-2xl m-4 pointer-events-none"></div>
      
      {/* Special glow for VNS text */}
      <div className="absolute top-6 right-6 text-pink-400 text-lg font-bold drop-shadow-[0_0_20px_rgba(236,72,153,0.9)] animate-pulse-slow">
        <motion.span
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ❤️ VNS ❤️
        </motion.span>
      </div>
    </div>
  );
}

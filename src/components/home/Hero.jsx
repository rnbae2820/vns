import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [hearts, setHearts] = useState([]);
  const fullText = "Vanesa";

  // Efecto de máquina de escribir con cursor parpadeante
  useEffect(() => {
    let typeIndex = 0;
    const typeTimer = setInterval(() => {
      if (typeIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, typeIndex));
        typeIndex++;
      } else {
        clearInterval(typeTimer);
        setShowContent(true);
      }
    }, 150);

    // Efecto de parpadeo del cursor
    const cursorTimer = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typeTimer);
      clearInterval(cursorTimer);
    };
  }, []);

  // Función para generar corazones al hacer clic en "Te Amo"
  const handleLoveClick = () => {
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const newHeart = {
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          floating: true,
        };
        setHearts(prev => [...prev, newHeart]);
        setTimeout(() => {
          setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
        }, 3000);
      }, i * 100);
    }
  };

  // Generar corazones flotantes animados
  const FloatingHearts = () => {
    const hearts = [];
    for (let i = 0; i < 12; i++) {
      hearts.push(
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            scale: 0.2,
            y: "100%"
          }}
          animate={{ 
            opacity: [0.05, 0.2, 0.05],
            scale: [0.3, 0.6, 0.3],
            y: ["100%", "-150%"],
            x: [0, Math.sin(i) * 15, 0],
            rotate: [0, i % 2 === 0 ? 15 : -15, 0]
          }}
          transition={{ 
            duration: 15 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
          className="absolute text-pink-400/40"
          style={{ 
            left: `${10 + i * 7}%`,
            bottom: `${5 + i * 4}%`,
            fontSize: `${0.8 + i * 0.1}rem`
          }}
        >
          <Heart className="w-3 h-3" fill="currentColor" />
        </motion.div>
      );
    }
    return hearts;
  };

  // Efectos de brillo y nebulosas
  const BackgroundEffects = () => (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(219,39,119,0.06)_0%,transparent_70%)]"></div>
      
      {/* Brillo superior izquierda */}
      <div className="absolute -top-32 left-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
      
      {/* Brillo inferior derecha */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl"></div>
      
      {/* Brillo central sutil */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-pink-500/5 via-purple-500/10 to-pink-500/5 rounded-full blur-3xl"></div>
    </>
  );

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row justify-center items-center bg-black overflow-hidden">
      {/* Efectos de fondo románticos */}
      <BackgroundEffects />
      
      {/* Corazones flotantes */}
      <FloatingHearts />
      
      {/* Corazones de interacción */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400 text-3xl z-50"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          animate={{
            y: [-40, -80, -120],
            opacity: [1, 0.9, 0],
            scale: [1, 1.3, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 3 }}
        >
          ❤️
        </motion.div>
      ))}
      
      {/* Contenido principal */}
      <div className="relative z-10 px-6 md:w-1/2 py-16 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-400 to-pink-300 mb-6"
            style={{ 
              fontFamily: '"Playfair Display", serif',
              textShadow: '0 0 30px rgba(236, 72, 153, 0.8)',
              letterSpacing: '-0.02em'
            }}
          >
            {displayText}
            <span 
              className={`inline-block ml-1 transition-opacity duration-500 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ color: '#ff66cc' }}
            >
              |
            </span>
          </h1>

          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p 
                  className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-pink-200/90 leading-relaxed max-w-2xl mx-auto md:mx-0"
                  style={{ 
                    fontFamily: '"Caveat", cursive',
                    textShadow: '0 0 15px rgba(236, 72, 153, 0.6)',
                    lineHeight: '1.7'
                  }}
                >
                  Eres el latido de mi corazón, la luz en mi oscuridad, 
                  la melodía que canta en mi alma cada vez que pienso en ti.
                </p>

                <motion.p 
                  className="mt-4 text-lg sm:text-xl md:text-2xl text-purple-200/90 leading-relaxed max-w-2xl mx-auto md:mx-0"
                  style={{ 
                    fontFamily: '"Caveat", cursive',
                    textShadow: '0 0 15px rgba(168, 85, 247, 0.6)',
                    lineHeight: '1.7'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  Mi amor por ti es infinito como las estrellas en el cielo, 
                  eterno como el tiempo que pasa, profundo como el abismo del corazón.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-8 flex justify-center md:justify-start"
                >
                  <motion.button
                    onClick={handleLoveClick}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 40px rgba(236, 72, 153, 0.9)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-bold rounded-xl text-xl relative overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all duration-300 flex items-center gap-3"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Te Amo<Heart className="w-6 h-6" fill="currentColor" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Imagen Moto con efectos mejorados */}
      <div className="relative z-10 md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-[350px] sm:w-[400px] h-[350px] sm:h-[400px] relative"
        >
          <motion.div
            animate={{ 
              rotate: [0, 2, -2, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <img 
              src="./img/vane/01.jpg" 
              alt="moto romántica" 
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 0 25px rgba(236, 72, 153, 0.8))',
                maskImage: 'radial-gradient(circle, white 75%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle, white 75%, transparent 100%)'
              }}
            />
            
            {/* Efecto de brillo alrededor */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-xl animate-pulse-slow"></div>
            
            {/* Corazón en el centro */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.9)]"
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" />
            </motion.div>
          </motion.div>
          
          {/* Decoración inferior */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-pink-300 text-sm sm:text-base" style={{ fontFamily: '"Caveat", cursive' }}>
                Nuestro amor eterno
              </span>
            </div>
            <div className="flex justify-center mt-2 space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <Heart className="w-3 h-3 text-pink-400" fill="currentColor" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Borde inferior neón sutil */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-pink-900/20 to-transparent"></div>
      
      {/* Borde suave alrededor */}
      <div className="absolute inset-0 border border-pink-500/10 rounded-2xl m-4 pointer-events-none"></div>
    </section>
  );
}

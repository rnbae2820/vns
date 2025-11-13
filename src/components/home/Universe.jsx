import { useState, useEffect } from "react";
import { Heart, Star, Sparkle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Universe() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsContentVisible(true), 500);
    const sparkleTimer = setTimeout(() => setShowSparkles(true), 1200);
    
    // Efecto de pulso constante
    const pulseInterval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(sparkleTimer);
      clearInterval(pulseInterval);
    };
  }, []);

  // Generate cosmic particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: 4 + Math.random() * 6,
    color: Math.random() > 0.6 ? 'pink' : Math.random() > 0.3 ? 'purple' : 'white'
  }));

  const handleHeartClick = () => {
    for (let i = 0; i < 8; i++) {
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
        }, 2500);
      }, i * 150);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-purple-950/30 to-pink-950/20 flex items-center justify-center overflow-hidden">
      {/* Cosmic background with subtle gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.12)_0%,transparent_80%)]"></div>
      
      {/* Floating cosmic particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.color === 'pink' ? 'bg-pink-300' : 
            particle.color === 'purple' ? 'bg-purple-300' : 'bg-white/80'
          }`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top
          }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scale: [0.5, 1.5, 0.5],
            x: [-5, 5, -5],
            y: [-5, 5, -5]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Constellation lines - subtle connections */}
      <div className="absolute inset-0 opacity-15">
        {[...Array(25)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute bg-gradient-to-r from-pink-400/40 to-purple-400/40"
            style={{
              width: '1.5px',
              height: `${20 + i * 10}px`,
              left: `${5 + i * 4}%`,
              top: `${10 + i * 2}%`,
              transform: `rotate(${i * 8}deg)`,
              filter: 'blur(0.8px)'
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              height: [`${20 + i * 10}px`, `${30 + i * 10}px`, `${20 + i * 10}px`]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating hearts animation - more romantic */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ 
            opacity: [0.05, 0.2, 0.05],
            y: ["0%", "-150%"],
            scale: [0.2, 0.8, 0.2],
            rotate: [0, i % 2 === 0 ? 20 : -20, 0]
          }}
          transition={{ 
            duration: 15 + i * 2,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{ 
            left: `${5 + i * 5}%`,
            bottom: `${5 + i * 2}%`,
            color: i % 4 === 0 ? '#ff69b4' : i % 4 === 1 ? '#c084fc' : i % 4 === 2 ? '#f472b6' : '#ec4899'
          }}
        >
          <Heart className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />
        </motion.div>
      ))}

      {/* Corazones flotantes de interacción */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400 text-3xl"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          animate={{
            y: [-30, -60, -90],
            opacity: [1, 0.9, 0],
            scale: [1, 1.3, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2.5 }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Sparkles that appear after delay */}
      {showSparkles && [...Array(30)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            y: ["0%", "-60px"],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4,
            delay: i * 0.4,
            repeat: Infinity
          }}
          className="absolute"
          style={{
            left: `${10 + i * 3}%`,
            top: `${20 + i * 1.5}%`,
            color: i % 3 === 0 ? '#ff8ecc' : i % 3 === 1 ? '#c4a7ff' : '#fda4af'
          }}
        >
          {i % 4 === 0 ? (
            <Sparkle className="w-4 h-4" fill="currentColor" />
          ) : i % 4 === 1 ? (
            <Star className="w-3 h-3" fill="currentColor" />
          ) : (
            <Heart className="w-2 h-2" fill="currentColor" />
          )}
        </motion.div>
      ))}

      <div className="max-w-3xl mx-auto text-center relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10"
        >
          <motion.div
            className="flex justify-center items-center gap-4 mb-8"
            animate={pulse ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 1 }}
          >
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  y: [0, -8, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-6 h-6 text-pink-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mb-4"
            style={{ 
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '-0.03em',
              textShadow: '0 0 50px rgba(236, 72, 153, 0.9)'
            }}
          >
            Nuestro Universo
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-pink-100 italic mb-2"
            style={{ 
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '0.05em',
              textShadow: '0 0 35px rgba(236, 72, 153, 0.7)'
            }}
          >
            Nely Vanesa
          </motion.h2>
        </motion.div>

        <AnimatePresence>
          {isContentVisible && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl text-pink-50 leading-relaxed max-w-3xl mx-auto font-light italic"
                style={{ 
                  fontFamily: '"Dancing Script", cursive',
                  lineHeight: '1.9',
                  letterSpacing: '0.03em',
                  textShadow: '0 0 25px rgba(249, 115, 22, 0.6)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
              >
                "En este universo infinito de estrellas, encontré la luz que ilumina mi alma... tu sonrisa."
              </motion.p>
              
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl text-purple-50 leading-relaxed max-w-3xl mx-auto font-light italic"
                style={{ 
                  fontFamily: '"Dancing Script", cursive',
                  lineHeight: '1.9',
                  letterSpacing: '0.03em',
                  textShadow: '0 0 25px rgba(168, 85, 247, 0.6)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.2 }}
              >
                "Cada latido mío late por ti, cada respiración es para amarte más..."
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isContentVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="mt-16 space-y-4"
            >
              <motion.p 
                className="text-2xl text-pink-100/95 drop-shadow-[0_0_25px_rgba(236,72,153,0.7)]"
                style={{ 
                  fontFamily: '"Dancing Script", cursive',
                  fontWeight: 600,
                  letterSpacing: '0.04em'
                }}
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Con todo mi corazón,<br />
                <span className="text-3xl">Mi Amor Eterno</span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón de corazón para interacción */}
        <motion.button
          onClick={handleHeartClick}
          className="mt-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-6 shadow-2xl"
          whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(236, 72, 153, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Heart className="w-8 h-8 text-white fill-current" />
        </motion.button>
      </div>

      {/* Romantic cosmic glow at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-purple-950/90 via-pink-900/50 to-transparent blur-3xl"></div>
      
      {/* Subtle decorative border */}
      <div className="absolute inset-0 border-2 border-pink-500/30 rounded-3xl pointer-events-none"></div>
      
      {/* Center cosmic glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-pink-500/8 via-purple-500/12 to-pink-500/8 rounded-full blur-3xl opacity-70"></div>
    </section>
  );
}

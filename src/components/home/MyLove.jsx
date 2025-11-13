import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function MyLove() {
  const [isLoaded, setIsLoaded] = useState(false);
  const romanticText = "En cada latido, en cada respiración, en cada momento... eres mi universo, mi razón, mi eterno amor.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Create floating hearts
  const createFloatingHearts = () => {
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
            scale: [0.3, 0.5, 0.3],
            y: ["100%", "-120%"],
            x: [0, Math.sin(i) * 15, 0],
            rotate: [0, Math.random() > 0.5 ? 15 : -15, 0]
          }}
          transition={{ 
            duration: 15 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.8
          }}
          className="absolute text-pink-400/40"
          style={{ 
            left: `${10 + i * 8}%`,
            bottom: `${5 + i * 6}%`,
            fontSize: `${0.7 + i * 0.1}rem`
          }}
        >
          <Heart className="w-3 h-3" fill="currentColor" />
        </motion.div>
      );
    }
    return hearts;
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Romantic background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(219,39,119,0.06)_0%,transparent_70%)]"></div>
      
      {/* Floating hearts */}
      {createFloatingHearts()}
      
      {/* Video placeholder background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-pink-900/20 to-purple-900/20 backdrop-blur-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-pink-400 animate-pulse mb-4 mx-auto"></div>
              <p className="text-pink-300/70 text-sm">Video romántico</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  y: [0, -3, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                <Heart className="w-8 h-8 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-300 to-pink-300 drop-shadow-[0_0_25px_rgba(236,72,153,0.85)]"
            style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.02em' }}
          >
            PARA SIEMPRE TUYO
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p 
              className="text-2xl md:text-3xl text-pink-100 leading-relaxed italic max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]"
              style={{ 
                fontFamily: '"Caveat", cursive',
                lineHeight: '1.8',
                textShadow: '0 0 15px rgba(236, 72, 153, 0.7)'
              }}
            >
              {romanticText}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12"
          >
            <p 
              className="text-xl md:text-2xl text-pink-200 font-light italic"
              style={{ 
                fontFamily: '"Dancing Script", cursive',
                textShadow: '0 0 12px rgba(236, 72, 153, 0.6)'
              }}
            >
              Con todo mi corazón,<br />
              Para VNS, mi eterna razón de sonreír
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom romantic glow */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-pink-900/20 to-transparent"></div>
      
      {/* Border glow */}
      <div className="absolute inset-0 border border-pink-500/10 rounded-2xl m-4 pointer-events-none"></div>
      
      {/* VNS text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-8 right-8 text-pink-400 text-lg font-bold drop-shadow-[0_0_20px_rgba(236,72,153,0.95)]"
      >
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
          <span style={{ fontFamily: '"Caveat", cursive' }}>VNS ❤️</span>
          <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
        </div>
      </motion.div>
    </div>
  );
}

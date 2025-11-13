import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const Story = () => {
  // PON AQUÍ EL LINK DEL VIDEO DIRECTAMENTE - Archivo local
  const videoUrl = "/videos/history/01.mp4"; // Cambia esta URL por la tuya

  const [hearts, setHearts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handleHeartClick = () => {
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 2000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateProgress = () => {
        const progress = (video.currentTime / video.duration) * 100;
        setProgress(isNaN(progress) ? 0 : progress);
      };

      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('loadedmetadata', () => {
        video.play().then(() => setIsPlaying(true));
      });

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4">
      {/* Fondo con partículas neón */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Corazones flotantes */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400 text-2xl"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          animate={{
            y: [-20, -40, -60],
            opacity: [1, 0.8, 0],
            scale: [1, 1.2, 0.8],
          }}
          transition={{ duration: 2 }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Contenedor de la historia */}
      <div className="relative w-full max-w-xs h-[600px] bg-gradient-to-b from-pink-900 via-purple-900 to-pink-900 rounded-3xl overflow-hidden shadow-2xl">
        {/* Barra de progreso superior */}
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="h-1 bg-pink-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Contenido principal con video */}
        <div className="relative w-full h-full flex items-center justify-center p-6">
          <div className="relative w-full h-full max-w-[300px] max-h-[500px] bg-black rounded-2xl overflow-hidden">
            {/* Video con controles personalizados */}
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover rounded-2xl"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Overlay semi-transparent para texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            {/* Texto superpuesto */}
            <motion.div
              className="absolute bottom-6 left-4 right-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2 className="text-lg font-bold text-white mb-1">
                 Eres mi historia favorita 💖
              </h2>
              <p className="text-pink-300 text-xs">
                 Porque contigo, hasta el silencio tiene sentido 💭
              </p>
            </motion.div>

            {/* Controles personalizados */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <motion.button
                onClick={togglePlay}
                className="bg-black bg-opacity-50 rounded-full p-2 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </motion.button>
              <motion.button
                onClick={toggleMute}
                className="bg-black bg-opacity-50 rounded-full p-2 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Botón de corazón */}
        <motion.button
          onClick={handleHeartClick}
          className="absolute bottom-4 right-4 z-20 bg-pink-500 rounded-full p-3 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        >
          <Heart className="w-5 h-5 text-white fill-current" />
        </motion.button>

        {/* Decoración de destellos */}
        <motion.div
          className="absolute top-8 left-8 text-pink-400"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>

        <motion.div
          className="absolute top-16 right-8 text-purple-400"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          ✨
        </motion.div>
      </div>
    </div>
  );
};

export default Story;

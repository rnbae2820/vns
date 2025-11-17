import React, { useState, useRef, useEffect } from 'react';

export default function Song() {
  // Extract video ID from YouTube URL
  const youtubeVideoUrl = "https://youtu.be/4NOMFBRfaT0";
  const videoId = youtubeVideoUrl.split('v=')[1];
  const songLink = `https://www.youtube.com/watch?v=${videoId}`;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showText, setShowText] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setShowText(prev => !prev);
    }, 3000); // Change text every 3 seconds
    
    return () => clearInterval(textInterval);
  }, []);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const romanticPhrases = [
    "Te amo más que ayer",
    "Eres mi eternidad",
    "Contigo todo es magia",
    "Mi corazón late por ti",
    "Te amo con cada respiro",
    "Eres mi razón de ser",
    "No puedo vivir sin ti",
    "Mi alma te pertenece",
    "Te amo más que el cielo",
    "Eres mi todo, mi nada",
    "Te amo hasta el infinito",
    "Eres mi sueño hecho realidad",
    "Cada día te amo más",
    "Eres mi sol en la tormenta",
    "Te amo con locura",  
    "Eres mi amor eterno",
    "Te amo más que las estrellas",
    "Eres mi vida, mi amor",
    "Te amo con todo mi ser",
    "Eres mi felicidad completa"
  ];

  const currentPhrase = romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 animate-fall"
            style={{
              fontSize: `${Math.random() * 28 + 12}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * -20}%`,
              animationDuration: `${Math.random() * 6 + 3}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❤️
          </div>
        ))}
        
        {/* Additional floating hearts with different sizes */}
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-500 opacity-60 animate-float"
            style={{
              fontSize: `${Math.random() * 24 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 12 + 5}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            ❤️
          </div>
        ))}
        
        {/* Glowing heart particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 animate-pulse"
            style={{
              fontSize: `${Math.random() * 12 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ❤️
          </div>
        ))}
        
        {/* CSS for animations */}
        <style jsx>{`
          @keyframes fall {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.8;
            }
            90% {
              opacity: 0.8;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
          .animate-fall {
            animation: fall linear infinite;
          }
          
          @keyframes float {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(25px, -25px) rotate(90deg);
            }
            50% {
              transform: translate(0, -50px) rotate(180deg);
            }
            75% {
              transform: translate(-25px, -25px) rotate(270deg);
            }
            100% {
              transform: translate(0, 0) rotate(360deg);
            }
          }
          .animate-float {
            animation: float ease-in-out infinite;
          }
          
          @keyframes neonGlow {
            0%, 100% {
              text-shadow: 
                0 0 10px #ff0066,
                0 0 20px #ff0066,
                0 0 30px #ff0066;
            }
            50% {
              text-shadow: 
                0 0 20px #ff0066,
                0 0 30px #ff0066,
                0 0 40px #ff0066,
                0 0 50px #ff0066;
            }
          }
          
          .neon-text {
            animation: neonGlow 1.5s ease-in-out infinite;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
          }
        `}</style>
      </div>

      {/* Romantic neon text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-center transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-pink-400 neon-text drop-shadow-lg">
            {currentPhrase}
          </h1>
        </div>
      </div>

      {/* Music control button */}
      <div className="absolute bottom-10 right-10 z-20">
        <button
          onClick={toggleAudio}
          className="flex items-center justify-center w-20 h-20 bg-pink-500/80 backdrop-blur-md rounded-full text-white hover:bg-pink-600/80 transition-all duration-300 shadow-2xl border border-pink-300/50"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3l14 9-14 9V3z"></path>
            </svg>
          )}
        </button>
      </div>

      {/* YouTube Embed for Audio */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-0 pointer-events-none">
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&mute=0&start=0&enablejsapi=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

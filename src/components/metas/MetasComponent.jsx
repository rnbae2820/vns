import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Check, Star, X } from "lucide-react";

export default function MetasComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState('timeline');
  const [showAllGoals, setShowAllGoals] = useState(false);
  const [activeGoal, setActiveGoal] = useState(null);

  // Romantic timeline moments
  const romanticMoments = [
    {
      id: 1,
      date: "2023",
      title: "Fin del Colegio",
      description: "El último día de clases se convirtió en un recuerdo que brilla con luz propia. Cada examen, cada risa y cada esfuerzo se unieron para cerrar una etapa que la hizo más fuerte y más soñadora.",
      photo: "https://placehold.co/400x400/pink/f9a8d4?text=Colegio+Finalizado",
      color: "from-pink-400 to-purple-700"
    },
    {
      id: 2,
      date: ", 2024",
      title: "Ingreso al Instituto",
      description: "Con un corazón lleno de ilusión y pasos firmes, comenzó un nuevo camino. No solo ingresó al instituto, abrió una puerta hacia todo lo que siempre soñó construir.",
      photo: "https://placehold.co/400x400/fuchsia/f0abfc?text=Instituto",
      color: "from-rose-400 to-pink-600"
    },
  


    // {
    //   id: 1,
    //   date: "14 Febrero, 2023",
    //   title: "Nuestro Primer Beso",
    //   description: "Bajo la luz de la luna llena, el tiempo se detuvo mientras nuestros labios se encontraban por primera vez. Fue como si el universo conspirara para que este momento fuera perfecto.",
    //   photo: "https://placehold.co/400x400/pink/f9a8d4?text=Primer+Beso",
    //   color: "from-pink-400 to-purple-700"
    // },
   
  ];

  // metas completadas
  const completedGoals = [
    {
      id: 1,
      title: "Terminó el Colegio",
     description: "El final del colegio no fue un adiós, sino la primera chispa de un sueño más grande. Como una flor que se abre hacia la luz, el corazón descubrió que cada meta cumplida es un puente hacia algo más hermoso. No importan los días difíciles ni los miedos escondidos: todo lo vivido se volvió fuerza, impulso y destino. Porque quien aprende a cerrar etapas con amor, está destinado a construir un futuro lleno de maravillas.",
      date: "Diciembre 2024",
      color: "from-pink-400 to-purple-500"
    },
    {
      id: 2,
      title: "Ingreso al Instituto",
     description: "Ingresar al instituto fue como tocar un nuevo amanecer: un espacio donde nacen metas, donde los sueños dejan de ser palabras y comienzan a tomar forma. Entre libros, caminos y miradas nuevas, el corazón entendió que crecer también es un acto de valentía. Cada paso dado hacia ese futuro es una promesa silenciosa: la promesa de convertirse en todo aquello que alguna vez se imaginó bajo un cielo lleno de esperanza.",
      date: "Marzo 2025",
      color: "from-pink-400 to-purple-500"
    }


    // {
    //   id: 1,
    //   title: "Nuestro Primer Viaje Juntos",
    //   description: "Recorrimos las calles de París, donde cada rincón guardaba un nuevo descubrimiento y cada cafetería una conversación que duraba horas.",
    //   date: "Julio 2023",
    //   color: "from-pink-400 to-purple-500"
    // },
    // {
    //   id: 2,
    //   title: "Primera Cena en Casa",
    //   description: "Entre risas y platos rotos, cocinamos juntos nuestra primera cena. El postre terminó en nuestros rostros, pero fue perfecto.",
    //   date: "Abril 2023",
    //   color: "from-rose-400 to-pink-500"
    // },
    // {
    //   id: 3,
    //   title: "Cita bajo las Estrellas",
    //   description: "Encontramos un mirador secreto donde nadie más podía vernos, y hablamos de nuestros sueños hasta que el sol comenzó a asomar.",
    //   date: "Mayo 2023",
    //   color: "from-purple-400 to-indigo-500"
    // }
  ];
// metas pro cumplir
  const pendingGoals = [
    
    {
      id: 1,
      title: "Terminar tus estudios superiores",
      description: "Sueño con verte cumplir cada meta que te propones. Imagino el día en que sostienes tu título, radiante, demostrando al mundo la mujer increíble que eres. Tu esfuerzo, tu fuerza y tu luz merecen llegar muy lejos.",
      color: "from-pink-300 to-purple-400"
    },
    // {
    //   id: 2,
    //   title: "Nuestro Primer Hogar",
    //   description: "Una casa llena de libros, fotos en las paredes, y el aroma de café por las mañanas. Un lugar donde cada rincón cuente nuestra historia.",
    //   color: "from-fuchsia-300 to-pink-400"
    // },
    // {
    //   id: 3,
    //   title: "Viaje por el Mundo",
    //   description: "Recorrer cada continente juntos, descubriendo culturas, probando comidas extrañas, y creando recuerdos que llenen miles de álbumes.",
    //   color: "from-indigo-300 to-purple-400"
    // },
    // {
    //   id: 4,
    //   title: "Familia Propia",
    //   description: "Crear una familia donde el amor sea el lenguaje principal, donde cada niño herede tu sonrisa y mi curiosidad por la vida.",
    //   color: "from-rose-300 to-pink-400"
    // }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Create floating hearts
  const FloatingHearts = () => {
    const hearts = [];
    for (let i = 0; i < 20; i++) {
      const size = 0.5 + Math.random() * 1.5;
      const delay = i * 0.5;
      const duration = 15 + Math.random() * 10;
      const left = `${Math.random() * 100}%`;
      const bottom = `${-20 + Math.random() * 20}%`;
      
      hearts.push(
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            scale: 0.2,
            y: "100%"
          }}
          animate={{ 
            opacity: [0.03, 0.15, 0.03],
            scale: [0.3, size, 0.3],
            y: ["100%", "-150%"],
            x: [0, Math.sin(i) * 15, 0],
            rotate: [0, Math.random() > 0.5 ? 15 : -15, 0]
          }}
          transition={{ 
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
          className="absolute text-pink-400/50"
          style={{ 
            left: left,
            bottom: bottom,
            fontSize: `${0.8 + Math.random() * 1}rem`
          }}
        >
          <Heart className="w-full h-full" fill="currentColor" />
        </motion.div>
      );
    }
    return hearts;
  };

  // Create shimmering stars for completed goals
  const ShimmeringStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      const size = 0.3 + Math.random() * 0.7;
      const delay = i * 0.3;
      const duration = 3 + Math.random() * 2;
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      
      stars.push(
        <motion.div
          key={i}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{ 
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
          className="absolute text-yellow-300/60"
          style={{ 
            left: left,
            top: top,
            fontSize: `${size}rem`
          }}
        >
          <Star className="w-full h-full" fill="currentColor" />
        </motion.div>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/15 to-black text-white overflow-hidden relative">
      {/* Romantic background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(219,39,119,0.06)_0%,transparent_70%)]"></div>
      
      {/* Floating hearts background */}
      <FloatingHearts />
      
      {/* Center glowing orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/15 via-purple-500/20 to-pink-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Header with romantic title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center space-x-4 mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.3, 1],
                  y: [0, -5, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              >
                <Heart className="w-8 h-8 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.85)]" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-300 to-pink-300 drop-shadow-[0_0_30px_rgba(236,72,153,0.9)]"
            style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.025em' }}
          >
             Viaje de Amor
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4"
          >
            <div className="flex justify-center space-x-4 mb-6">
              {['timeline', 'completed', 'pending'].map((section) => (
                <button
                  key={section}
                  onClick={() => setCurrentSection(section)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentSection === section ? 'bg-pink-500/30 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.7)]' : 'bg-white/5 text-pink-300/70 hover:bg-white/10'}`}
                >
                  {section === 'timeline' && ' Historia'}
                  {section === 'completed' && 'Metas Cumplidas ✨'}
                  {section === 'pending' && 'Sueños por Cumplir 💫'}
                </button>
              ))}
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-xl text-pink-200/90 italic max-w-3xl mx-auto drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]"
              style={{ fontFamily: '"Caveat", cursive', lineHeight: '1.7' }}
            >
              "Cada momento  es un capítulo en la historia más hermosa ."
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Conditional rendering based on section */}
        <AnimatePresence mode="wait">
          {currentSection === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {/* Timeline container */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400/30 via-purple-500/30 to-pink-400/30 transform -translate-x-1/2 animate-pulse-slower"></div>
                
                {/* Timeline items */}
                {romanticMoments.map((moment, index) => {
                  const isEven = index % 2 === 0;
                  const isActive = index === activeGoal;
                  
                  return (
                    <motion.div
                      key={moment.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: isLoaded ? 1 : 0, 
                        y: isLoaded ? 0 : 50 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.2 + index * 0.1
                      }}
                      onMouseEnter={() => setActiveGoal(index)}
                      onMouseLeave={() => setActiveGoal(null)}
                      className={`relative mb-16 flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse items-end md:items-start' : 'items-start md:items-end'} ${isActive ? 'scale-103' : ''}`}
                    >
                      {/* Timeline dot with glow */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: isLoaded ? 1 : 0,
                          boxShadow: isActive ? '0 0 25px rgba(236, 72, 153, 0.9)' : '0 0 10px rgba(236, 72, 153, 0.5)'
                        }}
                        transition={{ duration: 0.5 }}
                        className={`z-10 w-8 h-8 rounded-full bg-gradient-to-br ${moment.color} border-2 border-pink-400 shadow-lg flex items-center justify-center transform ${isActive ? 'scale-125' : ''}`}
                      >
                        <Heart className="w-4 h-4 text-white" fill="currentColor" />
                      </motion.div>
                      
                      {/* Timeline content with photo */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                        animate={{ 
                          opacity: isLoaded ? 1 : 0, 
                          x: isLoaded ? 0 : isEven ? 30 : -30,
                          boxShadow: isActive ? '0 0 30px rgba(236, 72, 153, 0.3)' : '0 0 5px rgba(0,0,0,0.3)'
                        }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        className={`max-w-md bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-pink-500/10 ${isEven ? 'md:mr-8 ml-4 md:ml-0' : 'md:ml-8 mr-4 md:mr-0'} relative group`}
                      >
                        {/* Photo section */}
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={moment.photo} 
                            alt={moment.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-sm text-pink-300/90 font-medium drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
                              {moment.date}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content section */}
                        <div className="p-6">
                          <motion.h2 
                            className="text-xl md:text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                          >
                            {moment.title}
                          </motion.h2>
                          
                          <motion.p 
                            className="text-base md:text-lg text-pink-200/90 leading-relaxed"
                            style={{ 
                              fontFamily: '"Caveat", cursive',
                              textShadow: '0 0 10px rgba(236, 72, 153, 0.4)',
                              lineHeight: '1.6'
                            }}
                          >
                            {moment.description}
                          </motion.p>
                        </div>
                        
                        {/* Decorative heart at corner */}
                        <div className="absolute top-3 right-3 text-pink-400/70">
                          <Heart className="w-5 h-5" fill="currentColor" />
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentSection === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <ShimmeringStars />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="flex justify-center items-center space-x-3 mb-6">
                  <Check className="w-8 h-8 text-yellow-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]" />
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                     Metas Cumplidas ✨
                  </motion.h2>
                  <Check className="w-8 h-8 text-yellow-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]" />
                </div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-lg text-yellow-200/90 italic max-w-2xl mx-auto drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                  style={{ fontFamily: '"Caveat", cursive' }}
                >
                  "Cada promesa cumplida es un peldaño más en la escalera hacia nuestro eterno juntos."
                </motion.p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {completedGoals.slice(0, showAllGoals ? completedGoals.length : 3).map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: isLoaded ? 1 : 0, 
                      y: isLoaded ? 0 : 30 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.2 + index * 0.15
                    }}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/10 relative overflow-hidden group"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-3 right-3 text-yellow-400/70">
                      <Star className="w-5 h-5" fill="currentColor" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-xs text-yellow-300/80 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
                          {goal.date}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      </div>
                      
                      <motion.h3 
                        className="text-xl md:text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                      >
                        {goal.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-base text-yellow-200/90 leading-relaxed italic"
                        style={{ 
                          fontFamily: '"Caveat", cursive',
                          textShadow: '0 0 10px rgba(255, 215, 0, 0.4)',
                          lineHeight: '1.6'
                        }}
                      >
                        "{goal.description}"
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {completedGoals.length > 3 && !showAllGoals && (
                <div className="text-center mt-10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAllGoals(true)}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 text-yellow-300 rounded-full font-medium hover:bg-yellow-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                  >
                    Ver todas  metas cumplidas
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {currentSection === 'pending' && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="flex justify-center items-center space-x-3 mb-6">
                  <Star className="w-8 h-8 text-purple-300 drop-shadow-[0_0_15px_rgba(199,110,255,0.7)]" />
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    Sueños por Cumplir 💫
                  </motion.h2>
                  <Star className="w-8 h-8 text-purple-300 drop-shadow-[0_0_15px_rgba(199,110,255,0.7)]" />
                </div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-lg text-purple-200/90 italic max-w-2xl mx-auto drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  style={{ fontFamily: '"Caveat", cursive' }}
                >
                  "El amor es el mapa que nos guía hacia cada sueño que anhelamos construir juntos."
                </motion.p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {pendingGoals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: isLoaded ? 1 : 0, 
                      y: isLoaded ? 0 : 30 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.2 + index * 0.15
                    }}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/10 relative overflow-hidden group"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-3 right-3 text-purple-400/70">
                      <Star className="w-5 h-5 animate-pulse" fill="currentColor" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-xs text-purple-300/80 font-medium tracking-wider drop-shadow-[0_0_8px_rgba(199,110,255,0.6)]">
                          Próximamente
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                      </div>
                      
                      <motion.h3 
                        className="text-xl md:text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                      >
                        {goal.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-base text-purple-200/90 leading-relaxed italic"
                        style={{ 
                          fontFamily: '"Caveat", cursive',
                          textShadow: '0 0 10px rgba(236, 72, 153, 0.4)',
                          lineHeight: '1.6'
                        }}
                      >
                        "{goal.description}"
                      </motion.p>
                      
                      <div className="mt-4">
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "30%" }}
                            transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                            className={`h-full bg-gradient-to-r ${goal.color} rounded-full`}
                          ></motion.div>
                        </div>
                        <div className="text-center mt-1 text-xs text-purple-300/70">
                          30% completado - Pronto comenzaremos este sueño
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.p 
            className="text-xl md:text-2xl text-pink-300/90 italic drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]"
            style={{ fontFamily: '"Caveat", cursive', lineHeight: '1.7' }}
          >
            "No importa cuánto tiempo pase, mi corazón seguirá eligiéndote en cada universo, en cada vida, en cada momento."
          </motion.p>
          
          <div className="mt-10 flex justify-center items-center space-x-4">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.15, 1],
                  y: [0, -5, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                <Heart className="w-6 h-6 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.85)]" fill="currentColor" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom romantic glow */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-pink-900/25 to-transparent"></div>
      
      {/* Border glow */}
      <div className="absolute inset-0 border border-pink-500/20 rounded-2xl m-4 pointer-events-none"></div>
      
      {/* Special VNS text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute top-6 right-6 text-pink-400 text-lg font-bold drop-shadow-[0_0_20px_rgba(236,72,153,0.95)]"
      >
        <motion.div
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center space-x-3"
        >
          <Heart className="w-6 h-6 animate-pulse" fill="currentColor" />
          <span className="text-xl" style={{ fontFamily: '"Caveat", cursive' }}>
            Para VNS, con todo mi corazón
          </span>
          <Heart className="w-6 h-6 animate-pulse" fill="currentColor" />
        </motion.div>
      </motion.div>
    </div>
  );
}

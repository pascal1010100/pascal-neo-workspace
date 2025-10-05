'use client';

import { motion, type Variants, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Sparkles, Zap, Palette, Code, Smartphone, Heart, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: "Diseño Kawaii",
    description: "Interfaz adorable y amigable que hace que la programación sea más divertida y agradable a la vista.",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Rendimiento Óptimo",
    description: "Construido para ser rápido y eficiente, incluso en proyectos grandes y complejos.",
    color: "from-yellow-300 to-amber-500"
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "Temas Personalizables",
    description: "Elige entre múltiples temas y colores para personalizar tu espacio de trabajo a tu gusto.",
    color: "from-cyan-300 to-blue-500"
  },
  {
    icon: <Code className="w-7 h-7" />,
    title: "Integración Perfecta",
    description: "Funciona perfectamente con tus herramientas y frameworks favoritos sin complicaciones.",
    color: "from-emerald-300 to-green-500"
  },
  {
    icon: <Smartphone className="w-7 h-7" />,
    title: "Diseño Responsive",
    description: "Se ve y funciona perfectamente en cualquier dispositivo, desde móviles hasta pantallas grandes.",
    color: "from-rose-400 to-pink-500"
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Hecho con Amor",
    description: "Desarrollado por y para desarrolladores que aman lo que hacen y cómo lo hacen.",
    color: "from-pink-400 to-rose-500"
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const item: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  hover: {
    y: -8,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  }
};

export default function Features() {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.02]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.section 
      id="caracteristicas" 
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.3) 100%)',
        y,
        scale,
        opacity
      }}
    >
      {/* Background with stars - Client-side only */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {isClient && [...Array(30)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          return (
            <div 
              key={i}
              className="absolute rounded-full bg-foreground/80 dark:bg-white/80 animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          );
        })}
      </div>
      
      {/* Decorative gradients */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-accent/5 to-transparent blur-[100px] dark:from-accent/10"></div>
        <div className="absolute -left-40 -bottom-40 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-accent-2/5 to-transparent blur-[120px] dark:from-accent-2/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium mb-8 md:mb-10 bg-accent-2/10 dark:bg-accent-2/10 border border-accent-2/20 dark:border-accent-2/20 backdrop-blur-sm"
            variants={item}
            whileHover={{
              background: 'hsl(var(--accent-2)/0.15)',
              scale: 1.05,
              boxShadow: '0 0 20px hsl(var(--accent-2)/0.2)',
              transition: { duration: 0.3 }
            }}
          >
            <span className="relative flex h-2.5 w-2.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-2/75 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-2"></span>
            </span>
            <span className="text-accent-foreground font-medium">
              ✨ Características Principales
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground dark:text-white"
            variants={item}
          >
            <div className="mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground dark:from-white dark:to-gray-300">
                Todo lo que necesitas
              </span>
            </div>
            <div className="relative">
              <span className="relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 dark:from-pink-400 dark:via-rose-400 dark:to-amber-400">
                  en un solo lugar
                </span>
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-amber-500/20 dark:from-pink-500/30 dark:via-rose-500/30 dark:to-amber-500/30 rounded-full blur-md"></div>
            </div>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            variants={item}
          >
            Nuestro workspace está diseñado para potenciar tu productividad sin sacrificar la diversión y la creatividad.
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            variants={item}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-accent-foreground bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver todas las características
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative h-full"
              variants={item}
              whileHover="hover"
            >
              <div className="absolute inset-0.5 bg-gradient-to-br from-transparent via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div 
                className="h-full p-6 rounded-xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
                style={{
                  background: 'hsl(var(--card)/0.7)',
                  border: '1px solid hsl(var(--border)/0.6)',
                  boxShadow: '0 8px 32px -4px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div 
                  className={`absolute -right-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-br ${feature.color} opacity-5 dark:opacity-10 -z-10`}
                  aria-hidden="true"
                />
                
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
                  style={{
                    background: `hsl(var(--accent)/0.1)`,
                    color: `hsl(var(--accent))`,
                    boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <div className="mt-4 flex items-center text-sm font-medium text-accent-foreground/80 group-hover:text-accent-foreground transition-colors">
                  <span>Saber más</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-muted-foreground mb-6">
            ¿Listo para mejorar tu flujo de trabajo?
          </p>
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition-opacity"
          >
            Comenzar ahora
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="ml-2 -mr-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

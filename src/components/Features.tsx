'use client';

import { motion, type Variants, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Zap, Palette, Code, Smartphone, Heart } from 'lucide-react';

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
    y: 30,
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
  }
};

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section 
      id="caracteristicas" 
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      {/* Efecto de estrellas */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/80 animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDuration: Math.random() * 3 + 2 + 's',
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>
      
      {/* Gradientes decorativos */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-500/10 to-transparent blur-[100px]"></div>
        <div className="absolute -left-40 -bottom-40 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-cyan-500/10 to-transparent blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: 'hsl(var(--accent-2)/0.1)',
              color: 'hsl(var(--accent-2))',
              border: '1px solid hsl(var(--accent-2)/0.2)',
              backdropFilter: 'blur(4px)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            ✨ Características Principales
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Todo lo que necesitas en un solo lugar
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Nuestro workspace está diseñado para potenciar tu productividad sin sacrificar la diversión y la creatividad.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative h-full"
              variants={item}
              whileHover={{
                y: -8,
                transition: { 
                  type: 'spring',
                  stiffness: 300,
                  damping: 15
                }
              }}
            >
              <div className="absolute inset-0.5 bg-gradient-to-br from-transparent via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div 
                className="h-full p-6 rounded-xl transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border)/0.6)',
                  boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div 
                  className={`absolute -right-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-br ${feature.color} opacity-5 -z-10`}
                  aria-hidden="true"
                />
                
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
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
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
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
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Comenzar ahora
            <svg 
              width="16" 
              height="16" 
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
    </section>
  );
}

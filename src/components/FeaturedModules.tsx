'use client';

import { motion, type Variants, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Palette, Zap, Lock, GitBranch, Cpu } from 'lucide-react';

const modules = [
  {
    icon: <Code className="w-5 h-5" />,
    title: "Editor de Código",
    description: "Potente editor con resaltado de sintaxis, autocompletado inteligente y múltiples cursores para una codificación más rápida y eficiente.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Temas Personalizables",
    description: "Elige entre múltiples temas y personaliza cada aspecto de tu entorno de desarrollo para que se adapte a tu estilo.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Rendimiento",
    description: "Optimizado para ser rápido y eficiente, incluso en proyectos grandes y complejos, sin comprometer la experiencia de usuario.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <GitBranch className="w-5 h-5" />,
    title: "Control de Versiones",
    description: "Integración nativa con Git para un control de versiones sin problemas y un flujo de trabajo más eficiente.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Herramientas Integradas",
    description: "Todo lo que necesitas en un solo lugar, sin necesidad de complementos adicionales que ralenticen tu flujo de trabajo.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Seguridad",
    description: "Tus datos están seguros con nuestro sistema de encriptación de extremo a extremo y políticas de privacidad estrictas.",
    color: "from-red-500 to-orange-500"
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

export default function FeaturedModules() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section 
      id="modulos" 
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--muted)/0.3) 0%, hsl(var(--background)) 100%)',
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-gradient-to-r from-accent/10 to-transparent blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-gradient-to-l from-accent-2/10 to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            🚀 Módulos Destacados
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Potencia tu flujo de trabajo
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Descubre las características que hacen de Pascal Neo la mejor opción para desarrolladores que buscan eficiencia y elegancia.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {modules.map((module, index) => (
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
                  className={`absolute -right-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-br ${module.color} opacity-5 -z-10`}
                  aria-hidden="true"
                />
                
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                  style={{
                    background: 'hsl(var(--accent)/0.1)',
                    color: 'hsl(var(--accent))',
                    boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {module.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {module.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {module.description}
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
            ¿Listo para llevar tu productividad al siguiente nivel?
          </p>
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Explorar más características
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

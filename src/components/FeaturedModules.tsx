'use client';

import { motion, type Variants, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Code, Palette, Zap, Lock, GitBranch, Cpu, ArrowRight } from 'lucide-react';

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

export default function FeaturedModules() {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.02]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.section 
      id="modulos" 
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--muted)/0.2) 0%, hsl(var(--background)) 100%)',
        y,
        scale,
        opacity
      }}
      aria-label="Módulos destacados"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-gradient-to-r from-accent/10 to-transparent blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-gradient-to-l from-accent-2/10 to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
<motion.div 
            className="text-center mb-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium mb-8 md:mb-10 bg-accent/10 dark:bg-accent/10 border border-accent/20 dark:border-accent/20 backdrop-blur-sm"
              variants={item}
              whileHover={{
                background: 'hsl(var(--accent)/0.15)',
                scale: 1.05,
                boxShadow: '0 0 20px hsl(var(--accent)/0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <span className="relative flex h-2.5 w-2.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/75 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="text-accent-foreground font-medium">
                🚀 Módulos Destacados
              </span>
            </motion.div>
            <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground dark:text-white"
            variants={item}
          >
            <div className="mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground dark:from-white dark:to-gray-300">
                Módulos Potentes
              </span>
            </div>
            <div className="relative">
              <span className="relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 dark:from-blue-400 dark:via-cyan-400 dark:to-emerald-400">
                  para tu flujo de Trabajo
                </span>
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-emerald-500/20 dark:from-blue-500/30 dark:via-cyan-500/30 dark:to-emerald-500/30 rounded-full blur-md"></div>
            </div>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            variants={item}
          >
            Descubre las herramientas que harán que tu desarrollo sea más rápido, eficiente y placentero.
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
              Explorar todos los módulos
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </motion.div>
          
        </motion.div>
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
    </motion.section>
  );
}

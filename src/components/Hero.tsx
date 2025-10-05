// Hero.tsx
'use client';

import { motion, useInView, useScroll, useTransform, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Code, GitBranch, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import KawaiiBot from './KawaiiBot';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ['start start', 'end start'] 
  });
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  
  // Animation controls
  const controls = useAnimation();

  useEffect(() => {
    setIsClient(true);
    
    // Start animations when in view
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  

  const stats = [
    { 
      value: "10,000+", 
      label: "Desarrolladores",
      icon: <Code className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      value: "99.9%", 
      label: "Tiempo activo",
      icon: <Zap className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      value: "50+", 
      label: "Integraciones",
      icon: <GitBranch className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      value: "24/7", 
      label: "Soporte",
      icon: <span>🛟</span>,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 px-4 sm:px-6 lg:px-8 w-full"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{ y, scale, opacity }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/30" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMTVjOC4yODQgMCAxNSA2LjcxNiAxNSAxNXMtNi43MTYgMTUtMTUgMTVTMjAgMzguMjg0IDIwIDMwczYuNzE2LTE1IDE1LTE1WiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [background-size:24px] [mask-image:linear-gradient(to_right,white_1px,transparent_1px)] [mask-size:40px_40px]" />
        </div>

        {/* Animated particles */}
        {isClient && [...Array(20)].map((_, i) => {
          const size = Math.random() * 4 + 1;
          const delay = Math.random() * 2;
          const duration = 3 + Math.random() * 4;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-foreground/80 dark:bg-white/80"
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="text-center max-w-5xl mx-auto py-16 md:py-24"
          variants={containerVariants}
        >
          <motion.div 
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium mb-8 md:mb-12 bg-cyan-500/10 dark:bg-cyan-500/10 border border-cyan-500/20 dark:border-cyan-400/20 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{
              background: 'rgba(0, 240, 255, 0.15)',
              scale: 1.05,
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
              transition: { duration: 0.3 }
            }}
          >
            <span className="relative flex h-2.5 w-2.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-600 dark:bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-600 dark:bg-cyan-400"></span>
            </span>
            <span className="text-cyan-600 dark:text-cyan-300 font-medium">
              ✨ La mejor experiencia de desarrollo
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-foreground dark:text-white"
            variants={itemVariants}
          >
            <div className="mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground dark:from-white dark:to-gray-300 relative z-10">
                Desarrolla más rápido
              </span>
            </div>
            <div className="relative">
              <span className="relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 dark:from-pink-400 dark:via-rose-400 dark:to-amber-400">
                  construye mejor
                </span>
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-amber-500/20 dark:from-pink-500/30 dark:via-rose-500/30 dark:to-amber-500/30 rounded-full blur-md"></div>
            </div>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            La plataforma todo en uno para desarrolladores que buscan llevar su productividad al siguiente nivel con herramientas potentes y un diseño intuitivo.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                className="group px-8 py-6 text-base font-semibold rounded-xl bg-gradient-to-r from-accent to-accent-2 text-accent-foreground hover:opacity-90 transition-opacity shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                Comenzar ahora
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-foreground"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="group flex flex-col items-center p-6 rounded-xl bg-card/70 dark:bg-card/50 backdrop-blur-sm border border-border/20 hover:border-accent/50 transition-colors"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className={`p-3 mb-4 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm text-center">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* KawaiiBot */}
      <motion.div 
        className="fixed bottom-8 right-8 z-20 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: 0.6,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }
        } : {}}
      >
        <KawaiiBot />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: 1,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }
        } : {}}
      >
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center p-1 mb-2 group">
          <motion.div
            className="w-1 h-3 bg-foreground/80 rounded-full group-hover:bg-accent transition-colors"
            animate={{
              y: [0, 8, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        </div>
        <span className="text-xs text-muted-foreground font-medium tracking-wide">
          Desplázate para explorar
        </span>
      </motion.div>
    </motion.section>
  );
}
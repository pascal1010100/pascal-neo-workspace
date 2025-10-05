'use client';

import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Code, GitBranch, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import KawaiiBot from './KawaiiBot';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);
  
  // Efecto de brillo suave
  const glow = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px 0px 20px rgba(255, 107, 158, 0.2)', '0px 0px 40px rgba(0, 240, 255, 0.3)']
  );

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any, // Type assertion for ease array
      },
    },
  };

  const gradientAnimation: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      background: 'radial-gradient(circle at 10% 20%, hsl(var(--accent)/0.1) 0%, transparent 20%)',
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    },
  };

  const floatingElements = [
    {
      icon: <Code className="w-6 h-6 text-pink-400" />,
      text: "Código limpio",
      className: "top-[20%] left-[15%]",
      delay: 0.2,
      color: "from-pink-400/80 to-rose-400/80"
    },
    {
      icon: <GitBranch className="w-6 h-6 text-cyan-300" />,
      text: "Git Integrado",
      className: "top-[30%] right-[15%]",
      delay: 0.4,
      color: "from-cyan-300/80 to-blue-400/80"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-300" />,
      text: "Rendimiento",
      className: "bottom-[30%] left-[20%]",
      delay: 0.6,
      color: "from-yellow-300/80 to-amber-400/80"
    },
    {
      icon: <span className="text-2xl">✨</span>,
      text: "Kawaii Style",
      className: "top-[15%] right-[20%]",
      delay: 0.3,
      color: "from-purple-300/80 to-pink-400/80"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={container}
      style={{ y, zIndex: 1, scale }}
    >
      {/* Fondo con efecto de estrellas */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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
      
      {/* Elementos decorativos */}
      <motion.div 
        className="fixed -right-20 top-1/4 w-[400px] h-[400px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,158,0.15) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      <motion.div 
        className="fixed -left-20 bottom-1/4 w-[500px] h-[500px] rounded-full -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 0.5
        }}
      />

      {/* Elementos flotantes mejorados */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={cn(
            "absolute hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-white/10",
            "bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md",
            "hover:shadow-lg transition-all duration-300 group",
            element.className
          )}
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { 
            opacity: 1, 
            y: [null, -10, 0],
            scale: 1,
            transition: { 
              delay: element.delay,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }
          } : {}}
          whileHover={{
            y: -5,
            scale: 1.05,
            boxShadow: `0 10px 30px -5px ${element.color?.split(' ')[0].replace('from-', '').split('/')[0] || '#FF6B9E'}40`,
            transition: { duration: 0.3, ease: 'easeOut' }
          }}
        >
          <div className={`bg-gradient-to-br ${element.color} p-2 rounded-xl group-hover:scale-110 transition-transform`}>
            {element.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">{element.text}</span>
            <span className="text-xs text-white/60">+{Math.floor(Math.random() * 50) + 50}%</span>
          </div>
        </motion.div>
      ))}

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="text-center max-w-5xl mx-auto py-16 md:py-24"
          variants={container}
        >
          <motion.div 
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium mb-8 md:mb-12"
            style={{
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
            variants={item}
            whileHover={{
              background: 'rgba(0, 240, 255, 0.15)',
              scale: 1.05,
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
              transition: { duration: 0.3 }
            }}
          >
            <span className="relative flex h-2.5 w-2.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
            <span className="text-cyan-300 font-medium">✨ La mejor experiencia de desarrollo</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            variants={item}
          >
            <div className="mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 relative z-10">
                Desarrolla más rápido
              </span>
            </div>
            <div className="relative">
              <span className="relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400">
                  construye mejor
                </span>
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-amber-500/20 rounded-full blur-md"></div>
            </div>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={item}
          >
            La plataforma todo en uno para desarrolladores que buscan llevar su productividad al siguiente nivel con herramientas potentes y un diseño intuitivo.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={item}
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
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-base font-medium group rounded-xl border-2 border-border/30 hover:border-accent/50 hover:bg-accent/5 transition-colors"
              >
                Ver demostración
                <svg 
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          variants={container}
        >
          {[
            { value: "10,000+", label: "Desarrolladores" },
            { value: "99.9%", label: "Tiempo activo" },
            { value: "50+", label: "Integraciones" },
            { value: "24/7", label: "Soporte" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/20"
              variants={item}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
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
        <span className="text-xs text-muted-foreground font-medium tracking-wide">Desplázate para explorar</span>
      </motion.div>
    </motion.section>
  );
}

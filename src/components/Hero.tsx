'use client';

import { motion, type Variants } from 'framer-motion';
import KawaiiBot from "./KawaiiBot";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

export default function Hero() {
  return (
    <motion.section 
      className="relative overflow-hidden py-20 md:py-32 border-b border-border/50"
      style={{
        background: `linear-gradient(135deg, hsl(var(--accent)/0.05) 0%, hsl(var(--accent-2)/0.05) 100%)`
      }}
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="absolute -right-10 -top-10 size-[220px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(var(--accent)/0.2) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      
        <motion.div 
          className="flex items-center gap-3 mb-6"
          variants={item}
        >
          <KawaiiBot />
          <span className="k-chip" style={{
            background: 'hsl(var(--accent)/0.1)',
            color: 'hsl(var(--accent))',
            border: '1px solid hsl(var(--accent)/0.2)'
          }}>Moonpunk / Solarpunk</span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-foreground"
          variants={item}
        >
          Tu navaja suiza de Indie Hacker
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-lg max-w-2xl text-muted-foreground"
          variants={item}
        >
          Workspace kawaii, retrofuturista y elegante. Rápido, modular y hecho a tu medida.
        </motion.p>
        
        <motion.div 
          className="mt-8 flex flex-wrap gap-4"
          variants={item}
        >
        <motion.a 
          href="#tareas" 
          className="k-btn k-btn-accent k-focus relative overflow-hidden group"
          whileHover={{ 
            y: -2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: { 
              y: { type: 'spring', stiffness: 400, damping: 10 },
              boxShadow: { duration: 0.2 }
            }
          }}
          whileTap={{ 
            scale: 0.96,
            transition: { duration: 0.1 }
          }}
        >
          <span className="relative z-10">Comenzar</span>
          <motion.span 
            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
        <motion.a 
          href="#modulos" 
          className="k-btn k-btn-ghost k-focus group"
          whileHover={{ 
            y: -2,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transition: { 
              y: { type: 'spring', stiffness: 400, damping: 10 },
              backgroundColor: { duration: 0.2 }
            }
          }}
          whileTap={{ 
            scale: 0.98,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <span className="relative z-10">Ver módulos</span>
        </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

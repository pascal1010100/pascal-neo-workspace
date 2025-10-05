'use client';

import { motion } from 'framer-motion';

export default function KawaiiBot() {
  return (
    <motion.div 
      className="relative flex items-center justify-center w-10 h-10 rounded-full"
      style={{
        background: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))',
        boxShadow: '0 4px 6px -1px hsl(var(--accent)/0.2), 0 2px 4px -2px hsl(var(--accent)/0.2)'
      }}
      animate={{
        y: [0, -4, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Cuerpo del robot */}
        <rect 
          x="4" 
          y="8" 
          width="16" 
          height="12" 
          rx="2"
          style={{
            fill: 'hsl(var(--accent-foreground)/0.1)',
            stroke: 'currentColor'
          }}
        />
        
        {/* Antena */}
        <path 
          d="M12 8V4H10"
          style={{
            stroke: 'currentColor',
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          }}
        />
        
        {/* Ojos */}
        <circle 
          cx="9" 
          cy="12" 
          r="1" 
          fill="currentColor"
        />
        <circle 
          cx="15" 
          cy="12" 
          r="1" 
          fill="currentColor"
        />
        
        {/* Boca */}
        <path 
          d="M9 15h6" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </svg>
      
      {/* Brillo en los ojos */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white"
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: [0.8, 0.4, 0.8],
          x: [0, 1, 0],
          y: [0, -1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      <motion.div 
        className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-white"
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: [0.8, 0.4, 0.8],
          x: [0, 1, 0],
          y: [0, -1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 0.5
        }}
      />
    </motion.div>
  );
}

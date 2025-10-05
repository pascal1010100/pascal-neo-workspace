'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/button/Button';
import { Container } from '../ui/container/Container';
import { Section } from '../ui/section/Section';
import { ArrowRight, Code, Zap, GitBranch, Shield } from 'lucide-react';
import type { FC } from 'react';

const stats = [
  { value: '10,000+', label: 'Desarrolladores', icon: Code },
  { value: '99.9%', label: 'Tiempo activo', icon: Zap },
  { value: '50+', label: 'Integraciones', icon: GitBranch },
  { value: '24/7', label: 'Soporte', icon: Shield },
];

const Hero: FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <Section 
      id="hero" 
      variant="default" 
      spacing="xl" 
      className="relative overflow-hidden pt-24"
      style={{ y, scale, opacity }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/30" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMTVjOC4yODQgMCAxNSA2LjcxNiAxNSAxNXMtNi43MTYgMTUtMTUgMTVTMjAgMzguMjg0IDIwIDMwczYuNzE2LTE1IDE1LTE1WiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [background-size:24px] [mask-image:linear-gradient(to_right,white_1px,transparent_1px)] [mask-size:40px_40px]" />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium mb-8 bg-primary/10 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            ¡Nueva actualización disponible!
          </motion.div>
          
          {/* Title */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block mb-2">Potencia tu</span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#E6005C] to-[#00B8CC] dark:from-primary dark:to-secondary bg-clip-text text-transparent">
                flujo de trabajo
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary-200/50 to-secondary-200/50 dark:from-primary/30 dark:to-secondary/30 rounded-full blur-md"></span>
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Una suite de herramientas diseñada para desarrolladores que buscan eficiencia y elegancia en su flujo de trabajo diario.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              variant="gradient" 
              className="group bg-gradient-to-r from-[#E6005C] to-[#00B8CC] hover:from-[#B30047] hover:to-[#008699] text-white dark:from-primary dark:to-secondary dark:hover:from-primary/90 dark:hover:to-secondary/90"
            >
              Comenzar ahora
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Ver demostración
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label}
                className="group flex flex-col items-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="p-3 mb-4 rounded-lg bg-gradient-to-br from-primary to-secondary text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm text-center">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
};

export default Hero;

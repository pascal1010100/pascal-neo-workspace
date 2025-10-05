'use client';

import { motion, type Variants } from 'framer-motion';
import { Sparkles, Zap, Palette, Code, Smartphone, Heart } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Diseño Kawaii",
    description: "Interfaz adorable y amigable que hace que la programación sea más divertida"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Rendimiento Óptimo",
    description: "Construido para ser rápido y eficiente, incluso en proyectos grandes"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Temas Personalizables",
    description: "Elige entre múltiples temas y colores para personalizar tu espacio de trabajo"
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Integración Perfecta",
    description: "Funciona perfectamente con tus herramientas y frameworks favoritos"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Diseño Responsive",
    description: "Se ve y funciona perfectamente en cualquier dispositivo"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Hecho con Amor",
    description: "Desarrollado por y para desarrolladores que aman lo que hacen"
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
} as const;

export default function Features() {
  return (
    <section id="caracteristicas" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span 
            className="k-chip mx-auto mb-4 inline-block px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: 'hsl(var(--accent-2)/0.1)',
              color: 'hsl(var(--accent-2))',
              border: '1px solid hsl(var(--accent-2)/0.2)'
            }}
          >
            ✨ Características
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nuestro workspace está diseñado para potenciar tu productividad sin sacrificar la diversión.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl transition-all duration-300 group relative overflow-hidden"
              style={{
                background: 'hsl(var(--card))',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                border: '1px solid hsl(var(--border))'
              }}
              variants={item}
              whileHover={{
                y: -5,
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                transition: { 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 10 
                }
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent)/0.03) 0%, transparent 100%)',
                }}
              />
              
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{
                  background: 'hsl(var(--accent)/0.1)',
                  color: 'hsl(var(--accent))',
                }}
              >
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

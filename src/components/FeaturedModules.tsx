'use client';

import { motion, type Variants } from 'framer-motion';
import { Code, Palette, Zap, Lock, GitBranch, Cpu } from 'lucide-react';

const modules = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Editor de Código",
    description: "Potente editor con resaltado de sintaxis, autocompletado y múltiples cursores.",
    color: "text-blue-500"
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Temas Personalizables",
    description: "Elige entre múltiples temas y personaliza cada aspecto de tu entorno.",
    color: "text-purple-500"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Rendimiento",
    description: "Optimizado para ser rápido y eficiente, incluso en proyectos grandes.",
    color: "text-yellow-500"
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "Control de Versiones",
    description: "Integración nativa con Git para un control de versiones sin problemas.",
    color: "text-green-500"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Herramientas Integradas",
    description: "Todo lo que necesitas en un solo lugar, sin necesidad de complementos.",
    color: "text-pink-500"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Seguridad",
    description: "Tus datos están seguros con nuestro sistema de encriptación de extremo a extremo.",
    color: "text-red-500"
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

const item: Variants = {
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

export default function FeaturedModules() {
  return (
    <section id="modulos" className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 -z-10 opacity-10" style={{
      background: 'radial-gradient(circle at 20% 30%, hsl(var(--accent)/0.1) 0%, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--accent-2)/0.1) 0%, transparent 40%)',
    }} />
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
            🚀 Módulos Destacados
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Potencia tu flujo de trabajo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre las características que hacen de Pascal Neo la mejor opción para desarrolladores.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {modules.map((module, index) => (
            <motion.div
              key={index}
              className="group relative p-6 rounded-xl transition-all duration-300 overflow-hidden"
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
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{
                  background: 'hsl(var(--accent)/0.1)',
                  color: 'hsl(var(--accent))',
                }}
              >
                {module.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{module.title}</h3>
              <p className="text-muted-foreground">{module.description}</p>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent)/0.03) 0%, transparent 100%)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

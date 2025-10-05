'use client';

import { motion } from 'framer-motion';
import { Container } from '../ui/container/Container';
import { Section } from '../ui/section/Section';
import { Button } from '../ui/button/Button';
import { Code, Database, Cpu, Lock, Palette, Server, Zap } from 'lucide-react';

const modules = [
  {
    name: 'Módulo de Autenticación',
    description: 'Sistema de autenticación seguro con múltiples proveedores y gestión de usuarios.',
    icon: <Lock className="h-6 w-6 text-primary" />,
  },
  {
    name: 'Base de Datos',
    description: 'Conexión a múltiples bases de datos con ORM y migraciones automáticas.',
    icon: <Database className="h-6 w-6 text-primary" />,
  },
  {
    name: 'API REST',
    description: 'Endpoints RESTful listos para usar con documentación automática.',
    icon: <Server className="h-6 w-6 text-primary" />,
  },
  {
    name: 'UI Components',
    description: 'Biblioteca de componentes reutilizables y accesibles para tu aplicación.',
    icon: <Palette className="h-6 w-6 text-primary" />,
  },
];

const FeaturedModules = () => {
  return (
    <Section id="featured-modules" variant="default" spacing="lg">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Módulos Principales
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Componentes esenciales que aceleran tu desarrollo y mejoran tu productividad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <div className="p-6 bg-card rounded-xl border border-border/20 hover:border-primary/30 transition-colors flex-1">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{module.name}</h3>
                    <p className="text-muted-foreground">{module.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">¿Listo para comenzar?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Únete a miles de desarrolladores que ya están construyendo aplicaciones increíbles con nuestra plataforma.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="gradient">
              Comenzar ahora
              <Zap className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Ver documentación
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default FeaturedModules;

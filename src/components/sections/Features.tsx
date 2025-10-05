'use client';

import { motion } from 'framer-motion';
import { Container } from '../ui/container/Container';
import { Section } from '../ui/section/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card/Card';
import { Code, Zap, GitBranch, Shield, Lock, Cpu, Palette, Rocket } from 'lucide-react';

const features = [
  {
    title: 'Rendimiento Óptimo',
    description: 'Diseñado para ofrecer el mejor rendimiento con carga rápida y uso eficiente de recursos.',
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Código Limpio',
    description: 'Estructura de código limpia y bien organizada para facilitar el mantenimiento y la escalabilidad.',
    icon: <Code className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Integración Sencilla',
    description: 'Fácil de integrar con tus herramientas y flujos de trabajo existentes.',
    icon: <GitBranch className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Seguridad Robusta',
    description: 'Implementa las mejores prácticas de seguridad para proteger tus datos y aplicaciones.',
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Diseño Moderno',
    description: 'Interfaz de usuario moderna y atractiva con un diseño centrado en la experiencia del usuario.',
    icon: <Palette className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Alto Rendimiento',
    description: 'Optimizado para ofrecer el máximo rendimiento incluso en dispositivos de gama baja.',
    icon: <Rocket className="h-6 w-6 text-primary" />,
  },
];

const Features = () => {
  return (
    <Section id="features" variant="default" spacing="lg" className="bg-muted/40">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Características Potentes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre todo lo que nuestra plataforma tiene para ofrecerte con estas increíbles características.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Features;

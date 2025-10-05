'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaDiscord, FaRocket } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const links = [
    {
      title: 'Producto',
      items: [
        { name: 'Características', href: '#caracteristicas' },
        { name: 'Módulos', href: '#modulos' },
        { name: 'Precios', href: '#' },
        { name: 'Actualizaciones', href: '#' },
      ],
    },
    {
      title: 'Compañía',
      items: [
        { name: 'Sobre Nosotros', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Carreras', href: '#' },
        { name: 'Contacto', href: '#' },
      ],
    },
    {
      title: 'Recursos',
      items: [
        { name: 'Documentación', href: '#' },
        { name: 'Tutoriales', href: '#' },
        { name: 'Soporte', href: '#' },
        { name: 'API', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub />, href: '#' },
    { name: 'Twitter', icon: <FaTwitter />, href: '#' },
    { name: 'Discord', icon: <FaDiscord />, href: '#' },
  ];

  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Link href="#" className="flex items-center gap-2">
              <motion.div 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground"
                whileHover={{ rotate: 12 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <FaRocket className="h-5 w-5" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Pascal Neo
              </span>
            </Link>
            <p className="text-muted-foreground">
              La herramienta definitiva para desarrolladores que buscan potenciar su productividad y creatividad.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-accent"
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <span className="h-5 w-5">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces de navegación */}
          {links.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Boletín informativo */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Suscríbete
            </h3>
            <p className="text-muted-foreground">
              Recibe las últimas actualizaciones y noticias.
            </p>
            <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                required
              />
              <motion.button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-accent px-4 py-2 font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Suscribirse
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Pascal Neo. Todos los derechos reservados.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">
              Términos
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

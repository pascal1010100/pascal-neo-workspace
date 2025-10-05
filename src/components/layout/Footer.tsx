import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button/Button';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

const footerLinks = [
  {
    title: 'Producto',
    links: [
      { name: 'Características', href: '#features' },
      { name: 'Módulos', href: '#modules' },
      { name: 'Precios', href: '#pricing' },
      { name: 'Actualizaciones', href: '#changelog' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { name: 'Sobre Nosotros', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Carreras', href: '#careers' },
      { name: 'Contacto', href: '#contact' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { name: 'Documentación', href: '#docs' },
      { name: 'Tutoriales', href: '#tutorials' },
      { name: 'Soporte', href: '#support' },
      { name: 'API', href: '#api' },
    ],
  },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/10 bg-background/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pascal
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              La plataforma todo en uno para desarrolladores que buscan llevar su productividad al siguiente nivel con herramientas potentes y un diseño intuitivo.
            </p>
            
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-border/10 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Pascal. Todos los derechos reservados.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Términos
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacidad
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

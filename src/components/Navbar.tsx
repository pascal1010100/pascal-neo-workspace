'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'framer-motion';
import { FaRobot, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

const navItems: NavItem[] = [
  { name: 'Inicio', href: '#' },
  { name: 'Módulos', href: '#modulos' },
  { name: 'Características', href: '#caracteristicas' },
  { name: 'Tareas', href: '#tareas' },
];

const menuVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      staggerChildren: 0.1
    }
  }
};

export function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle menu function
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Close menu on outside click
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Handle nav item click
  const handleNavClick = useCallback((href: string) => {
    setActiveSection(href.substring(1));
    setIsMenuOpen(false);
  }, []);

  // Check if dark mode is active
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  if (!mounted) return null;

  return (
    <motion.header 
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
        {
          'bg-background/95 backdrop-blur-lg shadow-sm border-b border-border/40': scrolled,
          'bg-background/80 backdrop-blur-sm': !scrolled,
        },
        isDark ? 'dark:bg-background/90 dark:backdrop-blur-md' : ''
      )}
      style={{
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(4px)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(4px)',
      }}
      initial={false}
      animate={{
        paddingTop: scrolled ? '0.5rem' : '1rem',
        paddingBottom: scrolled ? '0.5rem' : '1rem',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/"
              className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg p-1.5 -ml-1.5"
              aria-label="Inicio"
              onClick={() => handleNavClick('#')}
            >
              <motion.div
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-md"
                whileHover={{ rotate: 12, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <FaRobot className="h-5 w-5" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Pascal Neo
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden items-center gap-2 md:flex"
            initial="hidden"
            animate="visible"
            variants={menuVariants}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1) || 
                             (item.href === '#' && activeSection === '');
              
              return (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'group relative px-4 py-2.5 text-sm font-medium transition-all duration-300',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg',
                      isActive 
                        ? 'text-foreground font-semibold' 
                        : 'text-muted-foreground hover:text-foreground/80'
                    )}
                    onClick={() => handleNavClick(item.href)}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.span 
                        className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent"
                        layoutId="activeSection"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className={cn(
                'p-2.5 rounded-xl',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                'text-muted-foreground hover:text-foreground transition-colors'
              )}
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </motion.button>

            <motion.button
              onClick={toggleMenu}
              className={cn(
                'p-2.5 rounded-xl md:hidden',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                'text-muted-foreground hover:text-foreground transition-colors'
              )}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/40"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1) || 
                                 (item.href === '#' && activeSection === '');
                  
                  return (
                    <motion.div
                      key={item.href}
                      variants={itemVariants}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                          isActive
                            ? 'text-foreground bg-accent/10'
                            : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground'
                        )}
                        onClick={() => handleNavClick(item.href)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
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
  { 
    name: 'Inicio', 
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    )
  },
  { 
    name: 'Módulos', 
    href: '#featured-modules',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
        <rect width="7" height="7" x="3" y="3" rx="1"></rect>
        <rect width="7" height="7" x="14" y="3" rx="1"></rect>
        <rect width="7" height="7" x="14" y="14" rx="1"></rect>
        <rect width="7" height="7" x="3" y="14" rx="1"></rect>
      </svg>
    )
  },
  { 
    name: 'Características', 
    href: '#features',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
        <path d="M12 2v4"></path>
        <path d="m16 6 2.3 2.3"></path>
        <path d="M18 12h4"></path>
        <path d="m18 16-2.3 2.3"></path>
        <path d="M12 18v4"></path>
        <path d="m8 18-2.3 2.3"></path>
        <path d="M6 12H2"></path>
        <path d="m6 8 2.3-2.3"></path>
      </svg>
    )
  },
  { 
    name: 'Tareas', 
    href: '#tasks',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
        <path d="M3 3v18h18"></path>
        <path d="M19 3v18"></path>
        <path d="M3 12h18"></path>
        <path d="M3 7h18"></path>
        <path d="M3 17h18"></path>
      </svg>
    )
  },
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

  // Handle nav item click with smooth scrolling
  const handleNavClick = useCallback((href: string) => {
    const sectionId = href.substring(1);
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    
    // If it's not the home link
    if (href !== '#') {
      const element = document.getElementById(sectionId);
      if (element) {
        // Calculate the position to scroll to, accounting for the fixed header
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Smooth scroll to the section
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // If it's the home link, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
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
        isDark ? 'dark:bg-background/95 dark:backdrop-blur-lg' : ''
      )}
      style={{
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
        WebkitTransform: 'translateZ(0)', // Fix for Safari blur
        transform: 'translateZ(0)',
      }}
      initial={false}
      animate={{
        paddingTop: scrolled ? '0.5rem' : '1rem',
        paddingBottom: scrolled ? '0.5rem' : '1rem',
        boxShadow: scrolled ? '0 4px 30px -10px rgba(0, 0, 0, 0.1)' : 'none',
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.5
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
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-lg"
                whileHover={{ 
                  rotate: [0, 12, -4, 0],
                  scale: 1.1,
                  transition: { 
                    rotate: { duration: 0.6, ease: 'easeInOut' },
                    scale: { duration: 0.2 }
                  }
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 10 
                }}
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
                      'group relative px-4 py-2.5 text-sm font-medium transition-all duration-300 flex items-center',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg',
                      isActive 
                        ? 'text-foreground font-semibold' 
                        : 'text-muted-foreground hover:text-foreground/80 hover:bg-accent/5'
                    )}
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                    }}
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
                'p-3 rounded-xl md:hidden',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                'text-muted-foreground hover:text-foreground transition-colors',
                'relative z-50' // Asegura que esté por encima del menú desplegable
              )}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30,
              opacity: { duration: 0.2 },
              height: { duration: 0.3 }
            }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/40 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-3 py-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1) || 
                                 (item.href === '#' && activeSection === '');
                  
                  return (
                    <motion.div
                      key={item.href}
                      variants={itemVariants}
                      className="relative"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'block px-4 py-3.5 rounded-lg text-base font-medium transition-all',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                          isActive
                            ? 'text-foreground bg-accent/10 font-semibold'
                            : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground',
                          'active:scale-[0.98] transform transition-transform duration-100'
                        )}
                        onClick={() => handleNavClick(item.href)}
                      >
                        {item.icon}
                    <span>{item.name}
                      <motion.span 
                        className="absolute bottom-1.5 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                        initial={{ scaleX: isActive ? 1 : 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                      />
                    </span>
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
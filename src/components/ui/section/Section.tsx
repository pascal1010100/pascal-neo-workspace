'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type SectionVariant = 'default' | 'accent' | 'secondary';
type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface SectionOwnProps {
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  innerClassName?: string;
  children: React.ReactNode;
}

type SectionProps = SectionOwnProps & Omit<HTMLMotionProps<'section'>, keyof SectionOwnProps>;

const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  variant = 'default',
  spacing = 'md',
  className,
  innerClassName,
  ...props
}, ref) => {
  const variantClasses = {
    default: 'bg-background text-foreground',
    accent: 'bg-accent text-accent-foreground',
    secondary: 'bg-secondary/50 text-foreground',
  } as const;

  const spacingClasses = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20',
    xl: 'py-20 md:py-28',
  } as const;

  return (
    <motion.section
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        variantClasses[variant],
        spacingClasses[spacing],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      }}
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', innerClassName)}>
        {children as React.ReactNode}
      </div>
    </motion.section>
  );
});

Section.displayName = 'Section';

export { Section };

import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode, forwardRef, ElementType } from 'react';

type CardVariant = 'default' | 'outline' | 'elevated' | 'filled';

interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'ref'> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variant?: CardVariant;
  hoverEffect?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className,
  as: Component = 'div',
  variant = 'default',
  hoverEffect = false,
  ...props
}, ref) => {
  const variantClasses = {
    default: 'bg-card text-card-foreground',
    outline: 'border border-border bg-transparent',
    elevated: 'bg-card shadow-sm',
    filled: 'bg-muted/50',
  } as const;

  const baseClasses = 'rounded-xl p-6 transition-all duration-200';
  const hoverClasses = hoverEffect ? 'hover:shadow-lg' : '';
  const variantClass = variantClasses[variant] || variantClasses.default;

  const classes = cn(
    baseClasses,
    variantClass,
    hoverClasses,
    className
  );

  if (Component === 'div') {
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

export { Card };

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}
export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-4', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('pt-0', className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('flex items-center pt-4', className)}>
      {children}
    </div>
  );
}

import { cn } from '@/lib/utils';
import { type ReactNode, type ElementType } from 'react';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

interface ContainerProps<T extends ElementType = 'div'> {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
  as?: T;
  padded?: boolean;
  [key: string]: unknown;
}

export function Container<T extends ElementType = 'div'>({
  children,
  className,
  size = 'xl',
  as: Component = 'div' as T,
  padded = true,
  ...props
}: ContainerProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const maxWidth = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full',
  }[size];

  const ComponentToRender = Component as ElementType;

  return (
    <ComponentToRender
      className={cn(
        'w-full mx-auto',
        maxWidth,
        padded && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </ComponentToRender>
  );
}

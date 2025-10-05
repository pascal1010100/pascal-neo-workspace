import { type ReactNode } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showNavbar?: boolean;
  showFooter?: boolean;
  mainClassName?: string;
}

export function PageLayout({
  children,
  className,
  showNavbar = true,
  showFooter = true,
  mainClassName,
}: PageLayoutProps) {
  return (
    <div className={cn('flex min-h-screen flex-col bg-background', className)}>
      {showNavbar && <Navbar />}
      <main className={cn('flex-1 pt-16 md:pt-20', mainClassName)}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '../Navbar';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

// Dynamically import KawaiiBot with no SSR to avoid hydration issues
const KawaiiBot = dynamic(() => import('../KawaiiBot'), {
  ssr: false,
});

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
      
      {/* Floating KawaiiBot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Chat with KawaiiBot"
          onClick={() => {
            // Add your chat functionality here
            console.log('Chat with KawaiiBot!');
          }}
        >
          <KawaiiBot />
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 text-xs items-center justify-center text-white">
              💬
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

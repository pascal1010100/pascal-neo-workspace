'use client';

import dynamic from 'next/dynamic';
import { PageLayout } from '@/components/layout/PageLayout';

// Dynamically import components with no SSR to avoid hydration issues
const Hero = dynamic(
  () => import('@/components/sections/Hero').then((mod) => mod.default),
  { ssr: false, loading: () => <div>Loading Hero...</div> }
);

const Features = dynamic(
  () => import('@/components/sections/Features').then((mod) => mod.default),
  { ssr: false, loading: () => <div>Loading Features...</div> }
);

const FeaturedModules = dynamic(
  () => import('@/components/sections/FeaturedModules').then((mod) => mod.default),
  { ssr: false, loading: () => <div>Loading Modules...</div> }
);

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Features />
      <FeaturedModules />
    </PageLayout>
  );
}

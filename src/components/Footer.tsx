'use client';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/50">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Pascal Neo — Construido con Next.js + Tailwind CSS
      </div>
    </footer>
  );
}

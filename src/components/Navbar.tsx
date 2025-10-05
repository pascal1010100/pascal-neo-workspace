"use client";
import Link from "next/link";
import { useTheme } from "@/context/theme-context";
import { FaRobot } from "react-icons/fa";

export default function Navbar() {
  const { toggle, theme } = useTheme();
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-bg/80 border-b border-accent/10">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-fg hover:text-accent transition-colors group">
          <FaRobot className="text-2xl text-accent group-hover:rotate-12 transition-transform" />
          <span className="text-xl">Pascal Neo</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="#modulos" className="text-fg/80 hover:text-accent transition-colors">Módulos</Link>
          <Link href="#tareas" className="text-fg/80 hover:text-accent transition-colors">Tareas</Link>
          <button 
            onClick={toggle} 
            className="p-2 rounded-full hover:bg-accent/10 transition-colors"
            aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaRobot, FaSun, FaMoon } from "react-icons/fa";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar hidratación no coincidente
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Renderizar un esqueleto mientras se carga el tema
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <nav className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-muted" />
            <span className="text-xl font-semibold">Pascal Neo</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-muted" />
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <nav className="container flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground transition-colors hover:text-accent-foreground"
        >
          <FaRobot className="h-6 w-6 text-accent transition-transform group-hover:rotate-12" />
          <span className="text-xl">Pascal Neo</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="#modulos"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Módulos
          </Link>
          <Link
            href="#tareas"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Tareas
          </Link>

          <button
            onClick={toggleTheme}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label={`cambiar a tema ${theme === "dark" ? "claro" : "oscuro"}`}
          >
            {theme === "dark" ? (
              <FaSun className="h-5 w-5 text-yellow-300" />
            ) : (
              <FaMoon className="h-5 w-5 text-indigo-700" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

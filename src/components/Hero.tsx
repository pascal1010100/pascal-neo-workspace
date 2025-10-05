'use client';

import KawaiiBot from "./KawaiiBot";

export default function Hero() {
  return (
    <section className="k-card k-gradient-hero p-10 md:p-16 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 size-[220px] rounded-full k-glow opacity-40" />
      <div className="flex items-center gap-3 mb-4">
        <KawaiiBot />
        <span className="k-chip">Moonpunk / Solarpunk</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold">Tu navaja suiza de Indie Hacker</h1>
      <p className="mt-4 text-lg max-w-2xl opacity-80">
        Workspace kawaii, retrofuturista y elegante. Rápido, modular y hecho a tu medida.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#tareas" className="k-btn k-btn-accent k-focus">Comenzar</a>
        <a href="#modulos" className="k-btn k-btn-ghost k-focus">Ver módulos</a>
      </div>
    </section>
  );
}

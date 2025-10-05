'use client';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 p-10 md:p-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.25),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(255,63,176,0.18),transparent_60%)]" />
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Bienvenido a Pascal Neo
      </h1>
      <p className="mt-4 text-lg max-w-2xl text-muted-foreground">
        Tu cómic interactivo + workspace de Indie Hacker. Futurista, elegante y rápido.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a 
          href="#tareas" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors"
        >
          Comenzar
        </a>
        <a 
          href="#modulos"
          className="border border-input hover:bg-accent/10 px-6 py-3 rounded-md font-medium transition-colors"
        >
          Ver módulos
        </a>
      </div>
    </section>
  );
}

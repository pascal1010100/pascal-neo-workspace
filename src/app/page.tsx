import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      <Hero />
      
      <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Moderno', 
              desc: 'Construido con Next.js 15 y Tailwind CSS',
              icon: '🚀'
            },
            { 
              title: 'Rápido', 
              desc: 'Optimizado para el mejor rendimiento',
              icon: '⚡'
            },
            { 
              title: 'Personalizable', 
              desc: 'Adapta cada aspecto a tus necesidades',
              icon: '🎨'
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="p-6 rounded-lg border border-border/50 bg-card/50 hover:bg-card transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

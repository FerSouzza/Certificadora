import { ChevronDown } from 'lucide-react';
import { BackgroundGrid } from './BackgroundGrid';

export function Hero() {
  const scrollToHub = () => {
    document.getElementById('phase-hub')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
      <BackgroundGrid />

      <div className="relative z-10 text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-block border-4 border-primary p-8 bg-card/80 backdrop-blur-sm">
            <h1 style={{ fontFamily: 'var(--font-pixel)' }} className="text-4xl md:text-6xl text-primary mb-4">
              C-LEARNING
            </h1>
            <h2 style={{ fontFamily: 'var(--font-pixel)' }} className="text-2xl md:text-4xl text-secondary">
              QUEST
            </h2>
          </div>

          <p style={{ fontFamily: 'var(--font-mono)' }} className="text-xl md:text-2xl text-foreground/80">
            &gt; Aprenda C através da aventura _
          </p>
        </div>

        <button
          onClick={scrollToHub}
          className="group relative px-12 py-6 border-4 border-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          style={{ fontFamily: 'var(--font-pixel)' }}
        >
          <span className="text-2xl">START</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
          </div>
        </button>

        <ChevronDown className="w-8 h-8 text-primary animate-bounce mx-auto mt-8" />
      </div>
    </section>
  );
}

import { Code, GitBranch, Repeat, FunctionSquare } from 'lucide-react';
import { BackgroundGrid } from './BackgroundGrid';

const phases = [
  {
    id: 1,
    title: 'FASE 1: Variáveis',
    instructor: 'Fernando e Giovana R.',
    icon: Code,
    color: '#00ff41',
    description: 'Domine os fundamentos de armazenamento de dados'
  },
  {
    id: 2,
    title: 'FASE 2: Condicionais',
    instructor: 'Fernando e Giovana R.',
    icon: GitBranch,
    color: '#00d9ff',
    description: 'Aprenda a tomar decisões no código'
  },
  {
    id: 3,
    title: 'FASE 3: Repetição',
    instructor: 'Bruna e Giovanna F.',
    icon: Repeat,
    color: '#ff006e',
    description: 'Controle loops e iterações'
  },
  {
    id: 4,
    title: 'FASE 4: Funções',
    instructor: 'Danilo e Giovanna F.',
    icon: FunctionSquare,
    color: '#ffd60a',
    description: 'Estruture código reutilizável'
  }
];

interface PhaseHubProps {
  onPhaseClick: (phaseId: number) => void;
}

export function PhaseHub({ onPhaseClick }: PhaseHubProps) {
  return (
    <section id="phase-hub" className="min-h-screen py-20 px-4 relative">
      <BackgroundGrid />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          style={{ fontFamily: 'var(--font-pixel)' }}
          className="text-3xl md:text-5xl text-center mb-4 text-primary"
        >
          &gt; SELECIONE SUA FASE
        </h2>

        <p
          style={{ fontFamily: 'var(--font-mono)' }}
          className="text-xl text-center mb-16 text-foreground/70"
        >
          Escolha um desafio para começar sua jornada
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <button
                key={phase.id}
                onClick={() => onPhaseClick(phase.id)}
                className="group relative p-8 border-4 bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 text-left"
                style={{ borderColor: phase.color }}
              >
                <div className="absolute top-4 right-4">
                  <Icon className="w-12 h-12" style={{ color: phase.color }} />
                </div>

                <div className="space-y-4">
                  <h3
                    style={{ fontFamily: 'var(--font-pixel)', color: phase.color }}
                    className="text-xl pr-16"
                  >
                    {phase.title}
                  </h3>

                  <p
                    style={{ fontFamily: 'var(--font-mono)' }}
                    className="text-lg text-foreground/80"
                  >
                    {phase.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t-2" style={{ borderColor: phase.color }}>
                    <span style={{ fontFamily: 'var(--font-code)' }} className="text-sm text-foreground/60">
                      Instrutor: {phase.instructor}
                    </span>

                    <span
                      style={{ fontFamily: 'var(--font-pixel)', color: phase.color }}
                      className="text-sm group-hover:translate-x-2 transition-transform"
                    >
                      ENTRAR &gt;
                    </span>
                  </div>
                </div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
                  style={{
                    background: `linear-gradient(45deg, transparent, ${phase.color}10)`,
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

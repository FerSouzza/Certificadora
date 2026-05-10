import { X, Play } from 'lucide-react';

const phaseData = [
  {
    id: 1,
    title: 'Variáveis',
    instructor: 'Fernando',
    summary: 'Nesta fase você aprenderá os conceitos fundamentais de variáveis em C, incluindo tipos de dados (int, float, char), declaração, inicialização e operações básicas. Entenda como armazenar e manipular informações na memória.',
    topics: ['Tipos de dados primitivos', 'Declaração e inicialização', 'Operadores aritméticos', 'Escopo de variáveis']
  },
  {
    id: 2,
    title: 'Condicionais',
    instructor: 'Danilo',
    summary: 'Domine as estruturas de decisão em C! Aprenda a usar if, else, else if e switch-case para criar programas que tomam decisões baseadas em condições. Explore operadores lógicos e relacionais.',
    topics: ['Estrutura if/else', 'Operadores relacionais', 'Operadores lógicos', 'Switch-case']
  },
  {
    id: 3,
    title: 'Repetição',
    instructor: 'Bruna',
    summary: 'Explore o poder dos loops! Aprenda a usar while, do-while e for para repetir blocos de código. Entenda quando usar cada tipo de loop e como controlar a execução com break e continue.',
    topics: ['Loop while', 'Loop for', 'Do-while', 'Break e continue']
  },
  {
    id: 4,
    title: 'Funções',
    instructor: 'Danilo',
    summary: 'Organize seu código com funções! Aprenda a criar funções reutilizáveis, passar parâmetros, retornar valores e entender o conceito de modularização. Descubra como funções tornam seu código mais limpo e eficiente.',
    topics: ['Declaração de funções', 'Parâmetros e argumentos', 'Valores de retorno', 'Escopo e recursão']
  }
];

interface PhaseModalProps {
  phaseId: number;
  onClose: () => void;
  onPlay: () => void;
}

export function PhaseModal({ phaseId, onClose, onPlay }: PhaseModalProps) {
  const phase = phaseData.find(p => p.id === phaseId);
  if (!phase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-4 border-primary p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-primary/20 transition-colors"
        >
          <X className="w-6 h-6 text-primary" />
        </button>

        <div className="space-y-6">
          <div>
            <h2
              style={{ fontFamily: 'var(--font-pixel)' }}
              className="text-2xl md:text-4xl text-primary mb-2"
            >
              FASE {phase.id}: {phase.title.toUpperCase()}
            </h2>
            <p style={{ fontFamily: 'var(--font-code)' }} className="text-secondary">
              Instrutor: {phase.instructor}
            </p>
          </div>

          <div className="border-2 border-primary/30 p-6 bg-background/50">
            <h3
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-xl text-primary mb-4"
            >
              &gt; Resumo da Matéria
            </h3>
            <p style={{ fontFamily: 'var(--font-code)' }} className="text-foreground/80 leading-relaxed">
              {phase.summary}
            </p>
          </div>

          <div className="border-2 border-secondary/30 p-6 bg-background/50">
            <h3
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-xl text-secondary mb-4"
            >
              &gt; Tópicos Abordados
            </h3>
            <ul className="space-y-2">
              {phase.topics.map((topic, index) => (
                <li
                  key={index}
                  style={{ fontFamily: 'var(--font-code)' }}
                  className="text-foreground/80 flex items-center"
                >
                  <span className="text-primary mr-3">&gt;</span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-accent/30 p-6 bg-background/50">
            <h3
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-xl text-accent mb-4"
            >
              &gt; Vídeo Aula (VideoScribe)
            </h3>
            <div className="aspect-video bg-black/50 border-2 border-accent/50 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Play className="w-20 h-20 text-accent mx-auto" />
                <p style={{ fontFamily: 'var(--font-mono)' }} className="text-accent/80">
                  Player de vídeo (VideoScribe)
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onPlay}
            className="w-full py-6 border-4 border-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            <span className="text-xl">JOGAR FASE</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

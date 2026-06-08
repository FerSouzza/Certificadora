import { useState } from 'react';
import { X, Play } from 'lucide-react';

const phaseData = [
  {
    id: 1,
    title: 'Variáveis',
    instructor: 'Fernando e Giovana R.',
    summary: 'Nesta fase você aprenderá os conceitos fundamentais de variáveis em C, incluindo tipos de dados (int, float, char), declaração, inicialização e operações básicas. Entenda como armazenar e manipular informações na memória.',
    topics: ['Tipos de dados primitivos', 'Declaração e inicialização', 'Operadores aritméticos', 'Escopo de variáveis'],
    video: 'videos/fase1.mp4'
  },
  {
    id: 2,
    title: 'Condicionais',
    instructor: 'Fernando e Giovana R.',
    summary: 'Domine as estruturas de decisão em C! Aprenda a usar if, else, else if e switch-case para criar programas que tomam decisões baseadas em condições. Explore operadores lógicos e relacionais.',
    topics: ['Estrutura if/else', 'Operadores relacionais', 'Operadores lógicos', 'Switch-case'],
    video: 'videos/fase2.mp4'
  },
  {
    id: 3,
    title: 'Repetição',
    instructor: 'Bruna e Giovanna F.',
    summary: 'Explore o poder dos loops! Aprenda a usar while, do-while e for para repetir blocos de código. Entenda quando usar cada tipo de loop e como controlar a execução com break e continue.',
    topics: ['Loop while', 'Loop for', 'Do-while', 'Break e continue'],
    video: 'videos/fase3.mp4'
  },
  {
    id: 4,
    title: 'Funções',
    instructor: 'Danilo e Giovanna F.',
    summary: 'Organize seu código com funções! Aprenda a criar funções reutilizáveis, passar parâmetros, retornar valores e entender o conceito de modularização. Descubra como funções tornam seu código mais limpo e eficiente.',
    topics: ['Declaração de funções', 'Parâmetros e argumentos', 'Valores de retorno', 'Modularização (.h / .c)'],
    video: null
  }
];

// Vite serve a pasta public/ a partir do base path configurado (/Certificadora/).
const resolveVideo = (path: string) => `${import.meta.env.BASE_URL}${path}`;

interface PhaseModalProps {
  phaseId: number;
  onClose: () => void;
  onPlay: () => void;
}

export function PhaseModal({ phaseId, onClose, onPlay }: PhaseModalProps) {
  // Se o arquivo de vídeo estiver ausente/vazio, cai para o aviso "em breve".
  const [videoFailed, setVideoFailed] = useState(false);
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
            {phase.video && !videoFailed ? (
              <video
                controls
                preload="metadata"
                className="w-full aspect-video bg-black border-2 border-accent/50"
                src={resolveVideo(phase.video)}
                onError={() => setVideoFailed(true)}
              >
                Seu navegador não suporta a reprodução de vídeo.
              </video>
            ) : (
              <div className="aspect-video bg-black/50 border-2 border-accent/50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Play className="w-20 h-20 text-accent mx-auto" />
                  <p style={{ fontFamily: 'var(--font-mono)' }} className="text-accent/80">
                    Vídeo aula em breve
                  </p>
                </div>
              </div>
            )}
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

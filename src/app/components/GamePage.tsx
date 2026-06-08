import { useState } from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';
import { GameCanvas } from './GameCanvas';

// CONFIGURAÇÃO: 3 DESAFIOS POR FASE
const gameData: Record<number, Array<{
  id: number;
  title: string;
  challenge: string;
  correctAnswer: string;
  hint: string;
}>> = {
  1: [
    // FASE 1: VARIÁVEIS - Tetris
    {
      id: 1,
      title: 'Variáveis - Desafio 1/3',
      challenge: 'Declare uma variável do tipo inteiro chamada tipo e atribua a ela o valor representativo para peças.',
      correctAnswer: 'inttipo=1;',
      hint: 'Peça QUADRADA = 1. Peça RETA = 2. Peça L = 3. '
    },
    {
      id: 2,
      title: 'Variáveis - Desafio 2/3',
      challenge: 'Declare duas variáveis inteiras: uma para registrar o identificador da peça linear e outra para definir o estado de rotação em 90 graus.',
      correctAnswer: 'inttipo=2;introtacao=90;',
      hint: 'Peça QUADRADA = 1. Peça RETA = 2. Peça L = 3. Rotação 90º.'
    },
    {
      id: 3,
      title: 'Variáveis - Desafio 3/3',
      challenge: 'Declare três variáveis do tipo inteiro para configurar o sistema: uma para identificar a peça linear, outra para aplicar uma rotação de 90 graus e a última para definir a posição inicial no eixo X em 150.',
      correctAnswer: 'inttipo=3;introtacao=90;intposicao=150;',
      hint: 'Peça QUADRADA = 1. Peça RETA = 2. Peça L = 3, rotacao 90°, posicao 150'
    }
  ],
  2: [
    // FASE 2: CONDICIONAIS - Pac-Man
    {
      id: 1,
      title: 'Condicionais - Desafio 1/3',
      challenge: 'Se direcao == 1, Pac-Man vai DIREITA: if (direcao == 1) { mover(); }',
      correctAnswer: 'if(direcao==1){mover();}',
      hint: 'IF simples. 1=direita'
    },
    {
      id: 2,
      title: 'Condicionais - Desafio 2/3',
      challenge: 'Se velocidade > 5 vai RÁPIDO, senão vai DEVAGAR: if (velocidade > 5) { rapido(); } else { devagar(); }',
      correctAnswer: 'if(velocidade>5){rapido();}else{devagar();}',
      hint: 'IF-ELSE com comparação >'
    },
    {
      id: 3,
      title: 'Condicionais - Desafio 3/3',
      challenge: 'Se direcao == 1 E velocidade > 5 corra, senão se direcao == 2 fuja, senão pare: if (direcao == 1 && velocidade > 5) { correr(); } else if (direcao == 2) { fugir(); } else { parar(); }',
      correctAnswer: 'if(direcao==1&&velocidade>5){correr();}elseif(direcao==2){fugir();}else{parar();}',
      hint: 'IF-ELSE IF-ELSE com && (E lógico)'
    }
  ],
  3: [
    // FASE 3: REPETIÇÃO - JOGO DO COFRE
    {
      id: 1,
      title: 'Repetição - Desafio 1/5',
      challenge: 'Use do-while para executar jogarNivelHacker() enquanto continuar == "s".',
      correctAnswer: 'do{jogarNivelHacker();}while(continuar=="s");',
      hint: 'Laço do-while roda o bloco antes de testar a condição.'
    },
    {
      id: 2,
      title: 'Repetição - Desafio 2/5',
      challenge: 'Use while para imprimir tentativas e decrementar até chegar a zero.',
      correctAnswer: 'while(tentativas>0){printf("%d tentativas",tentativas);tentativas--;}',
      hint: 'O while repete enquanto tentativas for maior que zero.'
    },
    {
      id: 3,
      title: 'Repetição - Desafio 3/5',
      challenge: 'Use o for para checar cada um dos três dígitos de tentativa.\n ',
      correctAnswer: 'for(inti=0;i<3;i++){if(tentativaHacker[i]==senhaCorreta[i]){printf("Dígitonnaposição%destáCORRETO.",i+1);}else{printf("Dígitonnaposição%destáERRADO.",i+1);}}',
      hint: 'Utilize senhaCorreta[i] e tentativaHacker[i] para comparar cada dígito e imprima a mensagem: "Dígito na posição X está CORRETO/ERRADO."'
    },
    {
      id: 4,
      title: 'Repetição - Desafio 4/5',
      challenge: 'Use break para sair do laço se a senha estiver correta e imprimir "Acesso aprovado!".',
      correctAnswer: 'if(senhaCorreta){printf("Acesso aprovado!");break;}',
      hint: 'O break interrompe o laço imediatamente quando a condição é verdadeira.'
    },
    {
      id: 5,
      title: 'Repetição - Desafio 5/5',
      challenge: 'Use continue para nova tentativa se a senha estiver errada.',
      correctAnswer: 'if(senhaInvalida){printf("Senha Inválida!. Tente novamente.");continue;}',
      hint: 'O continue pula para a próxima iteração do laço.'
    }
  ],
  4: [
    // FASE 4: FUNÇÕES - ARSENAL DO HACKER
    {
      id: 1,
      title: 'Funções - Desafio 1/5',
      challenge: 'Crie uma função void chamada exibirBanner que imprime exatamente: ACESSO HACKER LIBERADO',
      correctAnswer: 'void exibirBanner() { printf("ACESSO HACKER LIBERADO"); }',
      hint: 'Função void não usa return. Sintaxe: void nome() { ... }'
    },
    {
      id: 2,
      title: 'Funções - Desafio 2/5',
      challenge: 'Crie a função registrarAlvo, que recebe char nome[] e imprime: Alvo identificado: %s (usando nome).',
      correctAnswer: 'void registrarAlvo(char nome[]) { printf("Alvo identificado: %s", nome); }',
      hint: 'Os parâmetros vão entre os parênteses: (char nome[]).'
    },
    {
      id: 3,
      title: 'Funções - Desafio 3/5',
      challenge: 'Crie a função int calcularDano que recebe int forca e int bonus e retorna a soma dos dois.',
      correctAnswer: 'int calcularDano(int forca, int bonus) { return forca + bonus; }',
      hint: 'O tipo de retorno (int) vem antes do nome. Use return.'
    },
    {
      id: 4,
      title: 'Funções - Desafio 4/5',
      challenge: 'No main(), chame exibirBanner(), depois registrarAlvo("Servidor Central"), guarde calcularDano(50, 30) em int dano, imprima "Dano total causado: %d" e retorne 0.',
      correctAnswer: 'int main() { exibirBanner(); registrarAlvo("Servidor Central"); int dano = calcularDano(50, 30); printf("Dano total causado: %d", dano); return 0; }',
      hint: 'O main apenas orquestra: chama as funções em sequência.'
    },
    {
      id: 5,
      title: 'Funções - Desafio 5/5',
      challenge: 'Modularização: no main.c, inclua o cabeçalho do arsenal para usar as funções declaradas nele.',
      correctAnswer: '#include "arsenal.h"',
      hint: 'Use #include "arsenal.h" (aspas duplas para cabeçalhos do projeto).'
    }
  ]
};

const phaseTitles: Record<number, string> = {
  1: 'VARIÁVEIS - TETRIS',
  2: 'CONDICIONAIS - PAC-MAN',
  3: 'REPETIÇÃO - JOGO DO COFRE',
  4: 'FUNÇÕES - ARSENAL DO HACKER'
};

interface GamePageProps {
  phaseId: number;
  onBack: () => void;
}

export function GamePage({ phaseId, onBack }: GamePageProps) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [code, setCode] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const challenges = gameData[phaseId] || [];
  const currentChallenge = challenges[currentChallengeIndex];
  const totalChallenges = challenges.length;
  const progress = Math.round((currentChallengeIndex / totalChallenges) * 100);

  if (!currentChallenge) return null;

  const handleValidate = () => {
    // Normalizar: remover espaços e comparar
    const normalized = code.trim().toLowerCase().replace(/\s+/g, '');
    const expected = currentChallenge.correctAnswer.toLowerCase().replace(/\s+/g, '');

    if (normalized === expected) {
      setFeedback('correct');
      setIsValidated(true);

      // Se não for o último desafio, avançar após 2 segundos
      if (currentChallengeIndex < totalChallenges - 1) {
        setTimeout(() => {
          setCurrentChallengeIndex(currentChallengeIndex + 1);
          setCode('');
          setIsValidated(false);
          setFeedback(null);
        }, 2000);
      }
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b-4 border-primary p-4 bg-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border-2 border-secondary hover:bg-secondary hover:text-primary-foreground transition-colors"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">HUB</span>
          </button>

          <h1
            style={{ fontFamily: 'var(--font-pixel)' }}
            className="text-xl md:text-2xl text-primary"
          >
            FASE {phaseId}: {phaseTitles[phaseId]}
          </h1>

          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-accent" />
            <span style={{ fontFamily: 'var(--font-mono)' }} className="text-foreground">
              {progress}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-7xl mx-auto mt-4">
          <div className="h-4 bg-background border-2 border-primary relative">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2">
            <span style={{ fontFamily: 'var(--font-mono)' }} className="text-sm text-foreground/60">
              Desafio {currentChallengeIndex + 1} de {totalChallenges}
            </span>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Game Canvas */}
        <div className="relative border-r-4 border-primary bg-background/50">
          {/* SEU JOGO CANVAS AQUI - Edite em: src/app/components/GameCanvas.tsx */}
          <GameCanvas
            phaseId={phaseId}
            isValidated={isValidated}
            feedback={feedback}
            currentChallengeIndex={currentChallengeIndex}
          />

          {/* Indicadores de desafios abaixo do canvas */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {challenges.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index < currentChallengeIndex
                    ? 'bg-primary'
                    : index === currentChallengeIndex
                    ? 'bg-secondary animate-pulse'
                    : 'bg-foreground/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Code Terminal - Hacker Theme */}
        <div className="p-8 bg-[#0D1117] flex flex-col border-4 border-[#00ff41]">
          <div className="space-y-6">
            {/* Header do Terminal */}
            <div className="border-b-2 border-[#00ff41] pb-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#ff006e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffd60a]"></div>
                <div className="w-3 h-3 rounded-full bg-[#00ff41]"></div>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)' }} className="text-[#00ff41] text-sm">
                root@codequest:~$ ./fase{phaseId}.exec
              </p>
            </div>

            <div>
              <h3
                style={{ fontFamily: 'var(--font-pixel)' }}
                className="text-base text-[#00ff41] mb-3"
              >
                &gt; {currentChallenge.title}
              </h3>
              <p
                style={{ fontFamily: 'var(--font-code)' }}
                className="text-base text-[#00ff41]/80 leading-relaxed"
              >
                {currentChallenge.challenge}
              </p>
            </div>

            <div className="border-2 border-[#00ff41]/30 p-4 bg-[#00ff41]/5">
              <p style={{ fontFamily: 'var(--font-code)' }} className="text-sm text-[#00ff41]">
                💡 Dica: {currentChallenge.hint}
              </p>
            </div>

            <div>
              <label
                style={{ fontFamily: 'var(--font-mono)' }}
                className="block text-[#00ff41] mb-2 text-sm"
              >
                &gt; TERMINAL DE CÓDIGO_
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-40 p-4 bg-[#0a0a0a] border-2 border-[#00ff41] text-[#00ff41] resize-none focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:border-[#00ff41]"
                style={{ fontFamily: 'var(--font-code)', caretColor: '#00ff41' }}
                placeholder="// Digite seu código aqui..."
                disabled={isValidated}
              />
            </div>

            <button
              onClick={handleValidate}
              disabled={isValidated || !code.trim()}
              className="w-full py-5 border-4 border-[#00ff41] bg-[#00ff41] text-[#0D1117] hover:bg-transparent hover:text-[#00ff41] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,65,0.5)]"
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              {isValidated ? '✓ COMPILADO' : '⚡ COMPILAR CÓDIGO'}
            </button>

            {feedback === 'correct' && (
              <div className="border-4 border-primary p-6 bg-primary/10 animate-pulse">
                <p
                  style={{ fontFamily: 'var(--font-pixel)' }}
                  className="text-primary text-center"
                >
                  {currentChallengeIndex === totalChallenges - 1
                    ? 'FASE COMPLETA! 🎉'
                    : 'CORRETO! AVANÇANDO...'}
                </p>
              </div>
            )}

            {feedback === 'incorrect' && (
              <div className="border-4 border-red-500 p-6 bg-red-500/10">
                <p
                  style={{ fontFamily: 'var(--font-pixel)' }}
                  className="text-red-500 text-center"
                >
                  INCORRETO! TENTE NOVAMENTE
                </p>
              </div>
            )}

            {currentChallengeIndex === totalChallenges - 1 && feedback === 'correct' && (
              <button
                onClick={onBack}
                className="w-full py-3 border-2 border-secondary text-secondary hover:bg-secondary hover:text-black transition-all"
                style={{ fontFamily: 'var(--font-pixel)' }}
              >
                VOLTAR AO HUB
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

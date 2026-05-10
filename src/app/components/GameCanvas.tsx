import { useEffect, useRef } from 'react';

interface GameCanvasProps {
  phaseId: number;
  isValidated: boolean;
  feedback: 'correct' | 'incorrect' | null;
}

interface GameModule {
  initGame: (props: {
    canvas: HTMLCanvasElement;
    phaseId: number;
    isValidated: boolean;
    feedback: 'correct' | 'incorrect' | null;
  }) => void;
  updateGameProps: (props: { isValidated: boolean; feedback: 'correct' | 'incorrect' | null }) => void;
  cleanupGame: () => void;
}

export function GameCanvas({ phaseId, isValidated, feedback }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameModuleRef = useRef<GameModule | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ajustar tamanho do canvas
    canvas.width = 600;
    canvas.height = 600;

    // Limpar jogo anterior
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0D1117';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Limpar módulo anterior
    if (gameModuleRef.current?.cleanupGame) {
      try {
        gameModuleRef.current.cleanupGame();
      } catch (e) {
        console.error('Erro ao limpar jogo anterior:', e);
      }
    }
    gameModuleRef.current = null;

    // Carregar módulo do jogo dinamicamente
    const loadGame = async () => {
      try {
        let gameModule: GameModule;

        // Importar dinamicamente baseado na fase
        switch (phaseId) {
          case 1:
            gameModule = await import('../../games/fase1');
            break;
          case 2:
            gameModule = await import('../../games/fase2');
            break;
          case 3:
            gameModule = await import('../../games/fase3');
            break;
          case 4:
            gameModule = await import('../../games/fase4');
            break;
          default:
            throw new Error(`Fase ${phaseId} não encontrada`);
        }

        gameModuleRef.current = gameModule;

        // Inicializar o jogo
        gameModule.initGame({
          canvas,
          phaseId,
          isValidated,
          feedback
        });

        console.log(`Jogo da fase ${phaseId} carregado com sucesso`);
      } catch (error) {
        console.error(`Erro ao carregar jogo da fase ${phaseId}:`, error);

        // Exibir mensagem de erro no canvas
        if (ctx) {
          ctx.fillStyle = '#0D1117';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = '#00ff41';
          ctx.font = '16px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`Erro ao carregar jogo da Fase ${phaseId}`, canvas.width / 2, canvas.height / 2 - 40);

          ctx.font = '14px monospace';
          ctx.fillStyle = '#00d9ff';
          ctx.fillText(`Verifique o arquivo: src/games/fase${phaseId}.ts`, canvas.width / 2, canvas.height / 2 - 10);

          ctx.fillStyle = '#ff006e';
          ctx.fillText(`Erro: ${error instanceof Error ? error.message : 'Desconhecido'}`, canvas.width / 2, canvas.height / 2 + 20);

          ctx.font = '12px monospace';
          ctx.fillStyle = '#6b7280';
          ctx.fillText('Veja o console do navegador para mais detalhes', canvas.width / 2, canvas.height / 2 + 50);
        }
      }
    };

    loadGame();

    // Cleanup
    return () => {
      if (gameModuleRef.current?.cleanupGame) {
        try {
          gameModuleRef.current.cleanupGame();
        } catch (error) {
          console.error('Erro ao limpar jogo:', error);
        }
      }
    };
  }, [phaseId]);

  // Atualizar props quando mudam
  useEffect(() => {
    if (gameModuleRef.current?.updateGameProps) {
      gameModuleRef.current.updateGameProps({
        isValidated,
        feedback
      });
    }
  }, [isValidated, feedback]);

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#0D1117]">
      <canvas
        ref={canvasRef}
        id="game-canvas"
        className="border-4 border-[#00d9ff]"
        style={{ maxWidth: '100%', height: 'auto', imageRendering: 'pixelated' }}
      />
    </div>
  );
}

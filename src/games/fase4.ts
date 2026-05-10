// ========================================
// FASE 4: FUNÇÕES - EM DESENVOLVIMENTO
// ========================================
// Este jogo ainda será criado!

interface GameProps {
  canvas: HTMLCanvasElement;
  phaseId: number;
  isValidated: boolean;
  feedback: 'correct' | 'incorrect' | null;
}

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;

const COLORS = {
  NEON_CYAN: '#00d9ff',
  NEON_YELLOW: '#ffff00',
  NEON_PINK: '#ff006e',
  NEON_RED: '#ff0000',
  DARK_BG: '#0D1117',
  NEON_GREEN: '#00ff41',
  NEON_ORANGE: '#ffd60a'
};

function animate(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mensagem de "Em Desenvolvimento"
  ctx.shadowBlur = 20;
  ctx.shadowColor = COLORS.NEON_ORANGE;
  ctx.fillStyle = COLORS.NEON_ORANGE;
  ctx.font = 'bold 32px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FASE 4: FUNÇÕES', canvas.width / 2, canvas.height / 2 - 60);
  ctx.shadowBlur = 0;

  ctx.fillStyle = COLORS.NEON_CYAN;
  ctx.font = '20px monospace';
  ctx.fillText('EM DESENVOLVIMENTO', canvas.width / 2, canvas.height / 2);

  ctx.fillStyle = COLORS.NEON_GREEN;
  ctx.font = '16px monospace';
  ctx.fillText('Crie seu jogo editando:', canvas.width / 2, canvas.height / 2 + 60);
  ctx.fillText('src/games/fase4.ts', canvas.width / 2, canvas.height / 2 + 85);

  animationId = requestAnimationFrame(() => animate(canvas));
}

export function initGame(props: GameProps) {
  ctx = props.canvas.getContext('2d');
  animate(props.canvas);
}

export function updateGameProps(props: { isValidated: boolean; feedback: 'correct' | 'incorrect' | null }) {
  // Adicione lógica de atualização aqui quando criar o jogo
}

export function cleanupGame() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

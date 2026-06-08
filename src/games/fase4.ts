// ========================================
// FASE 4: FUNÇÕES - ARSENAL DO HACKER
// ========================================
// O jogador monta um "arsenal" de funções. A cada quest resolvida,
// uma ferramenta (função) do arsenal é desbloqueada.

interface GameProps {
  canvas: HTMLCanvasElement;
  phaseId: number;
  isValidated: boolean;
  feedback: 'correct' | 'incorrect' | null;
}

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;
let currentChallenge = 0;

const COLORS = {
  NEON_CYAN: '#00d9ff',
  NEON_YELLOW: '#ffff00',
  NEON_PINK: '#ff006e',
  NEON_RED: '#ff0000',
  DARK_BG: '#0D1117',
  NEON_GREEN: '#00ff41',
  NEON_ORANGE: '#ffd60a',
  METAL: '#2d3436'
};

const gameState = {
  animationFrame: 0,
  feedback: null as 'correct' | 'incorrect' | null,
  message: ''
};

// As 5 ferramentas (funções) do arsenal. Cada uma corresponde a uma quest.
const tools = [
  { name: 'exibirBanner()', tag: 'void',      hint: 'Função sem retorno: só executa uma ação.' },
  { name: 'registrarAlvo()', tag: 'parâmetro', hint: 'Recebe dados (o nome do alvo) entre parênteses.' },
  { name: 'calcularDano()', tag: 'return int', hint: 'Retorna um valor: o tipo (int) vem antes do nome.' },
  { name: 'main()',         tag: 'orquestra',  hint: 'O main fica curto: apenas chama as funções.' },
  { name: 'arsenal.h / .c', tag: 'modular',    hint: 'Assinaturas no .h, implementação no .c.' }
];

const challengesFase4 = [
  {
    title: 'Quest 1: função void',
    objective: 'Crie a função exibirBanner que imprime o banner do hacker.'
  },
  {
    title: 'Quest 2: parâmetros',
    objective: 'Crie registrarAlvo(char nome[]) e identifique o alvo.'
  },
  {
    title: 'Quest 3: retorno (int)',
    objective: 'Crie calcularDano(int forca, int bonus) que retorna a soma.'
  },
  {
    title: 'Quest 4: orquestrar no main()',
    objective: 'Chame as 3 funções em sequência dentro do main().'
  },
  {
    title: 'Quest 5: modularização (.h / .c)',
    objective: 'Inclua o cabeçalho arsenal.h no programa principal.'
  }
];

// Estado de cada ferramenta com base na quest atual e no feedback.
function toolStatus(index: number): 'locked' | 'active' | 'unlocked' {
  if (index < currentChallenge) return 'unlocked';
  if (index === currentChallenge) {
    return gameState.feedback === 'correct' ? 'unlocked' : 'active';
  }
  return 'locked';
}

function drawTitle(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  ctx.textAlign = 'center';
  ctx.shadowBlur = 15;
  ctx.shadowColor = COLORS.NEON_ORANGE;
  ctx.fillStyle = COLORS.NEON_ORANGE;
  ctx.font = 'bold 24px monospace';
  ctx.fillText('ARSENAL DO HACKER', canvas.width / 2, 40);
  ctx.shadowBlur = 0;

  const challenge = challengesFase4[currentChallenge];
  if (!challenge) return;

  ctx.fillStyle = COLORS.NEON_CYAN;
  ctx.font = 'bold 18px monospace';
  ctx.fillText(challenge.title, canvas.width / 2, 78);

  ctx.fillStyle = '#fff';
  ctx.font = '13px monospace';
  ctx.fillText(challenge.objective, canvas.width / 2, 102);
}

function drawArsenal(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  const slotW = 360;
  const slotH = 52;
  const gap = 14;
  const startX = (canvas.width - slotW) / 2;
  const startY = 140;

  tools.forEach((tool, i) => {
    const y = startY + i * (slotH + gap);
    const status = toolStatus(i);

    let border = COLORS.METAL;
    let text = '#6b7280';
    let glow = 0;

    if (status === 'active') {
      const pulse = 8 + Math.sin(gameState.animationFrame * 0.1) * 6;
      border = COLORS.NEON_YELLOW;
      text = COLORS.NEON_YELLOW;
      glow = pulse;
    } else if (status === 'unlocked') {
      border = COLORS.NEON_GREEN;
      text = COLORS.NEON_GREEN;
      glow = 6;
    }

    ctx!.shadowBlur = glow;
    ctx!.shadowColor = border;
    ctx!.strokeStyle = border;
    ctx!.lineWidth = 3;
    ctx!.strokeRect(startX, y, slotW, slotH);
    ctx!.shadowBlur = 0;

    ctx!.fillStyle = 'rgba(0,0,0,0.4)';
    ctx!.fillRect(startX, y, slotW, slotH);

    // Ícone de status (cadeado / mira / check)
    ctx!.textAlign = 'left';
    ctx!.font = '20px monospace';
    ctx!.fillStyle = text;
    const icon = status === 'unlocked' ? '✓' : status === 'active' ? '▶' : '🔒';
    ctx!.fillText(icon, startX + 14, y + slotH / 2 + 7);

    // Nome da função
    ctx!.font = 'bold 16px monospace';
    ctx!.fillText(tool.name, startX + 50, y + slotH / 2 + 6);

    // Tag (void / parâmetro / return...)
    ctx!.textAlign = 'right';
    ctx!.font = 'italic 12px monospace';
    ctx!.fillStyle = status === 'locked' ? '#6b7280' : COLORS.NEON_CYAN;
    ctx!.fillText('[ ' + tool.tag + ' ]', startX + slotW - 14, y + slotH / 2 + 5);
  });
}

function drawFooter(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  ctx.textAlign = 'center';

  // Dica da ferramenta atual
  const tool = tools[currentChallenge];
  if (tool && !gameState.message) {
    ctx.fillStyle = COLORS.NEON_ORANGE;
    ctx.font = 'italic 12px monospace';
    ctx.fillText('Dica: ' + tool.hint, canvas.width / 2, 540);
  }

  // Feedback
  if (gameState.feedback === 'correct') {
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.font = 'bold 16px monospace';
    ctx.fillText('✓ FERRAMENTA ADICIONADA AO ARSENAL!', canvas.width / 2, 570);
  } else if (gameState.feedback === 'incorrect') {
    ctx.fillStyle = COLORS.NEON_RED;
    ctx.font = 'bold 16px monospace';
    ctx.fillText('✗ FUNÇÃO COM FALHA. REVISE A SINTAXE.', canvas.width / 2, 570);
  }

  if (gameState.message) {
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.shadowBlur = 12;
    ctx.shadowColor = COLORS.NEON_GREEN;
    ctx.font = 'bold 20px monospace';
    ctx.fillText(gameState.message, canvas.width / 2, 540);
    ctx.shadowBlur = 0;
  }
}

function animate(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawTitle(canvas);
  drawArsenal(canvas);
  drawFooter(canvas);

  gameState.animationFrame++;
  animationId = requestAnimationFrame(() => animate(canvas));
}

export function initGame(props: GameProps) {
  ctx = props.canvas.getContext('2d');
  currentChallenge = 0;
  gameState.feedback = props.feedback;
  gameState.message = '';
  animate(props.canvas);
}

export function updateGameProps(props: {
  isValidated: boolean;
  feedback: 'correct' | 'incorrect' | null;
  currentChallengeIndex?: number;
}) {
  if (typeof props.currentChallengeIndex === 'number') {
    currentChallenge = props.currentChallengeIndex;
  }

  gameState.feedback = props.feedback;

  // Arsenal completo: última quest validada.
  if (props.feedback === 'correct' && currentChallenge === challengesFase4.length - 1) {
    gameState.message = 'ARSENAL COMPLETO! SISTEMA DOMINADO';
  } else if (props.feedback === null) {
    gameState.message = '';
  }
}

export function cleanupGame() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  currentChallenge = 0;
  gameState.feedback = null;
  gameState.message = '';
}

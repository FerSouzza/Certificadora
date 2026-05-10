// ========================================
// FASE 2: CONDICIONAIS - PAC-MAN
// ========================================
// Controle de movimento com IF/ELSE
// 1=direita, 2=esquerda, 3=cima, 4=baixo

interface GameProps {
  canvas: HTMLCanvasElement;
  phaseId: number;
  isValidated: boolean;
  feedback: 'correct' | 'incorrect' | null;
}

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;
let currentChallenge = 0;

const gameState = {
  pacmanX: 300,
  pacmanY: 300,
  animationFrame: 0,
  moving: false,
  speed: 2
};

const COLORS = {
  NEON_CYAN: '#00d9ff',
  NEON_YELLOW: '#ffff00',
  NEON_PINK: '#ff006e',
  NEON_RED: '#ff0000',
  DARK_BG: '#0D1117',
  NEON_GREEN: '#00ff41',
  NEON_ORANGE: '#ff8800'
};

// Desafios com condicionais
const challenges = [
  {
    // Desafio 1: IF simples
    title: 'if (direcao == 1)',
    variables: [
      { name: 'direcao', value: 1, color: COLORS.NEON_GREEN }
    ],
    condition: 'direcao == 1',
    direction: 1,
    speed: 3,
    targetX: 500,
    targetY: 300,
    arrow: '→',
    label: 'DIREITA',
    code: 'if (direcao == 1) { mover(); }'
  },
  {
    // Desafio 2: IF-ELSE com comparação
    title: 'if (velocidade > 5) ... else',
    variables: [
      { name: 'velocidade', value: 7, color: COLORS.NEON_CYAN }
    ],
    condition: 'velocidade > 5',
    direction: 1,
    speed: 7,
    targetX: 500,
    targetY: 300,
    arrow: '→',
    label: 'RÁPIDO (>5)',
    code: 'if (velocidade > 5) { rapido(); } else { devagar(); }'
  },
  {
    // Desafio 3: IF-ELSE IF-ELSE com &&
    title: 'if (dir==1 && vel>5) ... else if ... else',
    variables: [
      { name: 'direcao', value: 1, color: COLORS.NEON_GREEN },
      { name: 'velocidade', value: 7, color: COLORS.NEON_CYAN }
    ],
    condition: 'direcao == 1 && velocidade > 5',
    direction: 1,
    speed: 7,
    targetX: 500,
    targetY: 200,
    arrow: '→',
    label: 'CORRE! (dir=1 E vel>5)',
    code: 'if (direcao == 1 && velocidade > 5) { correr(); } else if (direcao == 2) { fugir(); } else { parar(); }'
  }
];

function drawGrid(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  const GRID_SIZE = 30;
  const CELL_SIZE = canvas.width / GRID_SIZE;

  ctx.strokeStyle = COLORS.NEON_CYAN + '10';
  ctx.lineWidth = 1;

  for (let i = 0; i <= GRID_SIZE; i++) {
    const pos = i * CELL_SIZE;
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(canvas.width, pos);
    ctx.stroke();
  }
}

function drawPacman(feedback: 'correct' | 'incorrect' | null) {
  if (!ctx) return;

  const pacmanSize = 25;
  const mouthAngle = (Math.sin(gameState.animationFrame * 0.3) * 0.3) + 0.3;

  ctx.shadowBlur = 25;
  ctx.shadowColor = COLORS.NEON_YELLOW;
  ctx.fillStyle = COLORS.NEON_YELLOW;
  ctx.beginPath();
  ctx.arc(gameState.pacmanX, gameState.pacmanY, pacmanSize, mouthAngle, Math.PI * 2 - mouthAngle);
  ctx.lineTo(gameState.pacmanX, gameState.pacmanY);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Movimento quando correto
  if (feedback === 'correct' && gameState.moving) {
    const challenge = challenges[currentChallenge];
    if (challenge) {
      const dx = challenge.targetX - gameState.pacmanX;
      const dy = challenge.targetY - gameState.pacmanY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        // Usar a velocidade do desafio
        const moveSpeed = challenge.speed / 2;
        gameState.pacmanX += (dx / dist) * moveSpeed;
        gameState.pacmanY += (dy / dist) * moveSpeed;
      }
    }
  }
}

function drawVariablesPanel() {
  if (!ctx) return;

  const challenge = challenges[currentChallenge];
  if (!challenge) return;

  const canvas = ctx.canvas;

  // Painel de variáveis centralizado no topo
  const panelWidth = 400;
  const panelHeight = 60 + (challenge.variables.length * 35);
  const panelX = (canvas.width - panelWidth) / 2;
  const panelY = 30;

  ctx.strokeStyle = COLORS.NEON_GREEN;
  ctx.lineWidth = 3;
  ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);

  ctx.fillStyle = COLORS.NEON_GREEN;
  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('VARIÁVEIS', canvas.width / 2, panelY + 25);

  // Desenhar cada variável
  challenge.variables.forEach((variable, index) => {
    ctx!.font = 'bold 18px monospace';
    ctx!.fillStyle = COLORS.NEON_CYAN;
    ctx!.textAlign = 'center';
    ctx!.fillText(
      `int ${variable.name} = ${variable.value};`,
      canvas.width / 2,
      panelY + 60 + (index * 35)
    );
  });
}

function drawDirectionIndicator() {
  if (!ctx) return;

  const challenge = challenges[currentChallenge];
  if (!challenge) return;

  // Desenhar seta de destino (apenas a seta, sem texto)
  ctx.shadowBlur = 25;
  ctx.shadowColor = COLORS.NEON_GREEN;
  ctx.fillStyle = COLORS.NEON_GREEN;
  ctx.font = 'bold 80px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(challenge.arrow, challenge.targetX, challenge.targetY);
  ctx.shadowBlur = 0;
}

function drawGhost() {
  if (!ctx) return;

  const challenge = challenges[currentChallenge];
  if (!challenge || !challenge.showGhost) return;

  const ghostSize = 25;

  ctx.shadowBlur = 30;
  ctx.shadowColor = COLORS.NEON_PINK;
  ctx.fillStyle = COLORS.NEON_PINK;
  ctx.beginPath();
  ctx.arc(challenge.ghostX, challenge.ghostY, ghostSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.fillRect(challenge.ghostX - 8, challenge.ghostY - 6, 6, 10);
  ctx.fillRect(challenge.ghostX + 2, challenge.ghostY - 6, 6, 10);
  ctx.shadowBlur = 0;
}


function drawStatus(feedback: 'correct' | 'incorrect' | null) {
  if (!ctx) return;

  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  const canvas = ctx.canvas;

  if (feedback === 'correct') {
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.shadowBlur = 10;
    ctx.shadowColor = COLORS.NEON_GREEN;
    ctx.fillText('✓ CORRETO! PAC-MAN MOVENDO...', canvas.width / 2, 480);
    ctx.shadowBlur = 0;
  } else if (feedback === 'incorrect') {
    ctx.shadowBlur = 10;
    ctx.shadowColor = COLORS.NEON_RED;
    ctx.fillStyle = COLORS.NEON_RED;
    ctx.fillText('✗ DIREÇÃO INCORRETA!', canvas.width / 2, 480);
    ctx.shadowBlur = 0;
  } else {
    ctx.fillStyle = COLORS.NEON_CYAN;
    ctx.fillText('Digite o código para mover o Pac-Man...', canvas.width / 2, 480);
  }
}

let currentFeedback: 'correct' | 'incorrect' | null = null;

function animate(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGrid(canvas);
  drawVariablesPanel();
  drawDirectionIndicator();
  drawGhost();
  drawPacman(currentFeedback);
  drawStatus(currentFeedback);

  gameState.animationFrame++;
  animationId = requestAnimationFrame(() => animate(canvas));
}

export function initGame(props: GameProps) {
  ctx = props.canvas.getContext('2d');
  currentFeedback = props.feedback;
  currentChallenge = 0;

  // Reset posição
  gameState.pacmanX = 300;
  gameState.pacmanY = 300;

  animate(props.canvas);
}

export function updateGameProps(props: { isValidated: boolean; feedback: 'correct' | 'incorrect' | null }) {
  currentFeedback = props.feedback;

  if (props.feedback === 'correct') {
    gameState.moving = true;

    // Trocar desafio quando completa
    if (currentChallenge < challenges.length - 1) {
      setTimeout(() => {
        currentChallenge++;
        gameState.pacmanX = 300;
        gameState.pacmanY = 300;
        gameState.moving = false;
      }, 2500);
    }
  }
}

export function cleanupGame() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  currentChallenge = 0;
}

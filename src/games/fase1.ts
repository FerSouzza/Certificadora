// ========================================
// FASE 1: VARIÁVEIS - TETRIS
// ========================================
// Declaração de variáveis para controle de peças

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
  pieceRotation: 0,
  rotating: false,
  animationFrame: 0,
  targetRotation: 0
};

const COLORS = {
  NEON_CYAN: '#00d9ff',
  NEON_YELLOW: '#ffff00',
  NEON_PINK: '#ff006e',
  NEON_RED: '#ff0000',
  NEON_BLUE: '#0080ff',
  DARK_BG: '#0D1117',
  NEON_GREEN: '#00ff41',
  NEON_ORANGE: '#ff8800',
  NEON_PURPLE: '#bb86fc'
};

// Tipos de peças Tetris
const PIECES = {
  SQUARE: {
    type: 1,
    name: 'QUADRADO',
    color: COLORS.NEON_YELLOW,
    blocks: [[0,0], [1,0], [0,1], [1,1]]
  },
  LINE: {
    type: 2,
    name: 'LINHA',
    color: COLORS.NEON_CYAN,
    blocks: [[0,0], [1,0], [2,0], [3,0]]
  },
  L_PIECE: {
    type: 3,
    name: 'L',
    color: COLORS.NEON_ORANGE,
    blocks: [[0,0], [0,1], [0,2], [1,2]]
  },
  T_PIECE: {
    type: 4,
    name: 'T',
    color: COLORS.NEON_PURPLE,
    blocks: [[0,0], [1,0], [2,0], [1,1]]
  }
};

// Desafios com variáveis
const challenges = [
  {
    // Desafio 1: 1 variável - tipo
    piece: PIECES.SQUARE,
    targetRotation: 0,
    variables: [
      { name: 'tipo', value: 1, label: 'QUADRADO' }
    ]
  },
  {
    // Desafio 2: 2 variáveis - tipo e rotacao
    piece: PIECES.LINE,
    targetRotation: 90,
    variables: [
      { name: 'tipo', value: 2, label: 'LINHA' },
      { name: 'rotacao', value: 90, label: '90°' }
    ]
  },
  {
    // Desafio 3: 3 variáveis - tipo, rotacao, posicao
    piece: PIECES.L_PIECE,
    position: 150,
    targetRotation: 90,
    variables: [
      { name: 'tipo', value: 3, label: 'L' },
      { name: 'rotacao', value: 90, label: '90°' },
      { name: 'posicao', value: 150, label: '150px' }
    ]
  }
];

function drawGrid(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  // Grid de fundo sutil
  const GRID_SIZE = 30;
  const CELL_SIZE = canvas.width / GRID_SIZE;

  ctx.strokeStyle = COLORS.NEON_CYAN + '08';
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

function drawTetrisPiece() {
  if (!ctx) return;

  const challenge = challenges[currentChallenge];
  if (!challenge) return;

  const canvas = ctx.canvas;
  const BLOCK_SIZE = 40;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2 + 20;

  ctx.save();
  ctx.translate(centerX, centerY);

  // Aplicar rotação
  const currentRotation = gameState.rotating ? gameState.pieceRotation : 0;
  ctx.rotate((currentRotation * Math.PI) / 180);

  // Desenhar blocos da peça
  challenge.piece.blocks.forEach(([x, y]) => {
    ctx!.shadowBlur = 20;
    ctx!.shadowColor = challenge.piece.color;
    ctx!.fillStyle = challenge.piece.color;
    ctx!.fillRect(
      x * BLOCK_SIZE - BLOCK_SIZE * 1.5,
      y * BLOCK_SIZE - BLOCK_SIZE * 1.5,
      BLOCK_SIZE - 3,
      BLOCK_SIZE - 3
    );
    ctx!.shadowBlur = 0;

    // Borda do bloco
    ctx!.strokeStyle = COLORS.DARK_BG;
    ctx!.lineWidth = 3;
    ctx!.strokeRect(
      x * BLOCK_SIZE - BLOCK_SIZE * 1.5,
      y * BLOCK_SIZE - BLOCK_SIZE * 1.5,
      BLOCK_SIZE - 3,
      BLOCK_SIZE - 3
    );
  });

  ctx.restore();
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


function drawStatus(feedback: 'correct' | 'incorrect' | null) {
  if (!ctx) return;

  ctx.font = '18px monospace';
  ctx.textAlign = 'center';
  const canvas = ctx.canvas;

  if (feedback === 'correct') {
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.shadowBlur = 15;
    ctx.shadowColor = COLORS.NEON_GREEN;
    ctx.fillText('✓ CORRETO!', canvas.width / 2, canvas.height - 40);
    ctx.shadowBlur = 0;
  } else if (feedback === 'incorrect') {
    ctx.shadowBlur = 15;
    ctx.shadowColor = COLORS.NEON_RED;
    ctx.fillStyle = COLORS.NEON_RED;
    ctx.fillText('✗ INCORRETO', canvas.width / 2, canvas.height - 40);
    ctx.shadowBlur = 0;
  }
}

function updateRotation() {
  if (gameState.rotating && gameState.pieceRotation < gameState.targetRotation) {
    gameState.pieceRotation += 3;
    if (gameState.pieceRotation > gameState.targetRotation) {
      gameState.pieceRotation = gameState.targetRotation;
    }
  }
}

let currentFeedback: 'correct' | 'incorrect' | null = null;

function animate(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGrid(canvas);
  drawVariablesPanel();
  drawTetrisPiece();
  drawStatus(currentFeedback);

  updateRotation();

  gameState.animationFrame++;
  animationId = requestAnimationFrame(() => animate(canvas));
}

export function initGame(props: GameProps) {
  ctx = props.canvas.getContext('2d');
  currentFeedback = props.feedback;
  currentChallenge = 0;

  gameState.pieceRotation = 0;
  gameState.rotating = false;
  gameState.targetRotation = 0;

  animate(props.canvas);
}

export function updateGameProps(props: { isValidated: boolean; feedback: 'correct' | 'incorrect' | null }) {
  currentFeedback = props.feedback;

  if (props.feedback === 'correct') {
    const challenge = challenges[currentChallenge];
    if (challenge) {
      gameState.targetRotation = challenge.targetRotation;
      gameState.rotating = true;
    }

    if (currentChallenge < challenges.length - 1) {
      setTimeout(() => {
        currentChallenge++;
        gameState.pieceRotation = 0;
        gameState.rotating = false;
        gameState.targetRotation = 0;
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

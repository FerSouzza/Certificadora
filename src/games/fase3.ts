// ========================================
// FASE 3: REPETIÇÃO - JOGO DO COFRE
// ========================================

interface GameProps {
  canvas: HTMLCanvasElement;
  phaseId: number;
  isValidated: boolean;
  feedback: 'correct' | 'incorrect' | null;
}

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;
let currentChallenge = 0;
let isTransitioning = false;

const gameState = {
  vaultUnlocked: false,
  attempts: 5,
  currentDigits: [0, 0, 0],
  correctCombination: [4, 8, 2], 
  animationFrame: 0,
  message: "",
  feedback: null as 'correct' | 'incorrect' | null
};

const COLORS = {
  NEON_CYAN: '#00d9ff',
  NEON_YELLOW: '#ffff00',
  NEON_PINK: '#ff006e',
  NEON_RED: '#ff0000',
  DARK_BG: '#0D1117',
  NEON_GREEN: '#00ff41',
  NEON_ORANGE: '#ff8800',
  METAL: '#2d3436'
};

const challengesFase3 = [
  {
    title: 'Quest 1: do-while',
    objective: 'Criar um loop perguntando se deseja continuar para invadir outro cofre',
    codeSnippet: 'do {jogarNivelHacker();} while(continuar=="s");',
    renderAction: 'drawVault'
  },
  {
    title: 'Quest 2: while',
    objective: 'Criar um loop com limite de 5 tentativas e imprimir as restantes',
    codeSnippet: 'while (tentativas > 0) { printf("%d tentativas", tentativas); tentativas--; }',
    renderAction: 'drawAttempts'
  },
  {
    title: 'Quest 3: for',
    objective: 'Criar um programa com for para checar os três dígitos',
    codeSnippet: 'for(inti=0;i<3;i++){if(tentativaHacker[i]==senhaCorreta[i]){printf("Dígitonnaposição%destáCORRETO.",i+1);}else{printf("Dígitonnaposição%destáERRADO.",i+1);}}',
    renderAction: 'drawDigits'
  },
  {
    title: 'Quest 4: break',
    objective: 'Sair do laço se a senha estiver correta e imprimir "Acesso aprovado!".',
    codeSnippet: 'if(senhaCorreta){printf("Acesso aprovado!");break;}',
    renderAction: 'drawUnlock'
  },
  {
    title: 'Quest 5: continue',
    objective: 'Usar continue para nova tentativa se a senha estiver errada.',
    codeSnippet: 'if(senhaInvalida){printf("Senha Inválida!. Tente novamente.");continue;}',
    renderAction: 'drawError'
  }
];


export function verifyUserCode(playerCode: string): 'correct' | 'incorrect' {
  if (isTransitioning) return gameState.feedback || 'incorrect';

  const cleanPlayerCode = playerCode
    .replace(/\s+/g, '')        
    .replace(/'/g, '"')         
    .trim();

  const cleanExpectedCode = challengesFase3[currentChallenge].codeSnippet
    .replace(/\s+/g, '')
    .replace(/'/g, '"')
    .trim();

  console.log("=== COMPARAÇÃO DE CÓDIGO ===");
  console.log("Recebido:", cleanPlayerCode);
  console.log("Esperado:", cleanExpectedCode);

  if (cleanPlayerCode === cleanExpectedCode) {
    gameState.feedback = 'correct';
    isTransitioning = true;

    if (currentChallenge === 2) { 
      gameState.vaultUnlocked = true; 
    }

    setTimeout(() => {
      if (currentChallenge < challengesFase3.length - 1) {
        currentChallenge++;
        gameState.feedback = null;
        isTransitioning = false;
      } else {
        gameState.message = "SISTEMA TOTALMENTE HACKEADO!";
      }
    }, 2000);

    return 'correct';
  } else {
    gameState.feedback = 'incorrect';
    
    if (gameState.attempts > 0) {
      gameState.attempts--;
    }
    
    setTimeout(() => {
      if (gameState.feedback === 'incorrect') {
        gameState.feedback = null;
      }
    }, 2000);

    return 'incorrect';
  }
}

function drawVaultInterface(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  ctx.fillStyle = COLORS.METAL;
  ctx.strokeStyle = COLORS.NEON_CYAN;
  ctx.lineWidth = 5;
  const vWidth = 300;
  const vHeight = 250;
  const vX = (canvas.width - vWidth) / 2;
  const vY = (canvas.height - vHeight) / 2 + 30;

  ctx.strokeRect(vX, vY, vWidth, vHeight);
  ctx.fillRect(vX, vY, vWidth, vHeight);

  
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = '#000';
    ctx.fillRect(vX + 40 + (i * 80), vY + 80, 60, 80);
    ctx.strokeStyle = gameState.vaultUnlocked ? COLORS.NEON_GREEN : COLORS.NEON_CYAN;
    ctx.strokeRect(vX + 40 + (i * 80), vY + 80, 60, 80);
    
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.font = 'bold 40px monospace';
    ctx.textAlign = 'center';
    
    ctx.fillText(
      gameState.vaultUnlocked ? gameState.correctCombination[i].toString() : "?", 
      vX + 70 + (i * 80), vY + 135
    );
  }
}

function drawQuestPanel(canvas: HTMLCanvasElement, questNum: number) {
  if (!ctx) return;

  const challenge = challengesFase3[questNum];
  
  // Título da quest
  ctx.fillStyle = COLORS.NEON_CYAN;
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(challenge.title, canvas.width / 2, 40);

  // Objetivo
  ctx.font = '14px monospace';
  ctx.fillStyle = '#fff';
  ctx.fillText(challenge.objective, canvas.width / 2, 65);

  // Feedback
  if (gameState.feedback === 'correct') {
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.fillText('✓ CÓDIGO VALIDADO!', canvas.width / 2, 430);
  } else if (gameState.feedback === 'incorrect') {
    ctx.fillStyle = COLORS.NEON_RED;
    ctx.fillText('✗ ERRO NA LÓGICA DO LOOP', canvas.width / 2, 430);
  }

  if (gameState.message) {
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.font = 'bold 22px monospace';
    ctx.fillText(gameState.message, canvas.width / 2, 460);
  }
}

function drawQuest1Panel(canvas: HTMLCanvasElement) {
  drawQuestPanel(canvas, 0);
  if (!ctx) return;
  
  // Informação específica: do-while repete até condição falsa
  ctx.fillStyle = COLORS.NEON_YELLOW;
  ctx.font = 'italic 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Dica: do-while executa primeiro, depois testa', canvas.width / 2, 120);
}

function drawQuest2Panel(canvas: HTMLCanvasElement) {
  drawQuestPanel(canvas, 1);
  if (!ctx) return;
  
  // Informação específica: contador de tentativas
  ctx.fillStyle = COLORS.NEON_YELLOW;
  ctx.font = 'italic 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Dica: while testa ANTES de executar', canvas.width / 2, 120);
  ctx.fillText('Decremente tentativas a cada iteração', canvas.width / 2, 140);
}

function drawQuest3Panel(canvas: HTMLCanvasElement) {
  drawQuestPanel(canvas, 2);
  if (!ctx) return;
  
  // Informação específica: verificação de dígitos
  ctx.fillStyle = COLORS.NEON_YELLOW;
  ctx.font = 'italic 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Dica: for percorre índices 0, 1, 2', canvas.width / 2, 120);
  ctx.fillText('Compare tentativaHacker[i] com senhaCorreta[i]', canvas.width / 2, 140);
}

function drawQuest4Panel(canvas: HTMLCanvasElement) {
  drawQuestPanel(canvas, 3);
  if (!ctx) return;
  
  // Informação específica: break para sair
  ctx.fillStyle = COLORS.NEON_YELLOW;
  ctx.font = 'italic 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Dica: break interrompe o laço imediatamente', canvas.width / 2, 120);
  ctx.fillText('Use dentro de uma estrutura de repetição', canvas.width / 2, 140);
}

function drawQuest5Panel(canvas: HTMLCanvasElement) {
  drawQuestPanel(canvas, 4);
  if (!ctx) return;
  
  // Informação específica: continue para próxima iteração
  ctx.fillStyle = COLORS.NEON_YELLOW;
  ctx.font = 'italic 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Dica: continue pula para próxima iteração', canvas.width / 2, 120);
  ctx.fillText('Não executa código restante da iteração atual', canvas.width / 2, 140);
}

function drawHUD(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  // Seleciona o painel correto baseado na quest atual
  switch(currentChallenge) {
    case 0:
      drawQuest1Panel(canvas);
      break;
    case 1:
      drawQuest2Panel(canvas);
      break;
    case 2:
      drawQuest3Panel(canvas);
      break;
    case 3:
      drawQuest4Panel(canvas);
      break;
    case 4:
      drawQuest5Panel(canvas);
      break;
    default:
      drawQuestPanel(canvas, 0);
  }
}

function animate(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawVaultInterface(canvas);
  drawHUD(canvas);

  gameState.animationFrame++;
  animationId = requestAnimationFrame(() => animate(canvas));
}

export function initGame(props: GameProps) {
  ctx = props.canvas.getContext('2d');
  currentChallenge = 0;
  gameState.attempts = 5;
  gameState.vaultUnlocked = false;
  gameState.feedback = null;
  gameState.message = "";
  isTransitioning = false;
  animate(props.canvas);
}

export function updateGameProps(props: { isValidated: boolean; feedback: 'correct' | 'incorrect' | null }) {
  if (props.feedback && !isTransitioning) {
    gameState.feedback = props.feedback;
  }
}

export function setCurrentChallenge(index: number) {
  currentChallenge = index;
}

export function cleanupGame() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  currentChallenge = 0;
  isTransitioning = false;
}

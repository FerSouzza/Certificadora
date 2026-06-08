// ========================================
// FASE 3: REPETIÇÃO - JOGO DO COFRE (VERSÃO CENTRALIZADA - BUGFIX FEEDBACK)
// ========================================

interface GameProps {
  canvas: HTMLCanvasElement;
  phaseId: number;
  isValidated: boolean;
  feedback: 'correct' | 'incorrect' | null;
  currentChallengeIndex?: number;
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
  METAL: '#2d3436',
  GRID: '#161b22'
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

  if (cleanPlayerCode === cleanExpectedCode) {
    gameState.feedback = 'correct';
    isTransitioning = true;

    if (currentChallenge === 3) {
      gameState.vaultUnlocked = true;
    }

    setTimeout(() => {
      if (currentChallenge < challengesFase3.length - 1) {
        currentChallenge++;
        gameState.feedback = null; // Reseta feedback visual para a próxima quest
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
        gameState.feedback = null; // Remove mensagem de erro após 2 segundos
      }
    }, 2000);

    return 'incorrect';
  }
}

// ========================================================
// FUNÇÕES DE REDERIZAÇÃO GRÁFICA (TODAS CENTRALIZADAS)
// ========================================================

function drawBackgroundGrid(canvas: HTMLCanvasElement) {
  if (!ctx) return;
  ctx.strokeStyle = COLORS.GRID;
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
}

function drawVaultBase(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  const vWidth = 360;
  const vHeight = 230;
  const vX = (canvas.width - vWidth) / 2;
  const vY = 160;

  ctx.save();
  ctx.fillStyle = COLORS.METAL;
  ctx.strokeStyle = gameState.vaultUnlocked ? COLORS.NEON_GREEN : COLORS.NEON_CYAN;
  ctx.lineWidth = 5;
  ctx.fillRect(vX, vY, vWidth, vHeight);
  ctx.strokeRect(vX, vY, vWidth, vHeight);

  // Scanner
  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(vX + 20, vY + 20, 140, 60);
  ctx.strokeStyle = COLORS.NEON_YELLOW;
  ctx.strokeRect(vX + 20, vY + 20, 140, 60);

  ctx.fillStyle = COLORS.NEON_CYAN;
  ctx.font = '11px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('STATUS DO COFRE', vX + 28, vY + 38);
  ctx.fillStyle = gameState.vaultUnlocked ? COLORS.NEON_GREEN : COLORS.NEON_RED;
  ctx.font = 'bold 12px monospace';
  ctx.fillText(gameState.vaultUnlocked ? 'DESBLOQUEADO' : 'BLOQUEADO', vX + 28, vY + 56);

  // Volante
  ctx.fillStyle = COLORS.DARK_BG;
  ctx.beginPath();
  ctx.arc(vX + vWidth - 75, vY + 50, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.NEON_YELLOW;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Dígitos
  const digitsY = vY + 125;
  for (let i = 0; i < 3; i++) {
    const boxX = vX + 35 + i * 100;
    ctx.fillStyle = '#000';
    ctx.fillRect(boxX, digitsY, 65, 80);
    ctx.strokeStyle = gameState.vaultUnlocked ? COLORS.NEON_GREEN : COLORS.NEON_CYAN;
    ctx.strokeRect(boxX, digitsY, 65, 80);

    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.font = 'bold 38px monospace';
    ctx.textAlign = 'center';
    
    let charToShow = gameState.vaultUnlocked ? gameState.correctCombination[i].toString() : '?';
    if (!gameState.vaultUnlocked && isTransitioning) {
      charToShow = Math.floor(Math.random() * 10).toString();
    }
    ctx.fillText(charToShow, boxX + 32, digitsY + 54);
  }
  ctx.restore();
}

function drawQuest1Illustration(canvas: HTMLCanvasElement) {
  if (!ctx) return;
  const pW = 420; const pH = 220;
  const pX = (canvas.width - pW) / 2;
  const pY = 160;

  ctx.save();
  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(pX, pY, pW, pH);
  ctx.strokeStyle = COLORS.NEON_PINK;
  ctx.lineWidth = 3;
  ctx.strokeRect(pX, pY, pW, pH);

  ctx.fillStyle = COLORS.NEON_PINK;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('⚡ FLUXO DE REPETIÇÃO: DO-WHILE', pX + 20, pY + 25);

  ctx.strokeStyle = COLORS.NEON_CYAN;
  ctx.lineWidth = 2;
  ctx.strokeRect(pX + 120, pY + 50, 180, 40);
  ctx.fillStyle = '#fff';
  ctx.font = '11px monospace';
  ctx.fillText('1. Executa: jogarNivelHacker()', pX + 128, pY + 74);

  ctx.strokeStyle = COLORS.NEON_YELLOW;
  ctx.strokeRect(pX + 120, pY + 120, 180, 40);
  ctx.fillStyle = COLORS.NEON_YELLOW;
  ctx.fillText('2. Teste: continuar == "s"?', pX + 128, pY + 144);

  ctx.strokeStyle = COLORS.NEON_GREEN;
  ctx.beginPath();
  ctx.moveTo(pX + 210, pY + 90); ctx.lineTo(pX + 210, pY + 120);
  ctx.moveTo(pX + 300, pY + 140); ctx.lineTo(pX + 340, pY + 140); ctx.lineTo(pX + 340, pY + 70); ctx.lineTo(pX + 300, pY + 70);
  ctx.stroke();
  ctx.restore();
}

function drawQuest2Illustration(canvas: HTMLCanvasElement) {
  if (!ctx) return;
  const pW = 420; const pH = 220;
  const pX = (canvas.width - pW) / 2; 
  const pY = 160;

  ctx.save();
  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(pX, pY, pW, pH);
  ctx.strokeStyle = COLORS.NEON_CYAN;
  ctx.lineWidth = 3;
  ctx.strokeRect(pX, pY, pW, pH);

  ctx.fillStyle = COLORS.NEON_CYAN;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(' SYSTEM ATTEMPTS COUNTER (WHILE)', pX + 20, pY + 25);

  ctx.textAlign = 'center';
  ctx.fillStyle = gameState.attempts <= 2 ? COLORS.NEON_RED : COLORS.NEON_GREEN;
  ctx.font = 'bold 64px monospace';
  ctx.fillText(gameState.attempts.toString(), pX + pW / 2, pY + 95);

  ctx.font = '11px monospace';
  ctx.fillStyle = '#8b949e';
  ctx.fillText('CONDIÇÃO DO LOOP: (tentativas > 0)', pX + pW / 2, pY + 130);

  const barW = 60; const barH = 15;
  const startBarsX = pX + (pW - (5 * barW + 4 * 10)) / 2;
  
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i < gameState.attempts ? (gameState.attempts <= 2 ? COLORS.NEON_RED : COLORS.NEON_GREEN) : '#21262d';
    ctx.fillRect(startBarsX + (i * (barW + 10)), pY + 160, barW, barH);
    ctx.strokeStyle = '#30363d';
    ctx.strokeRect(startBarsX + (i * (barW + 10)), pY + 160, barW, barH);
  }
  ctx.restore();
}

function drawQuest3Illustration(canvas: HTMLCanvasElement) {
  if (!ctx) return;
  const pW = 440; const pH = 220;
  const pX = (canvas.width - pW) / 2;
  const pY = 160;

  ctx.save();
  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(pX, pY, pW, pH);
  ctx.strokeStyle = COLORS.NEON_YELLOW;
  ctx.lineWidth = 3;
  ctx.strokeRect(pX, pY, pW, pH);

  ctx.fillStyle = COLORS.NEON_YELLOW;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(' ARRAY COMPARISON: for(int i = 0; i < 3; i++)', pX + 20, pY + 25);

  for (let i = 0; i < 3; i++) {
    const bX = pX + 35 + (i * 130);
    
    ctx.fillStyle = '#161b22';
    ctx.fillRect(bX, pY + 55, 90, 35);
    ctx.strokeStyle = COLORS.NEON_CYAN;
    ctx.strokeRect(bX, pY + 55, 90, 35);
    
    ctx.fillStyle = COLORS.NEON_CYAN;
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`tentativa[${i}]`, bX + 45, pY + 77);

    ctx.strokeStyle = '#30363d';
    ctx.beginPath(); ctx.moveTo(bX + 45, pY + 90); ctx.lineTo(bX + 45, pY + 125); ctx.stroke();

    ctx.fillStyle = '#161b22';
    ctx.fillRect(bX, pY + 125, 90, 35);
    ctx.strokeStyle = COLORS.NEON_PINK;
    ctx.strokeRect(bX, pY + 125, 90, 35);

    ctx.fillStyle = COLORS.NEON_PINK;
    ctx.fillText(`correta[${i}]`, bX + 45, pY + 147);
  }
  ctx.restore();
}

function drawQuest5Illustration(canvas: HTMLCanvasElement) {
  if (!ctx) return;
  const pW = 420; const pH = 220;
  const pX = (canvas.width - pW) / 2;
  const pY = 160;

  ctx.save();
  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(pX, pY, pW, pH);
  ctx.strokeStyle = COLORS.NEON_ORANGE;
  ctx.lineWidth = 3;
  ctx.strokeRect(pX, pY, pW, pH);

  ctx.fillStyle = COLORS.NEON_ORANGE;
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('↻ INSTRUÇÃO DE SALTO: CONTINUE;', pX + 20, pY + 30);

  ctx.strokeStyle = COLORS.NEON_ORANGE;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(pX + pW / 2, pY + 105, 30, 0, Math.PI * 1.5, false);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = COLORS.NEON_RED;
  ctx.font = 'bold 12px monospace';
  ctx.fillText('Senha Inválida! Ignorando restante das linhas...', pX + pW / 2, pY + 165);
  ctx.fillStyle = COLORS.NEON_CYAN;
  ctx.fillText('↻ Retornando para o topo do laço.', pX + pW / 2, pY + 190);
  ctx.restore();
}

function drawGameIllustration(canvas: HTMLCanvasElement) {
  drawBackgroundGrid(canvas);
  
  switch (currentChallenge) {
    case 0:
      drawQuest1Illustration(canvas);
      break;
    case 1:
      drawQuest2Illustration(canvas);
      break;
    case 2:
      drawQuest3Illustration(canvas);
      break;
    case 3:
      drawVaultBase(canvas);
      break;
    case 4:
      drawQuest5Illustration(canvas);
      break;
    default:
      drawQuest1Illustration(canvas);
  }
}

function drawQuestPanel(canvas: HTMLCanvasElement, questNum: number) {
  if (!ctx) return;

  const challenge = challengesFase3[questNum];
  ctx.save();
  
  ctx.fillStyle = COLORS.NEON_CYAN;
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(challenge.title.toUpperCase(), canvas.width / 2, 40);

  ctx.fillStyle = '#161b22';
  ctx.fillRect(40, 65, canvas.width - 80, 45);
  ctx.strokeStyle = '#30363d';
  ctx.strokeRect(40, 65, canvas.width - 80, 45);

  ctx.font = '13px monospace';
  ctx.fillStyle = '#e6edf3';
  ctx.textAlign = 'left';
  ctx.fillText(`${challenge.objective}`, 55, 92);

  ctx.textAlign = 'center';
  
  // CORREÇÃO AQUI: Exibe as mensagens estritamente se o jogador tiver interagido/validado na quest atual
  if (gameState.feedback === 'correct') {
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.font = 'bold 15px monospace';
    ctx.fillText('✓ CÓDIGO ACEITO!', canvas.width / 2, 415);
  } else if (gameState.feedback === 'incorrect') {
    ctx.fillStyle = COLORS.NEON_RED;
    ctx.font = 'bold 15px monospace';
    ctx.fillText('✗ ERRO DE SINTAXE', canvas.width / 2, 415);
  }

  if (gameState.message) {
    ctx.fillStyle = COLORS.NEON_GREEN;
    ctx.font = 'bold 24px monospace';
    ctx.fillText(gameState.message, canvas.width / 2, 455);
  }
  ctx.restore();
}

function drawHUD(canvas: HTMLCanvasElement) {
  drawQuestPanel(canvas, currentChallenge);

  if (!ctx) return;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = COLORS.NEON_YELLOW;
  ctx.font = 'italic 11px monospace';

  switch(currentChallenge) {
    case 0:
      ctx.fillText('Dica: do-while executa o escopo primeiro, testando a condição apenas na saída.', canvas.width / 2, 135);
      break;
    case 1:
      ctx.fillText('Dica: while avalia a expressão antes. Se for falsa de início, nunca roda.', canvas.width / 2, 135);
      break;
    case 2:
      ctx.fillText('Dica: O laço for controla perfeitamente iterações sobre vetores/indexadores.', canvas.width / 2, 135);
      break;
    case 3:
      ctx.fillText('Dica: O break encerra o bloco de repetição atual de forma imediata e abrupta.', canvas.width / 2, 135);
      break;
    case 4:
      ctx.fillText('Dica: continue pula o código restante desta volta e avança para a próxima iteração.', canvas.width / 2, 135);
      break;
  }
  ctx.restore();
}

function animate(canvas: HTMLCanvasElement) {
  if (!ctx) return;

  ctx.fillStyle = COLORS.DARK_BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGameIllustration(canvas);
  drawHUD(canvas);

  gameState.animationFrame++;
  animationId = requestAnimationFrame(() => animate(canvas));
}

// ========================================================
// INITIALIZERS & CLEANERS
// ========================================================

export function initGame(props: GameProps) {
  ctx = props.canvas.getContext('2d');
  
  // Força uma troca e limpeza limpa ao iniciar a fase
  currentChallenge = typeof props.currentChallengeIndex === 'number' ? props.currentChallengeIndex : 0;
  gameState.attempts = 5;
  gameState.vaultUnlocked = false;
  
  // CORREÇÃO: Impede que feedbacks antigos residam na inicialização de uma nova quest não respondida
  gameState.feedback = null; 
  gameState.message = "";
  isTransitioning = false;
  
  animate(props.canvas);
}

export function updateGameProps(props: { isValidated: boolean; feedback: 'correct' | 'incorrect' | null; currentChallengeIndex?: number }) {
  if (typeof props.currentChallengeIndex === 'number' && props.currentChallengeIndex !== currentChallenge) {
    currentChallenge = props.currentChallengeIndex;
    gameState.feedback = null; // Zera o feedback local se o índice da quest mudar externamente
  }
  
  // Apenas atribui o feedback externo se o jogo não estiver travado em uma transição de tela
  if (!isTransitioning) {
    gameState.feedback = props.feedback;
  }
}

export function setCurrentChallenge(index: number) {
  currentChallenge = index;
  gameState.feedback = null; // Reseta o estado visual de acerto/erro imediatamente ao pular de fase
}

export function cleanupGame() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  currentChallenge = 0;
  gameState.feedback = null;
  isTransitioning = false;
}
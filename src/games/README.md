# 🎮 Jogos Educacionais - Code Quest

Esta pasta contém os jogos visuais que ensinam programação através de desafios interativos.

## 📁 Estrutura de Arquivos

```
src/games/
├── fase1.ts          # FASE 1: VARIÁVEIS - Tetris (COMPLETO)
├── fase2.ts          # FASE 2: CONDICIONAIS - Pac-Man (COMPLETO)
├── fase3.ts          # FASE 3: REPETIÇÃO - Em desenvolvimento
├── fase4.ts          # FASE 4: FUNÇÕES - Em desenvolvimento
└── README.md         # Este arquivo
```

---

## 🎯 FASE 1: VARIÁVEIS - TETRIS

**Arquivo:** `fase1.ts`

**Conceito ensinado:** Declaração de variáveis

### Como funciona:
- Mostra uma peça de Tetris no centro da tela
- Painel de variáveis no topo mostra as variáveis necessárias
- Quando o aluno digita o código correto, a peça gira

### Desafios atuais:
1. **1 variável** - `int tipo = 1;` (Quadrado amarelo)
2. **2 variáveis** - `int tipo = 2; int rotacao = 90;` (Linha ciano gira 90°)
3. **3 variáveis** - `int tipo = 3; int rotacao = 90; int posicao = 150;` (Peça L laranja)

### Como editar os desafios:

Abra `fase1.ts` e encontre o array `challenges[]` (linha ~65):

```typescript
const challenges = [
  {
    piece: PIECES.SQUARE,      // Peça a mostrar
    targetRotation: 0,          // Graus de rotação (0, 90, 180, 270)
    variables: [
      { name: 'tipo', value: 1, label: 'QUADRADO' }
    ]
  },
  // Adicione mais desafios aqui...
];
```

**Peças disponíveis:**
- `PIECES.SQUARE` - Quadrado amarelo (tipo 1)
- `PIECES.LINE` - Linha ciano (tipo 2)
- `PIECES.L_PIECE` - Peça L laranja (tipo 3)
- `PIECES.T_PIECE` - Peça T roxa (tipo 4)

**Exemplo - adicionar novo desafio:**
```typescript
{
  piece: PIECES.T_PIECE,
  targetRotation: 180,
  variables: [
    { name: 'tipo', value: 4, label: 'T' },
    { name: 'rotacao', value: 180, label: '180°' },
    { name: 'velocidade', value: 5, label: '5' }
  ]
}
```

---

## 🎯 FASE 2: CONDICIONAIS - PAC-MAN

**Arquivo:** `fase2.ts`

**Conceito ensinado:** Estruturas condicionais (if/else)

### Como funciona:
- Mostra Pac-Man no centro e uma seta indicando direção
- Painel de variáveis no topo mostra os valores
- Quando o aluno digita o código correto, Pac-Man se move

### Desafios atuais:
1. **IF simples** - `if (direcao == 1) { mover(); }` (vai direita)
2. **IF-ELSE** - `if (velocidade > 5) { rapido(); } else { devagar(); }`
3. **IF-ELSE IF com &&** - Múltiplas condições com operador lógico

### Como editar os desafios:

Abra `fase2.ts` e encontre o array `challenges[]` (linha ~37):

```typescript
const challenges = [
  {
    title: 'if (direcao == 1)',           // Título do desafio
    variables: [
      { name: 'direcao', value: 1, color: COLORS.NEON_GREEN }
    ],
    condition: 'direcao == 1',            // Condição a ser testada
    direction: 1,                         // 1=direita, 2=esquerda, 3=cima, 4=baixo
    speed: 3,                             // Velocidade do movimento
    targetX: 500,                         // Posição X da seta
    targetY: 300,                         // Posição Y da seta
    arrow: '→',                           // Seta visual (→ ← ↑ ↓)
    label: 'DIREITA',                     // Label da direção
    code: 'if (direcao == 1) { mover(); }' // Código de exemplo
  },
  // Adicione mais desafios aqui...
];
```

**Direções disponíveis:**
- `1` = Direita (→)
- `2` = Esquerda (←)
- `3` = Cima (↑)
- `4` = Baixo (↓)

**Exemplo - adicionar novo desafio:**
```typescript
{
  title: 'if (pontos > 100)',
  variables: [
    { name: 'pontos', value: 150, color: COLORS.NEON_CYAN },
    { name: 'direcao', value: 3, color: COLORS.NEON_GREEN }
  ],
  condition: 'pontos > 100',
  direction: 3,
  speed: 5,
  targetX: 300,
  targetY: 150,
  arrow: '↑',
  label: 'CIMA',
  code: 'if (pontos > 100) { subirNivel(); }'
}
```

---

## 🎨 Paleta de Cores

Ambos os jogos usam a mesma paleta neon:

```typescript
const COLORS = {
  DARK_BG: '#0D1117',      // Fundo escuro (terminal)
  NEON_CYAN: '#00d9ff',    // Ciano brilhante
  NEON_YELLOW: '#ffff00',  // Amarelo (Pac-Man, Quadrado)
  NEON_PINK: '#ff006e',    // Rosa (fantasma)
  NEON_RED: '#ff0000',     // Vermelho (erro)
  NEON_GREEN: '#00ff41',   // Verde limão (sucesso)
  NEON_ORANGE: '#ff8800',  // Laranja (peça L)
  NEON_PURPLE: '#bb86fc'   // Roxo (peça T)
};
```

---

## 🛠️ Estrutura Técnica

Cada arquivo de fase exporta 3 funções principais:

### 1. `initGame(props)`
Inicializa o jogo:
- Configura o canvas
- Reseta o estado inicial
- Inicia o loop de animação

```typescript
export function initGame(props: GameProps) {
  ctx = props.canvas.getContext('2d');
  currentFeedback = props.feedback;
  currentChallenge = 0;
  // Reset estado...
  animate(props.canvas);
}
```

### 2. `updateGameProps(props)`
Atualiza quando o aluno responde:
- Recebe feedback (correct/incorrect)
- Inicia animação (rotação/movimento)
- Avança para próximo desafio

```typescript
export function updateGameProps(props) {
  currentFeedback = props.feedback;
  
  if (props.feedback === 'correct') {
    gameState.moving = true;
    // Avançar desafio após 2.5s...
  }
}
```

### 3. `cleanupGame()`
Limpa recursos ao sair:
- Cancela animações
- Reseta variáveis

```typescript
export function cleanupGame() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  currentChallenge = 0;
}
```

---

## ✏️ Como Editar Perguntas

As perguntas ficam em `src/app/components/GamePage.tsx` no objeto `gameData`:

```typescript
const gameData: Record<number, Array<{...}>> = {
  1: [  // FASE 1: Tetris
    {
      id: 1,
      title: 'Variáveis - Desafio 1/3',
      challenge: 'Peça QUADRADO caindo! Declare: int tipo = 1;',
      correctAnswer: 'inttipo=1;',  // SEM ESPAÇOS!
      hint: 'Uma variável: int tipo = 1;'
    },
    // Mais desafios...
  ],
  2: [  // FASE 2: Pac-Man
    // Desafios de condicionais...
  ]
};
```

**IMPORTANTE:** O `correctAnswer` remove todos os espaços antes de comparar!

---

## 🚀 Testando Suas Mudanças

1. Edite o arquivo `.ts` do jogo
2. Salve (Ctrl+S)
3. O navegador recarrega automaticamente
4. Teste o desafio no jogo

---

## 📝 Dicas de Customização

### Adicionar novos tipos de peças Tetris:
```typescript
const PIECES = {
  // Peças existentes...
  Z_PIECE: {
    type: 5,
    name: 'Z',
    color: COLORS.NEON_RED,
    blocks: [[0,0], [1,0], [1,1], [2,1]]
  }
};
```

### Alterar tamanho do Pac-Man:
Em `fase2.ts`, linha ~111:
```typescript
const pacmanSize = 25;  // Altere este valor
```

### Alterar tamanho dos blocos do Tetris:
Em `fase1.ts`, linha ~126:
```typescript
const BLOCK_SIZE = 40;  // Altere este valor
```

### Adicionar fantasmas no Pac-Man:
```typescript
{
  // No desafio...
  showGhost: true,
  ghostX: 200,
  ghostY: 300
}
```

---

## 🎓 Progressão de Dificuldade

**FASE 1 (Tetris):**
- Desafio 1: 1 variável (fácil)
- Desafio 2: 2 variáveis (médio)
- Desafio 3: 3 variáveis (difícil)

**FASE 2 (Pac-Man):**
- Desafio 1: IF simples (fácil)
- Desafio 2: IF-ELSE (médio)
- Desafio 3: IF-ELSE IF com && (difícil)

---

## 🐛 Solução de Problemas

**Jogo não anima quando acerta:**
- Verifique se `currentFeedback` está sendo atualizado em `updateGameProps()`

**Peça não aparece:**
- Verifique se o array `blocks` da peça está correto
- Confirme que `BLOCK_SIZE` não é muito grande

**Pac-Man não se move:**
- Verifique `targetX` e `targetY` do desafio
- Confirme que `speed` é maior que 0

---

**Criado para Code Quest - Plataforma educacional de programação** 🎮

# 🎮 C-Learning Quest - Guia Completo de Edição

Aprenda C através de aventuras gamificadas.

---

## 🚀 COMO RODAR O SERVIDOR

### 1. Instalar Dependências

```bash
# Instalar pnpm (se não tiver)
npm install -g pnpm

# Instalar dependências do projeto
pnpm install
```

### 2. Iniciar Servidor

```bash
pnpm dev
```

✅ Acesse: **http://localhost:5173**

### 3. Parar Servidor

Pressione `Ctrl + C` no terminal

---

## 📝 COMO EDITAR TUDO NO PROJETO

### 🎨 1. CORES E TEMA

**Arquivo**: `src/styles/theme.css`

```css
@theme {
  /* Cores principais */
  --color-primary: #00ff41;        /* Verde neon - Cor principal */
  --color-secondary: #ff006e;      /* Rosa neon - Cor secundária */
  
  /* Cores de fundo */
  --color-background: #0a0a0a;     /* Fundo principal (preto) */
  --color-card: #1a1a1a;           /* Cor dos cards */
  
  /* Cores de texto */
  --color-foreground: #ffffff;     /* Texto principal (branco) */
  
  /* Outras cores das fases */
  --color-phase-1: #00ff41;        /* Verde - Fase 1: Variáveis */
  --color-phase-2: #00d9ff;        /* Azul - Fase 2: Condicionais */
  --color-phase-3: #ff006e;        /* Rosa - Fase 3: Repetição */
  --color-phase-4: #ffd60a;        /* Amarelo - Fase 4: Funções */
}
```

**Como mudar**: Altere os valores hexadecimais (#00ff41) para as cores que quiser.

---

### 📄 2. TEXTOS DA PÁGINA INICIAL (HERO)

**Arquivo**: `src/app/components/Hero.tsx`

```tsx
// LINHA 16-22: Títulos principais
<h1>C-LEARNING</h1>           // ← Edite aqui o título principal
<h2>QUEST</h2>                 // ← Edite aqui o subtítulo

// LINHA 24-26: Descrição
<p>&gt; Aprenda C através da aventura _</p>  // ← Edite aqui a descrição

// LINHA 34: Texto do botão
<span className="text-2xl">START</span>  // ← Edite aqui o texto do botão
```

---

### 🎯 3. FASES DO JOGO (Títulos, Descrições, Cores)

**Arquivo**: `src/app/components/PhaseHub.tsx`

```tsx
// LINHAS 4-37: Array de fases
const phases = [
  {
    id: 1,
    title: 'FASE 1: Variáveis',              // ← Edite o título
    instructor: 'Fernando',                   // ← Edite o nome do instrutor
    icon: Code,                               // ← Troque o ícone (Code, GitBranch, etc)
    color: '#00ff41',                         // ← Edite a cor (hex)
    description: 'Domine os fundamentos...'   // ← Edite a descrição
  },
  // ... outras fases
];
```

**Ícones disponíveis** (importar de `lucide-react`):
- `Code` - Código
- `GitBranch` - Ramificação
- `Repeat` - Repetição
- `FunctionSquare` - Função
- `Database`, `Terminal`, `Cpu`, `Zap`, etc.

**Adicionar nova fase**:
```tsx
{
  id: 5,
  title: 'FASE 5: Ponteiros',
  instructor: 'Seu Nome',
  icon: Pointer,  // Importar: import { Pointer } from 'lucide-react'
  color: '#9d4edd',
  description: 'Domine ponteiros em C'
}
```

**Título da seção**:
```tsx
// LINHA 52: Título principal do hub
<h2>&gt; SELECIONE SUA FASE</h2>  // ← Edite aqui

// LINHA 59: Subtítulo
<p>Escolha um desafio para começar sua jornada</p>  // ← Edite aqui
```

---

### 🎨 4. JOGO CANVAS (Lado Esquerdo)

**⭐ NOVO: Crie seu próprio jogo usando Canvas!**

**Arquivo**: `src/app/components/GameCanvas.tsx`

O jogo aparece do lado esquerdo da tela enquanto o código fica à direita.

**Props disponíveis:**
- `phaseId`: Número da fase (1, 2, 3, 4)
- `isValidated`: true quando código validado
- `feedback`: 'correct' | 'incorrect' | null

**Exemplo básico:**

```tsx
const animate = () => {
  // Limpar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar retângulo
  ctx.fillStyle = '#00ff41';
  ctx.fillRect(100, 100, 200, 200);

  // Desenhar texto
  ctx.font = '30px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Meu Jogo!', 150, 200);
};
```

**📖 Guia completo**: Veja **[COMO_CRIAR_JOGO_CANVAS.md](COMO_CRIAR_JOGO_CANVAS.md)**

---

### 🎮 5. DESAFIOS DE CADA FASE (Sistema Progressivo)

**⭐ NOVIDADE: Cada fase tem 3 DESAFIOS progressivos!**

- ✅ Desafio 1 = 33% de progresso
- ✅ Desafio 2 = 66% de progresso  
- ✅ Desafio 3 = 100% de progresso

**Como funciona:**
1. Usuário valida código do Desafio 1 ✅
2. Avança automaticamente para Desafio 2 (mesma página, mesmo layout)
3. Usuário valida código do Desafio 2 ✅
4. Avança para Desafio 3
5. Usuário valida código do Desafio 3 ✅
6. Fase completa! 🎉

**Layout**: Jogo à esquerda, código à direita (2 colunas)

**Arquivo**: `src/app/components/GamePage.tsx`

```tsx
// LINHAS 25-49: DESAFIOS DA FASE 2 (CONDICIONAIS)
2: [
  {
    id: 1,
    title: 'Condicionais - Desafio 1/3',              // ← Título do desafio
    challenge: 'Escreva um IF que verifica...',       // ← Enunciado
    hint: 'Use: if (condição)',                       // ← Dica
    correctAnswer: 'if(idade>=18)',                   // ← Resposta (SEM espaços!)
  },
  {
    id: 2,
    title: 'Condicionais - Desafio 2/3',              // ← Segundo desafio
    challenge: 'Escreva IF-ELSE...',
    hint: 'Use: if (condição) {} else {}',
    correctAnswer: 'if(numero%2==0){}else{}',
  },
  {
    id: 3,
    title: 'Condicionais - Desafio 3/3',              // ← Terceiro desafio
    challenge: 'Escreva IF-ELSE-IF...',
    hint: 'Use: if (...) {} else if (...) {} else {}',
    correctAnswer: 'if(nota>=90){}elseif(nota>=70){}else{}',
  },
],
```

**IMPORTANTE sobre `correctAnswer`:**
- Remova TODOS os espaços
- Use minúsculas
- Exemplo: `if(x>10)` em vez de `if (x > 10)`

---

### ✏️ EDITAR DESAFIOS DE CADA FASE

**Arquivo**: `src/app/components/GamePage.tsx`

#### FASE 1: VARIÁVEIS (Linhas 11-29)

```tsx
1: [
  {
    id: 1,
    title: 'Variáveis - Desafio 1/3',              // ← Edite
    challenge: 'Declare uma variável int x = 10',  // ← Edite
    hint: 'Use: int nome = valor;',                // ← Edite
    correctAnswer: 'intx=10;',                     // ← Edite (SEM ESPAÇOS!)
  },
  // ... desafios 2 e 3
],
```

#### FASE 2: CONDICIONAIS (Linhas 31-49)

```tsx
2: [
  {
    id: 1,
    title: 'Condicionais - Desafio 1/3',           // ← Edite
    challenge: 'Escreva um IF...',                 // ← Edite
    hint: 'Use: if (condição)',                    // ← Edite
    correctAnswer: 'if(idade>=18)',                // ← Edite (SEM ESPAÇOS!)
  },
  // ... desafios 2 e 3
],
```

#### FASE 3: REPETIÇÃO (Linhas 51-69)

```tsx
3: [
  {
    id: 1,
    title: 'Repetição - Desafio 1/3',              // ← Edite
    challenge: 'Escreva um FOR de 0 até 9',        // ← Edite
    hint: 'Use: for(int i = 0; i < 10; i++)',      // ← Edite
    correctAnswer: 'for(inti=0;i<10;i++)',         // ← Edite (SEM ESPAÇOS!)
  },
  // ... desafios 2 e 3
],
```

#### FASE 4: FUNÇÕES (Linhas 71-89)

```tsx
4: [
  {
    id: 1,
    title: 'Funções - Desafio 1/3',                // ← Edite
    challenge: 'Declare função void imprimir()',   // ← Edite
    hint: 'Use: void nome()',                      // ← Edite
    correctAnswer: 'voidimprimir()',               // ← Edite (SEM ESPAÇOS!)
  },
  // ... desafios 2 e 3
],
```

---

### 🆕 ADICIONAR MAIS DESAFIOS (4, 5, 6...)

Quer 5 desafios em vez de 3? É só adicionar mais!

**Exemplo: Adicionar Desafio 4 na Fase 2:**

```tsx
const phase2Challenges = [
  { id: 1, title: 'Desafio 1...', ... },
  { id: 2, title: 'Desafio 2...', ... },
  { id: 3, title: 'Desafio 3...', ... },
  {                                           // ← NOVO DESAFIO 4
    id: 4,
    title: 'Desafio 4: Operadores Lógicos',
    challenge: 'Escreva IF com && (E lógico)',
    hint: 'Use: if (a > 0 && b > 0)',
    correctAnswer: 'if(a>0&&b>0)',
    videoUrl: '',
    explanation: '&& significa E (ambas condições verdadeiras).',
  },
];
```

**Progresso será recalculado automaticamente:**
- 4 desafios = 25% cada
- 5 desafios = 20% cada
- E assim por diante

---

### 🎮 5. CONTEÚDO DE CADA FASE (Modal de Detalhes)

**Arquivo**: `src/app/components/PhaseModal.tsx`

```tsx
// LINHAS 5-70: Conteúdo de cada fase
const phaseContent = {
  1: {
    title: 'Variáveis em C',               // ← Título da fase
    topics: [                               // ← Lista de tópicos
      'Tipos de dados (int, float, char)',
      'Declaração de variáveis',
      // ... adicione mais tópicos
    ],
    challenges: [                           // ← Desafios
      'Criar um programa que soma dois números',
      'Converter temperaturas',
      // ... adicione mais desafios
    ],
    estimatedTime: '45 minutos',           // ← Tempo estimado
    difficulty: 'Iniciante',               // ← Nível de dificuldade
    videoUrl: '',                          // ← Link do vídeo (YouTube, Vimeo, etc)
  },
  // ... outras fases
};
```

---

### 👥 6. CRÉDITOS

**Arquivo**: `src/app/components/Credits.tsx`

```tsx
// LINHA 9: Título
<h3>CRÉDITOS</h3>  // ← Edite aqui

// LINHAS 15-25: Instrutores
<div>
  <Users className="w-5 h-5" />
  <div>
    <p>Instrutores</p>
    <p>Fernando, Danilo, Bruna</p>  // ← Edite os nomes
  </div>
</div>

// LINHAS 27-37: Desenvolvido com
<div>
  <Code className="w-5 h-5" />
  <div>
    <p>Desenvolvido com</p>
    <p>React + Vite + Tailwind CSS</p>  // ← Edite as tecnologias
  </div>
</div>

// LINHAS 39-49: Ano
<div>
  <Calendar className="w-5 h-5" />
  <div>
    <p>Desenvolvido em</p>
    <p>2026</p>  // ← Edite o ano
  </div>
</div>
```

---

### 🖼️ 7. ADICIONAR IMAGENS

**Para usar imagens no projeto:**

1. **Coloque a imagem** na pasta `public/`:
   ```
   public/
   ├── logo.png
   ├── banner.jpg
   └── avatar.svg
   ```

2. **Use no código**:
   ```tsx
   <img src="/logo.png" alt="Logo" />
   ```

**Exemplo em Hero.tsx**:
```tsx
<img src="/logo.png" alt="C-Learning Logo" className="w-32 h-32 mb-4" />
<h1>C-LEARNING</h1>
```

---

### ✏️ 8. FONTES (Typography)

**Arquivo**: `src/styles/fonts.css`

**Adicionar nova fonte do Google Fonts**:

```css
/* Importar fonte */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* Definir variável */
@theme {
  --font-roboto: 'Roboto', sans-serif;
}
```

**Usar no código**:
```tsx
<h1 style={{ fontFamily: 'var(--font-roboto)' }}>Título</h1>
```

**Fontes atuais do projeto**:
- `--font-pixel`: Press Start 2P (estilo pixel/retro)
- `--font-mono`: Fira Code (código/terminal)
- `--font-code`: Source Code Pro (exemplos de código)

---

## 📂 ESTRUTURA DE ARQUIVOS

```
c-learning-quest/
├── index.html                          # HTML principal
├── package.json                        # Dependências
├── src/
│   ├── main.tsx                       # Entry point
│   ├── app/
│   │   ├── App.tsx                    # Componente raiz
│   │   └── components/
│   │       ├── Hero.tsx               # 🏠 Página inicial
│   │       ├── PhaseHub.tsx           # 🎯 Seletor de fases
│   │       ├── PhaseModal.tsx         # ℹ️  Modal de info da fase
│   │       ├── GamePageMultiChallenge.tsx  # 🎮 DESAFIOS PROGRESSIVOS
│   │       ├── Credits.tsx            # 👥 Créditos
│   │       ├── BackgroundGrid.tsx     # ⚡ Grid animado
│   │       └── ui/                    # 🧩 Componentes UI
│   └── styles/
│       ├── theme.css                  # 🎨 CORES E TEMA
│       ├── fonts.css                  # ✏️  FONTES
│       └── index.css                  # 📄 Estilos base
└── public/                            # 📁 Imagens, vídeos, etc
```

---

## 🛠️ COMANDOS ÚTEIS

```bash
# Rodar servidor de desenvolvimento
pnpm dev

# Criar build para produção
pnpm build

# Visualizar build de produção
pnpm preview

# Limpar cache
pnpm clean
```

---

## 🌐 FAZER DEPLOY (Publicar Online)

### Vercel (Recomendado - Grátis)

1. Instalar Vercel CLI:
```bash
npm i -g vercel
```

2. Fazer deploy:
```bash
vercel
```

3. Seguir instruções no terminal
4. Pronto! Seu site estará online

### Netlify (Arrasta e solta)

1. Criar build:
```bash
pnpm build
```

2. Acessar: https://app.netlify.com/drop

3. Arrastar pasta `dist/` para o site

4. Pronto! Site online

---

## 📝 CHECKLIST DE EDIÇÃO

Use esta lista para personalizar o projeto:

### Textos
- [ ] Título principal (Hero.tsx)
- [ ] Descrição inicial (Hero.tsx)
- [ ] Nomes das fases (PhaseHub.tsx)
- [ ] Descrições das fases (PhaseHub.tsx)
- [ ] Nomes dos instrutores (PhaseHub.tsx)
- [ ] Créditos (Credits.tsx)

### Visual
- [ ] Cores do tema (theme.css)
- [ ] Cores de cada fase (PhaseHub.tsx)
- [ ] Fontes (fonts.css)
- [ ] Logo/imagens (pasta public/)

### Desafios (⭐ NOVO!)
- [ ] Desafios da Fase 1 (GamePage.tsx)
- [ ] Desafios da Fase 2 (GamePage.tsx)
- [ ] Desafios da Fase 3 (GamePage.tsx)
- [ ] Desafios da Fase 4 (GamePage.tsx)
- [ ] Respostas corretas (correctAnswer - SEM espaços!)

---

## 🆘 PROBLEMAS COMUNS

### Servidor não inicia
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Porta 5173 ocupada
```bash
pnpm dev --port 3000
```

### Mudanças não aparecem
1. Salve o arquivo (Ctrl+S)
2. Aguarde o Vite recarregar (automático)
3. Se não funcionar: Ctrl+C e `pnpm dev` novamente

### Validação não funciona
Verifique se `correctAnswer` está:
- SEM espaços
- Em minúsculas
- Sem caracteres especiais extras

---

## 🎯 RESUMO RÁPIDO

**Quero editar...** | **Arquivo**
---|---
Cores | `src/styles/theme.css`
Título/Descrição inicial | `src/app/components/Hero.tsx`
Fases (nomes, cores) | `src/app/components/PhaseHub.tsx`
**JOGO CANVAS (⭐ NOVO!)** | `src/app/components/GameCanvas.tsx`
**DESAFIOS** | `src/app/components/GamePage.tsx`
Info das fases (modal) | `src/app/components/PhaseModal.tsx`
Créditos | `src/app/components/Credits.tsx`
Fontes | `src/styles/fonts.css`
Imagens | pasta `public/`

---

**Versão**: 2.0 (Sistema de Desafios Progressivos)  
**Criado em**: 2026  
**Desenvolvido com**: React + Vite + Tailwind CSS

🎮 **Bom desenvolvimento!**

# 📂 Structure du Projet - TRADE AI ASSISTANT

## Vue complète

```
Trading/
└── trad/                              # Racine du projet
    ├── src/
    │   ├── app/
    │   │   ├── api/
    │   │   │   └── analyze/
    │   │   │       └── route.ts      # ✨ API Route - Analyse IA DeepSeek
    │   │   ├── layout.tsx            # Root layout + Sidebar + Header
    │   │   └── page.tsx              # 🏠 Page d'accueil (Dashboard principal)
    │   │
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Sidebar.tsx       # Navigation latérale
    │   │   │   └── Header.tsx        # Entête avec titre
    │   │   ├── charts/
    │   │   │   └── ChartContainer.tsx # 📊 Canvas OHLC multi-timeframe
    │   │   ├── panels/
    │   │   │   └── AIPanel.tsx       # 🧠 Panneau d'analyse IA
    │   │   ├── selectors/
    │   │   │   └── index.tsx         # 🎯 Asset, Style, Strategy selectors
    │   │   └── AnalyzeButton.tsx     # ⚡ Bouton d'action
    │   │
    │   ├── store/
    │   │   └── index.ts              # 🔄 Zustand store (global state)
    │   │
    │   ├── types/
    │   │   └── index.ts              # 📝 Interfaces TypeScript
    │   │
    │   └── styles/
    │       └── globals.css           # 🎨 Tailwind + CSS custom
    │
    ├── public/                        # Assets statiques
    │
    ├── .env.local                    # 🔐 Variables d'environnement (local, ignored)
    ├── .env.example                  # 📋 Exemple configuration
    ├── .gitignore                    # Git ignore rules
    │
    ├── package.json                  # Dépendances npm
    ├── package-lock.json             # Lock file
    │
    ├── tsconfig.json                 # ⚙️ TypeScript config
    ├── tailwind.config.ts            # 🎨 Tailwind configuration
    ├── next.config.ts                # ⚙️ Next.js configuration
    ├── postcss.config.mjs            # 🎨 PostCSS config
    ├── eslint.config.mjs             # 🔍 ESLint rules
    │
    ├── README.md                     # 📖 Documentation principale
    ├── QUICKSTART.md                 # 🚀 Démarrage rapide
    ├── API_DOCUMENTATION.md          # 🔌 Doc API complète
    ├── ARCHITECTURE.md               # 🏗️ Vue technique
    ├── PROJECT_SUMMARY.md            # 📋 Résumé du projet
    └── this_file                     # 📂 Structure du projet
```

---

## Fichiers Clés par Fonction

### 🚀 Application Entry Points

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts |
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript compiler options |
| `tailwind.config.ts` | Tailwind CSS theme |

### 🎨 UI & Styling

| File | Purpose | Type |
|------|---------|------|
| `layout.tsx` | Root layout wrapper | React |
| `page.tsx` | Homepage dashboard | React |
| `globals.css` | Global styles | CSS |
| `Sidebar.tsx` | Navigation menu | React |
| `Header.tsx` | Top bar | React |

### 📊 Charts & Visualization

| File | Purpose | Details |
|------|---------|---------|
| `ChartContainer.tsx` | Canvas OHLC renderer | Candlestick charts |

### 🧠 AI & Logic

| File | Purpose | Details |
|------|---------|---------|
| `route.ts` | DeepSeek API handler | Processes analysis requests |
| `index.ts (store)` | Zustand store | State management |
| `index.tsx (selectors)` | Input controls | Asset, style, strategy |

### 🔌 Data & Types

| File | Purpose | Content |
|------|---------|---------|
| `index.ts (types)` | TypeScript interfaces | All type definitions |
| `.env.local` | Environment variables | API keys (secret) |
| `.env.example` | Config template | Example values |

---

## Dépendances Clés

```json
{
  "next": "^16.1.6",
  "react": "^19.0.0",
  "typescript": "^5.7.2",
  "tailwindcss": "^3.4.17",
  "zustand": "^5.3.0",
  "axios": "^1.7.7"
}
```

---

## Tailles de Fichiers

| Component | Lines | Size |
|-----------|-------|------|
| `page.tsx` | ~95 | 3.2 KB |
| `AIPanel.tsx` | ~180 | 6.1 KB |
| `route.ts` | ~160 | 5.4 KB |
| `ChartContainer.tsx` | ~140 | 4.8 KB |
| `store/index.ts` | ~90 | 3.1 KB |
| `types/index.ts` | ~90 | 3.2 KB |
| **Total Source** | ~1000 | ~35 KB |

---

## Hiérarchie des Composants React

```
<RootLayout>
  ├─ <Sidebar>
  │  └─ Navigation links
  │
  └─ <main>
     ├─ <Header>
     │  └─ Title + User menu
     │
     └─ <HomePage>
        ├─ <AssetSelector>
        ├─ <StyleSelector>
        ├─ <StrategySelector>
        ├─ <AnalyzeButton>
        │
        ├─ <ChartGrid>
        │  ├─ <ChartContainer timeframe="1H">
        │  ├─ <ChartContainer timeframe="4H">
        │  ├─ <ChartContainer timeframe="1D">
        │  └─ <ChartContainer timeframe="1W">
        │
        ├─ <IndicatorsPanel>
        │  ├─ RSI display
        │  ├─ MACD display
        │  └─ Volume display
        │
        └─ <AIPanel>
           ├─ Recommendation badge
           ├─ Timeframe analysis
           ├─ Key levels
           ├─ Entry points
           ├─ Risk levels
           └─ Rationale
```

---

## Routes & Endpoints

### Client Routes (Pages)
```
GET  /              → HomePage (Dashboard)
GET  /              → 404 page (auto)
```

### API Routes
```
POST /api/analyze   → Trading analysis endpoint
```

---

## Build & Runtime

### Development Mode
```
npm run dev
→ Turbopack hot-reload
→ TypeScript watch
→ http://localhost:3000
```

### Production Build
```
npm run build
→ Compile TypeScript
→ Optimize React
→ Generate static files
→ Ready for deployment
```

---

## Fichiers Ignorés (Git)

```
node_modules/          # Dépendances npm
.next/                 # Build cache
.env.local             # Variables sensibles
*.log                  # Logs
.DS_Store              # macOS
```

---

## Fichiers de Configuration

### TypeScript (`tsconfig.json`)
- Target: ES2017
- Strict mode: enabled
- JSX: react-jsx
- Path alias: @/* → ./src/*

### Tailwind (`tailwind.config.ts`)
- Dark mode: class
- Custom colors: slate-950
- Content: src/**/*.{ts,tsx}

### ESLint (`eslint.config.mjs`)
- Extends: next/core-web-vitals
- Parser: TypeScript

---

## Workflow Typique

```
User opens http://localhost:3000
↓
<RootLayout> loads
↓
Sidebar + Header + HomePage render
↓
Zustand store initializes with defaults
↓
Default asset/style/strategy loaded
↓
Mock chart data generated
↓
Charts rendered (canvas)
↓
Ready for user interaction
↓
User clicks "Analyser"
↓
POST /api/analyze
↓
DeepSeek AI processes
↓
Response received
↓
Store updates
↓
AIPanel re-renders with results
↓
✅ Recommendation displayed
```

---

## Quick File Locations

**Frontend Logic**
- Page: `src/app/page.tsx`
- Components: `src/components/`
- State: `src/store/index.ts`

**Backend Logic**
- API: `src/app/api/analyze/route.ts`

**Configuration**
- Tailwind: `tailwind.config.ts`
- TypeScript: `tsconfig.json`
- Env vars: `.env.local`

**Documentation**
- Main docs: `README.md`
- Quick start: `QUICKSTART.md`
- API docs: `API_DOCUMENTATION.md`
- Architecture: `ARCHITECTURE.md`
- Summary: `PROJECT_SUMMARY.md`

---

**Project Structure v1.0** | Last Updated: 31/01/2026

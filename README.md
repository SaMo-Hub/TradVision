# TRADE AI ASSISTANT 🚀

Dashboard professionnel d'analyse de trading avec IA, utilisant DeepSeek pour des recommandations intelligentes multi-timeframe.

## 🎯 Caractéristiques

- ✅ **Analyse Multi-Timeframe**: 1H, 4H, 1D, 1W, 1M
- ✅ **Graphiques Interactifs**: OHLC avec Volume, RSI, MACD
- ✅ **IA DeepSeek**: Recommandations intelligentes (BUY/SELL/HOLD/NO_TRADE)
- ✅ **Design Moderne**: Tailwind CSS, mode sombre
- ✅ **TypeScript**: Code typé et maintenable
- ✅ **State Management**: Zustand pour la gestion d'état
- ✅ **Responsive**: Optimisé pour desktop
- ✅ **Production-Ready**: Architecture modulaire et scalable

## 🛠️ Stack Technique

| Tech | Version | Usage |
|------|---------|-------|
| Next.js | 14+ | Framework React |
| TypeScript | Latest | Langage typé |
| React | 19+ | UI Components |
| Tailwind CSS | 3+ | Styling moderne |
| Zustand | Latest | State Management |
| Axios | Latest | HTTP Client |
| DeepSeek API | Gratuit | IA Analysis |

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Clé API DeepSeek (gratuite)

### Étapes

1. **Installer les dépendances**
```bash
npm install
```

2. **Configurer la clé API DeepSeek**
- Allez sur https://platform.deepseek.com/
- Générez une clé API gratuite
- Créez un fichier `.env.local` à la racine:
```
DEEPSEEK_API_KEY=sk_your_api_key_here
```

3. **Démarrer le développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📁 Architecture

```
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # Route API DeepSeek
│   ├── layout.tsx                # Root layout avec Sidebar
│   └── page.tsx                  # Page d'accueil
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           # Navigation
│   │   └── Header.tsx            # Entête
│   ├── charts/
│   │   └── ChartContainer.tsx    # Canvas OHLC
│   ├── panels/
│   │   └── AIPanel.tsx           # Panel d'analyse IA
│   ├── selectors/
│   │   └── index.tsx             # Asset, Style, Strategy selectors
│   └── AnalyzeButton.tsx         # Bouton d'action
├── store/
│   └── index.ts                  # Zustand store
├── types/
│   └── index.ts                  # Types TypeScript
├── styles/
│   └── globals.css               # Styles globaux Tailwind
└── utils/                        # Utilitaires (si besoin)
```

## 🚀 Utilisation

### 1. Sélectionner un Actif
- Choisissez parmi les actifs pré-configurés (CAC40, NASDAQ, stocks, etc.)

### 2. Choisir le Style de Trading
- **Swing**: Trades de plusieurs jours
- **Day**: Trades intra-jour
- **Scalp**: Trades rapides (minutes)
- **Position**: Long terme (semaines/mois)

### 3. Sélectionner la Stratégie
- **Trend**: Suivre la tendance
- **Mean Reversion**: Retour à la moyenne
- **Breakout**: Cassures de niveaux
- **Support/Resistance**: Niveaux clés

### 4. Lancer l'Analyse
- Cliquez sur "⚡ Analyser Maintenant"
- L'API DeepSeek analysera les données
- Recevez une recommandation avec score de confiance

### 5. Interpréter les Résultats
- **Recommandation**: BUY 🟢 | SELL 🔴 | HOLD 🟡 | NO_TRADE ⚪
- **Confiance**: Score 0-100%
- **Niveaux Clés**: Support & Résistance
- **Points d'Entrée**: Niveaux précis
- **Stop Loss & Take Profit**: Gestion du risque

## 🔌 API DeepSeek

### Route: `/api/analyze`

**Requête POST:**
```json
{
  "symbol": "SPY",
  "style": "swing",
  "strategy": "trend",
  "chartData": [...]
}
```

**Réponse:**
```json
{
  "recommendation": "BUY",
  "confidenceScore": 78,
  "overallBias": "bullish",
  "entryPoints": [...],
  "stopLoss": 4040,
  "takeProfit": [4070, 4085],
  "riskRewardRatio": 2.5
}
```

## 📝 Commands

```bash
npm run dev      # Développement
npm run build    # Build production
npm run start    # Démarrer production
npm run lint     # Linting
```

---

**TRADE AI ASSISTANT v1.0** | Powered by DeepSeek | Build with ❤️ for Traders

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

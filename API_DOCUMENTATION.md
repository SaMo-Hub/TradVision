# 🔌 Documentation API - TRADE AI ASSISTANT

## Endpoint d'Analyse IA

**POST** `/api/analyze`

Analyse un actif sur plusieurs timeframes et retourne une recommandation IA.

### Request

#### Headers
```
Content-Type: application/json
```

#### Body Schema

```typescript
interface AnalysisRequest {
  symbol: string;              // Symbole de l'actif (ex: "SPY", "AAPL")
  style: TradingStyle;         // "swing" | "day" | "scalp" | "position"
  strategy: TradingStrategy;   // "trend" | "mean_reversion" | "breakout" | "support_resistance"
  chartData: ChartData[];       // Array de données OHLC par timeframe
}

interface ChartData {
  timeframe: Timeframe;        // "1H" | "4H" | "1D" | "1W" | "1M"
  data: OHLC[];                // Array de bougies
  lastUpdated: number;         // Timestamp Unix (ms)
}

interface OHLC {
  time: number;                // Timestamp Unix (seconds)
  open: number;                // Prix d'ouverture
  high: number;                // Plus haut du jour
  low: number;                 // Plus bas du jour
  close: number;               // Prix de clôture
  volume: number;              // Volume de trading
}
```

#### Exemple de Requête

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "SPY",
    "style": "swing",
    "strategy": "trend",
    "chartData": [
      {
        "timeframe": "1H",
        "data": [
          {
            "time": 1704067200,
            "open": 4050.5,
            "high": 4055.2,
            "low": 4045.1,
            "close": 4052.3,
            "volume": 1500000
          }
        ],
        "lastUpdated": 1704067200000
      }
    ]
  }'
```

---

### Response

#### Success (200 OK)

```typescript
interface AIAnalysisResult {
  assetSymbol: string;                    // Symbole analysé
  style: TradingStyle;                    // Style utilisé
  strategy: TradingStrategy;              // Stratégie utilisée
  timestamp: number;                      // Quand l'analyse a été faite (ms)
  
  timeframeAnalysis: TimeframeAnalysis[];  // Détail par timeframe
  overallBias: "bullish" | "bearish" | "neutral";
  recommendation: "BUY" | "SELL" | "HOLD" | "NO_TRADE";
  confidenceScore: number;                // 0-100
  rationale: string;                      // Explication en texte
  
  entryPoints?: {
    level: number;
    reason: string;
  }[];
  
  stopLoss?: number;
  takeProfit?: number[];
  riskRewardRatio?: number;
}

interface TimeframeAnalysis {
  timeframe: Timeframe;
  trend: "bullish" | "bearish" | "neutral";
  strength: "strong" | "moderate" | "weak";
  keyLevels: {
    resistance: number;
    support: number;
  };
  indicators: {
    ma20: number;
    ma50: number;
    ma200: number;
    rsi: number;
    macd: {
      value: number;
      signal: number;
      histogram: number;
    };
  };
}
```

#### Exemple de Réponse

```json
{
  "assetSymbol": "SPY",
  "style": "swing",
  "strategy": "trend",
  "timestamp": 1704067200000,
  "timeframeAnalysis": [
    {
      "timeframe": "1H",
      "trend": "bullish",
      "strength": "strong",
      "keyLevels": {
        "resistance": 4060,
        "support": 4040
      },
      "indicators": {
        "ma20": 4048.5,
        "ma50": 4045.2,
        "ma200": 4035.8,
        "rsi": 65.2,
        "macd": {
          "value": 0.45,
          "signal": 0.38,
          "histogram": 0.07
        }
      }
    }
  ],
  "overallBias": "bullish",
  "recommendation": "BUY",
  "confidenceScore": 78,
  "rationale": "L'actif montre une tendance haussière claire avec RSI à 65, au-dessus des moyennes mobiles. MACD positif en signal d'achat.",
  "entryPoints": [
    {
      "level": 4050,
      "reason": "Support niveau MACD crossover"
    }
  ],
  "stopLoss": 4040,
  "takeProfit": [4070, 4085],
  "riskRewardRatio": 2.5
}
```

---

#### Erreurs

##### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

##### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## 🔐 Authentification

Actuellement: **Aucune** (mode développement)

**À implémenter pour production:**
- Bearer token dans le header `Authorization`
- Rate limiting par utilisateur
- API key validation

---

## 📊 Limites & Quotas

### Free Tier (DeepSeek)
- **Requests par minute**: 10
- **Tokens par mois**: 1,000,000
- **Response time**: <10s

### Rate Limiting (Côté Client)
```typescript
// Exemple avec axios
const instance = axios.create({
  timeout: 30000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error('Rate limited, retry après 60s');
    }
    throw error;
  }
);
```

---

## 💾 Caching

Pour optimiser les coûts API, implémenter un cache:

```typescript
// Exemple avec Redis
const cache = new Redis();

async function analyzeWithCache(request: AnalysisRequest) {
  const cacheKey = `analysis:${request.symbol}:${request.style}:${request.strategy}`;
  
  // Vérifier le cache
  const cached = await cache.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Appeler l'API
  const result = await callDeepSeekAPI(request);
  
  // Mettre en cache pour 5 minutes
  await cache.setex(cacheKey, 300, JSON.stringify(result));
  
  return result;
}
```

---

## 🧪 Testing

### Test avec cURL

```bash
# Analyse simple
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d @request.json

# Avec debug
curl -v -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d @request.json 2>&1 | grep -E "^[<>] "
```

### Test avec JavaScript

```javascript
async function testAPI() {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      symbol: 'SPY',
      style: 'swing',
      strategy: 'trend',
      chartData: [/* ... */]
    })
  });
  
  const data = await response.json();
  console.log(data);
}
```

### Test avec Postman

1. **Créer une nouvelle request**
   - Method: POST
   - URL: `http://localhost:3000/api/analyze`
   - Headers: `Content-Type: application/json`

2. **Body (raw JSON)**
   - Copier l'exemple de requête ci-dessus

3. **Send**

---

## 📈 Webhooks (Future)

```typescript
// À implémenter
interface WebhookRequest {
  url: string;
  events: ('ANALYSIS_COMPLETE' | 'NEW_RECOMMENDATION')[];
  secret: string; // Pour vérifier la signature
}

POST /api/webhooks/subscribe
POST /api/webhooks/unsubscribe
```

---

## 📝 Version API

- **Current**: v1
- **Status**: Beta
- **Last Updated**: 31/01/2026

---

**Documentation API - TRADE AI ASSISTANT**

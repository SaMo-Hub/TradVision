'use client';

import { useState } from 'react';
import TradingViewEmbed from './components/charts/TradingViewEmbed';

const COINS = [
  // Cryptomonnaies - Top 50
  { id: 'bitcoin', sym: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', sym: 'ETH', name: 'Ethereum' },
  { id: 'solana', sym: 'SOL', name: 'Solana' },
  { id: 'binancecoin', sym: 'BNB', name: 'BNB' },
  { id: 'ripple', sym: 'XRP', name: 'Ripple' },
  { id: 'cardano', sym: 'ADA', name: 'Cardano' },
  { id: 'polkadot', sym: 'DOT', name: 'Polkadot' },
  { id: 'dogecoin', sym: 'DOGE', name: 'Dogecoin' },
  { id: 'polygon', sym: 'MATIC', name: 'Polygon' },
  { id: 'avalanche-2', sym: 'AVAX', name: 'Avalanche' },
  { id: 'chainlink', sym: 'LINK', name: 'Chainlink' },
  { id: 'litecoin', sym: 'LTC', name: 'Litecoin' },
  { id: 'uniswap', sym: 'UNI', name: 'Uniswap' },
  { id: 'tron', sym: 'TRX', name: 'TRON' },
  { id: 'cosmos', sym: 'ATOM', name: 'Cosmos' },
  { id: 'bitcoin-cash', sym: 'BCH', name: 'Bitcoin Cash' },
  { id: 'iota', sym: 'IOTA', name: 'IOTA' },
  { id: 'eos', sym: 'EOS', name: 'EOS' },
  { id: 'monero', sym: 'XMR', name: 'Monero' },
  { id: 'stellar', sym: 'XLM', name: 'Stellar' },

  // Indices mondiaux
  { id: 'sp500', sym: '^GSPC', name: 'S&P 500' },
  { id: 'nasdaq', sym: '^IXIC', name: 'NASDAQ' },
  { id: 'djia', sym: '^DJI', name: 'Dow Jones' },
  { id: 'dax', sym: '^GDAXI', name: 'DAX 40 (DE)' },
  { id: 'cac', sym: '^FCHI', name: 'CAC 40 (FR)' },
  { id: 'ftse', sym: '^FTSE', name: 'FTSE 100 (UK)' },
  { id: 'nikkei', sym: '^N225', name: 'Nikkei 225 (JP)' },
  { id: 'hangseng', sym: '^HSI', name: 'Hang Seng (HK)' },
  { id: 'shanghai', sym: '000001', name: 'Shanghai Composite (CN)' },
  { id: 'sensex', sym: '^BSESN', name: 'BSE SENSEX (IN)' },
  { id: 'ibex', sym: '^IBEX', name: 'IBEX 35 (ES)' },
  { id: 'asx', sym: '^AXJO', name: 'ASX 200 (AU)' },
  { id: 'klci', sym: '^KLSE', name: 'KLCI (MY)' },
  { id: 'vix', sym: '^VIX', name: 'VIX (Volatilité)' },
  { id: 'russell2000', sym: '^RUT', name: 'Russell 2000' },

  // Tech/Secteurs
  { id: 'nasdaq100', sym: '^NDX', name: 'NASDAQ 100' },
  { id: 'nq100', sym: 'NQ1!', name: 'E-mini NASDAQ' },
  { id: 'energy', sym: 'XLE', name: 'Secteur Énergie' },
  { id: 'industrials', sym: 'XLI', name: 'Secteur Industriels' },
  { id: 'tech', sym: 'XLK', name: 'Secteur Tech' },

  // Forex - Paires principales
  { id: 'eurusd', sym: 'EURUSD', name: 'EUR/USD' },
  { id: 'gbpusd', sym: 'GBPUSD', name: 'GBP/USD' },
  { id: 'usdjpy', sym: 'USDJPY', name: 'USD/JPY' },
  { id: 'usdchf', sym: 'USDCHF', name: 'USD/CHF' },
  { id: 'audusd', sym: 'AUDUSD', name: 'AUD/USD' },
  { id: 'nzdusd', sym: 'NZDUSD', name: 'NZD/USD' },
  { id: 'usdcad', sym: 'USDCAD', name: 'USD/CAD' },
  { id: 'eurjpy', sym: 'EURJPY', name: 'EUR/JPY' },
  { id: 'gbpjpy', sym: 'GBPJPY', name: 'GBP/JPY' },
  { id: 'eurgbp', sym: 'EURGBP', name: 'EUR/GBP' },

  // Matières premières
  { id: 'gold', sym: 'XAUUSD', name: 'Or (XAU/USD)' },
  { id: 'silver', sym: 'XAGUSD', name: 'Argent (XAG/USD)' },
  { id: 'crude', sym: 'USOIL', name: 'Pétrole Brut WTI' },
  { id: 'brent', sym: 'UKOIL', name: 'Pétrole Brent' },
  { id: 'naturalgas', sym: 'NATGAS', name: 'Gaz Naturel' },
  { id: 'copper', sym: 'COPPER', name: 'Cuivre' },
  { id: 'zinc', sym: 'ZINC', name: 'Zinc' },
  { id: 'wheat', sym: 'WHEAT', name: 'Blé' },
  { id: 'corn', sym: 'CORN', name: 'Maïs' },

  // Obligations et taux
  { id: 'us10y', sym: 'US10Y', name: 'Bon US 10 ans' },
  { id: 'us2y', sym: 'US2Y', name: 'Bon US 2 ans' },
  { id: 'de10y', sym: 'DE10Y', name: 'Bon Allemagne 10Y' },
  { id: 'fr10y', sym: 'FR10Y', name: 'Bon France 10Y' },

  // Actions populaires (US)
  { id: 'aapl', sym: 'AAPL', name: 'Apple' },
  { id: 'msft', sym: 'MSFT', name: 'Microsoft' },
  { id: 'googl', sym: 'GOOGL', name: 'Alphabet (Google)' },
  { id: 'amzn', sym: 'AMZN', name: 'Amazon' },
  { id: 'nvda', sym: 'NVDA', name: 'NVIDIA' },
  { id: 'tsla', sym: 'TSLA', name: 'Tesla' },
  { id: 'meta', sym: 'META', name: 'Meta (Facebook)' },
  { id: 'nflx', sym: 'NFLX', name: 'Netflix' },
  { id: 'amd', sym: 'AMD', name: 'AMD' },
  { id: 'intel', sym: 'INTC', name: 'Intel' },
];

const STRATEGIES = [
  { value: 'scalping', label: 'Scalping (1-15 min)' },
  { value: 'intraday', label: 'Intraday (1h-4h)' },
  { value: 'swing', label: 'Swing Trading' },
  { value: 'breakout', label: 'Breakout / Cassure' },
  { value: 'trend', label: 'Suivi de Tendance' },
];

const STYLES = [
  'Tendance Long Terme',
  'Swing Trading',
  'Scalping',
  'Reversal',
];

export default function Home() {
  const [selectedAsset, setSelectedAsset] = useState('bitcoin');
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [selectedStrategy, setSelectedStrategy] = useState('scalping');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  // Formatte le prix avec la bonne précision selon l'actif
  const formatPrice = (price: number): string => {
    // Forex (paires) et matières premières: 4-5 décimales
    if (price < 1000 && price > 0) {
      if (price < 10) return price.toFixed(5); // EURUSD: 1.15704
      if (price < 100) return price.toFixed(4); // Gold: 2450.50
      return price.toFixed(2); // Indices
    }
    return price.toFixed(2); // Crypto et actions
  };

  // Récupérer les vraies données OHLC pour l'analyse
  const fetchRealChartData = async (asset: string): Promise<any[]> => {
    try {
      const coinId = COINS.find(c => c.id === asset)?.id || 'bitcoin';
      const res = await fetch(`/api/market-data?symbol=${coinId}&timeframe=1H`);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur API: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Vérifier que nous avons des vraies données
      if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
        throw new Error('Pas de données de marché disponibles pour cet actif');
      }
      
      return data.data;
    } catch (err) {
      throw err;
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    
    try {
      const coin = COINS.find(c => c.id === selectedAsset);
      
      // Récupérer les vraies données de prix
      let chartData: any[];
      try {
        chartData = await fetchRealChartData(selectedAsset);
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Impossible de récupérer les données du marché');
      }
      
      // S'assurer que nous avons des données
      if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
        throw new Error('Pas de données réelles disponibles - pas d\'analyse possible');
      }
      
      // Utiliser les dernières 24 barres pour l'analyse
      const analysisData = chartData.slice(-24).map((candle: any) => ({
        open: Number(candle.open),
        high: Number(candle.high),
        low: Number(candle.low),
        close: Number(candle.close),
        volume: Number(candle.volume),
      }));

      // Extraire le prix actuel (close de la dernière bougie)
      const lastCandle = chartData[chartData.length - 1];
      const price = Number(lastCandle?.close || 0);
      setCurrentPrice(price);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: coin?.sym,
          style: selectedStyle,
          strategy: selectedStrategy,
          chartData: analysisData,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'analyse');
      }
      
      setAnalysisResult(result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur inconnue';
      setAnalysisError(errorMsg);
      console.error('Error analyzing:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentCoin = COINS.find(c => c.id === selectedAsset);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="logo">
          Trade<span>Vision</span>
        </div>
        <div className="live-dot"></div>
        <span className="live-label">LIVE</span>

        <div className="analysis-bar">
          <span className="bar-label">Analyser</span>

          {/* Sélecteur Actif */}
          <select value={selectedAsset} onChange={e => setSelectedAsset(e.target.value)}>
            {COINS.map(coin => (
              <option key={coin.id} value={coin.id}>
                {coin.sym} — {coin.name}
              </option>
            ))}
          </select>

          <div className="divider"></div>

          {/* Sélecteur Style */}
          <select value={selectedStyle} onChange={e => setSelectedStyle(e.target.value)}>
            {STYLES.map(style => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          <div className="divider"></div>

          {/* Sélecteur Stratégie */}
          <select value={selectedStrategy} onChange={e => setSelectedStrategy(e.target.value)}>
            {STRATEGIES.map(strat => (
              <option key={strat.value} value={strat.value}>
                {strat.label}
              </option>
            ))}
          </select>

          <div className="divider"></div>

          {/* Bouton Analyser */}
          <button
            className={`btn-analyse ${isAnalyzing ? 'loading' : ''}`}
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            <div className="spin"></div>
            <span>⚡ Analyser Maintenant</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">
        {/* CHART PANEL */}
        <div className="chart-panel">
          <div className="chart-header">
            <div>
              <div className="asset-name">{currentCoin?.sym}/USD</div>
              <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--muted)' }}>
                {currentCoin?.name}
              </div>
            </div>
          </div>

          <div className="chart-area">
            <TradingViewEmbed symbol={currentCoin?.sym || 'BTC'} height={420} />
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="side-panel">
          <div className="panel-title">Analyse IA</div>
          <div className="analysis-panel">
            {analysisError ? (
              <div className="analysis-error">
                <div className="error-icon">⚠️</div>
                <p className="error-message">{analysisError}</p>
                <small style={{ color: 'var(--muted)', marginTop: '12px', display: 'block' }}>
                  Les données du marché ne sont pas disponibles. Veuillez vérifier votre connexion à Finnhub ou la validité du symbole.
                </small>
              </div>
            ) : !analysisResult ? (
              <div className="analysis-empty">
                <div className="icon-big">◈</div>
                <p>Choisissez un actif et une stratégie, puis cliquez sur <strong>⚡ Analyser Maintenant</strong>.</p>
              </div>
            ) : (
              <div>
                <span className={`signal-badge ${analysisResult.recommendation === 'BUY' ? 'long' : analysisResult.recommendation === 'SELL' ? 'short' : 'neutral'}`}>
                  <span className="signal-dot"></span>
                  {analysisResult.recommendation === 'BUY' ? '▲ LONG' : analysisResult.recommendation === 'SELL' ? '▼ SHORT' : '◆ NEUTRE'}
                </span>
                
                {/* PRIX ACTUEL */}
                {currentPrice !== null && (
                  <div className="price-display">
                    <div className="price-label">Prix Actuel</div>
                    <div className="price-value">${formatPrice(currentPrice)}</div>
                  </div>
                )}

                <div className="analysis-title">{analysisResult.rationale}</div>
                <div className="analysis-text">{analysisResult.overallBias}</div>

                <div className="levels-grid">
                  <div className="level-card">
                    <div className="level-label">Confiance</div>
                    <div className="level-val" style={{ color: 'var(--accent2)' }}>
                      {analysisResult.confidenceScore}%
                    </div>
                  </div>
                  <div className="level-card">
                    <div className="level-label">Bias</div>
                    <div className="level-val">{analysisResult.overallBias}</div>
                  </div>
                </div>

                {/* STOP LOSS Et TAKE PROFIT */}
                {(analysisResult.stopLoss || (analysisResult.takeProfit && analysisResult.takeProfit.length > 0)) && (
                  <div className="tp-sl-section">
                    {analysisResult.stopLoss && (
                      <div className="sl-card">
                        <div className="sl-label">🛑 STOP LOSS</div>
                        <div className="sl-value">${formatPrice(analysisResult.stopLoss)}</div>
                        {currentPrice && (
                          <div className="sl-distance">
                            {((analysisResult.stopLoss - currentPrice) / currentPrice * 100).toFixed(2)}%
                          </div>
                        )}
                      </div>
                    )}
                    
                    {analysisResult.takeProfit && analysisResult.takeProfit.length > 0 && (
                      <div className="tp-cards">
                        {analysisResult.takeProfit.map((tp: number, idx: number) => (
                          <div key={idx} className="tp-card">
                            <div className="tp-label">🎯 TP {idx + 1}</div>
                            <div className="tp-value">${formatPrice(tp)}</div>
                            {currentPrice && (
                              <div className="tp-distance">
                                +{((tp - currentPrice) / currentPrice * 100).toFixed(2)}%
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="disclaimer">
                  ⚠ Analyse IA · Pas un conseil financier · Trading = risque de perte
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Asset types
export type TradingStyle = 'swing' | 'day' | 'scalp' | 'position';
export type TradingStrategy = 'trend' | 'mean_reversion' | 'breakout' | 'support_resistance';
export type Timeframe = '1H' | '4H' | '1D' | '1W' | '1M';
export type Recommendation = 'BUY' | 'SELL' | 'HOLD' | 'NO_TRADE';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  category: 'index' | 'stock' | 'crypto';
}

export interface OHLC {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartData {
  symbol: string;
  timeframe: Timeframe;
  data: OHLC[];
  lastUpdated?: number;
}

export interface Indicator {
  ma20: number;
  ma50: number;
  ma200: number;
  rsi: number;
  macd: {
    value: number;
    signal: number;
    histogram: number;
  };
}

export interface TimeframeAnalysis {
  timeframe: Timeframe;
  trend: 'bullish' | 'bearish' | 'neutral';
  strength: 'strong' | 'moderate' | 'weak';
  keyLevels: {
    resistance: number;
    support: number;
  };
  indicators: Indicator;
}

export interface AIAnalysisResult {
  assetSymbol: string;
  style: TradingStyle | string;
  strategy: TradingStrategy | string;
  timestamp: number;
  timeframeAnalysis: TimeframeAnalysis[];
  overallBias: 'bullish' | 'bearish' | 'neutral';
  recommendation: Recommendation;
  confidenceScore: number;
  rationale: string;
  entryPoints?: {
    level: number;
    reason: string;
  }[];
  stopLoss?: number;
  takeProfit?: number[];
  riskRewardRatio?: number;
}

export interface AnalysisRequest {
  symbol: string;
  style: TradingStyle | string;
  strategy: TradingStrategy | string;
  chartData: OHLC[];
}

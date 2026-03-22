import { NextRequest, NextResponse } from 'next/server';

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Mapping symboles: ID CoinGecko + le symbole du widget -> symbole Finnhub
function getFinnhubSymbol(symbol: string): string | null {
  const mappings: Record<string, string> = {
    // Actions US
    'aapl': 'AAPL',
    'msft': 'MSFT',
    'googl': 'GOOGL',
    'amzn': 'AMZN',
    'nvda': 'NVDA',
    'tsla': 'TSLA',
    'meta': 'META',
    'nflx': 'NFLX',
    'amd': 'AMD',
    'intel': 'INTC',
    // Indices
    'sp500': '^GSPC',
    'nasdaq': '^IXIC',
    'djia': '^DJI',
    'dax': '^GDAXI',
    'cac': '^FCHI',
    'ftse': '^FTSE',
  };
  return mappings[symbol.toLowerCase()] || null;
}

// Mapping pour forex vers Alpha Vantage
function getAlphaVantageForexSymbol(symbol: string): string | null {
  const mappings: Record<string, string> = {
    'eurusd': 'EUR/USD',
    'gbpusd': 'GBP/USD',
    'usdjpy': 'USD/JPY',
    'usdchf': 'USD/CHF',
    'audusd': 'AUD/USD',
    'nzdusd': 'NZD/USD',
    'usdcad': 'USD/CAD',
  };
  return mappings[symbol.toLowerCase()] || null;
}

// Mapping pour CoinGecko (fallback pour crypto)
function getCoinGeckoId(symbol: string): string | null {
  const mappings: Record<string, string> = {
    'bitcoin': 'bitcoin',
    'ethereum': 'ethereum',
    'solana': 'solana',
    'binancecoin': 'binancecoin',
    'ripple': 'ripple',
    'cardano': 'cardano',
    'polkadot': 'polkadot',
    'dogecoin': 'dogecoin',
    'polygon': 'polygon',
    'avalanche-2': 'avalanche-2',
  };
  return mappings[symbol.toLowerCase()] || null;
}

// Convertir timeframe en résolution pour Finnhub
function mapTimeframeToResolution(tf: string | null): string {
  if (!tf) return 'D';
  const t = tf.toLowerCase();
  if (t === '5m') return '5';
  if (t === '10m') return '10';
  if (t === '15m') return '15';
  if (t === '30m') return '30';
  if (t === '40m') return '60';
  if (t === '1h' || t === '60m') return '60';
  if (t === '4h') return 'D';
  if (t === '1d') return 'D';
  if (t === '1w') return 'W';
  if (t === '1m') return 'M';
  return 'D';
}

// Fallback CoinGecko pour crypto
async function fetchFromCoinGecko(coinId: string, days: number) {
  const cgRes = await fetch(
    `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(coinId)}/market_chart?vs_currency=usd&days=${days}`
  );

  if (!cgRes.ok) {
    const txt = await cgRes.text();
    throw new Error('CoinGecko API error: ' + txt);
  }

  const json = await cgRes.json();
  const prices: [number, number][] = json.prices || [];
  const volumes: [number, number][] = json.total_volumes || [];

  const data = prices.map((p, i) => {
    const timeMs = p[0];
    const price = p[1];
    const vol = volumes[i]?.[1] ?? 0;
    const ts = Math.floor(timeMs / 1000);
    return {
      time: ts,
      open: price,
      high: price,
      low: price,
      close: price,
      volume: vol,
    };
  });

  return data;
}

function mapTimeframeToDays(tf: string | null) {
  if (!tf) return 30;
  const t = tf.toLowerCase();
  if (['5m', '10m', '40m', '1h', '2h', '4h'].includes(t)) return 1;
  if (t === '1d') return 7;
  if (t === '1w') return 30;
  if (t === '1m') return 90;
  return 30;
}

// Fallback Alpha Vantage pour forex
async function fetchFromAlphaVantageForex(pair: string) {
  if (!ALPHA_VANTAGE_API_KEY) {
    throw new Error('ALPHA_VANTAGE_API_KEY not configured');
  }

  // Alpha Vantage utilise FX_DAILY pour les données historiques forex
  const url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${pair.split('/')[0]}&to_symbol=${pair.split('/')[1]}&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('AlphaVantage API error: ' + res.status);
  }

  const json = await res.json();

  // Vérifier les erreurs de l'API
  if (json['Error Message'] || json['Note']) {
    throw new Error('AlphaVantage error: ' + (json['Error Message'] || json['Note']));
  }

  const timeSeries = json['Time Series FX (Daily)'];
  if (!timeSeries || Object.keys(timeSeries).length === 0) {
    throw new Error('No forex data available');
  }

  // Convertir les données du format AlphaVantage
  const data = Object.entries(timeSeries)
    .slice(0, 30) // Prenez les 30 derniers jours
    .map(([date, values]: [string, any]) => {
      const ts = Math.floor(new Date(date).getTime() / 1000);
      return {
        time: ts,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: 0, // Forex n'a pas de volume
      };
    })
    .reverse(); // Chronologique croissant

  return data;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const symbol = url.searchParams.get('symbol');
    const timeframe = url.searchParams.get('timeframe') || '1D';

    if (!symbol) {
      return NextResponse.json({ error: 'symbol query param required' }, { status: 400 });
    }

    // Essayer Finnhub en premier pour les actions/indices
    const finnhubSymbol = getFinnhubSymbol(symbol);
    
    if (finnhubSymbol && FINNHUB_API_KEY) {
      try {
        const resolution = mapTimeframeToResolution(timeframe);
        const finnhubUrl = `${FINNHUB_BASE_URL}/stock/candle?symbol=${finnhubSymbol}&resolution=${resolution}&from=${Math.floor(Date.now() / 1000) - 86400 * 60}&to=${Math.floor(Date.now() / 1000)}&token=${FINNHUB_API_KEY}`;

        console.log('Finnhub request:', finnhubUrl.replace(FINNHUB_API_KEY, 'XXX'));

        const finnhubRes = await fetch(finnhubUrl);
        const finnhubData = await finnhubRes.json();

        console.log('Finnhub response:', finnhubData);

        if (finnhubRes.ok && finnhubData.o && Array.isArray(finnhubData.o) && finnhubData.o.length > 0) {
          const data = finnhubData.o.map((open: number, index: number) => ({
            time: finnhubData.t[index],
            open: open,
            high: finnhubData.h[index],
            low: finnhubData.l[index],
            close: finnhubData.c[index],
            volume: finnhubData.v?.[index] ?? 0,
          }));

          return NextResponse.json({ symbol, timeframe, data, source: 'finnhub' });
        } else if (!finnhubRes.ok) {
          throw new Error(`Finnhub HTTP ${finnhubRes.status}: ${finnhubData.error || 'Unknown error'}`);
        } else if (!finnhubData.o || finnhubData.o.length === 0) {
          throw new Error(`Finnhub returned no data for ${finnhubSymbol} with resolution ${resolution}`);
        }
      } catch (e) {
        const errMsg = e instanceof Error ? e.message : String(e);
        console.error('Finnhub error:', errMsg);
        
        // Si c'est un stock/indice Finnhub et la clé est valide, afficher l'erreur Finnhub
        return NextResponse.json(
          { error: `Finnhub API error for ${finnhubSymbol}: ${errMsg}` },
          { status: 400 }
        );
      }
    }

    // Fallback: CoinGecko pour crypto
    const coinGeckoId = getCoinGeckoId(symbol);
    if (coinGeckoId) {
      try {
        const days = mapTimeframeToDays(timeframe);
        const data = await fetchFromCoinGecko(coinGeckoId, days);

        if (!data || data.length === 0) {
          return NextResponse.json(
            { error: 'No real market data available for this symbol' },
            { status: 404 }
          );
        }

        return NextResponse.json({ symbol, timeframe, data, source: 'coingecko' });
      } catch (e) {
        console.error('CoinGecko error:', e);
      }
    }

    // Fallback: Alpha Vantage pour Forex
    const forexPair = getAlphaVantageForexSymbol(symbol);
    if (forexPair) {
      try {
        const data = await fetchFromAlphaVantageForex(forexPair);

        if (!data || data.length === 0) {
          return NextResponse.json(
            { error: 'No real market data available for this forex pair' },
            { status: 404 }
          );
        }

        return NextResponse.json({ symbol, timeframe, data, source: 'alphavantage-forex' });
      } catch (e) {
        console.error('AlphaVantage Forex error:', e);
        return NextResponse.json(
          { error: 'AlphaVantage API error (5 calls/min limit): ' + (e instanceof Error ? e.message : '') },
          { status: 429 }
        );
      }
    }

    // Message d'erreur descriptif basé sur le symbole
    let errorMsg = `Symbol '${symbol}' not supported. `;
    if (getFinnhubSymbol(symbol)) {
      errorMsg += 'This symbol requires a valid Finnhub API key. ';
    }
    
    const supportedStocks = ['aapl', 'msft', 'googl', 'amzn', 'nvda', 'tsla', 'meta', 'nflx', 'amd', 'intel'];
    const supportedIndices = ['sp500', 'nasdaq', 'djia', 'dax', 'cac', 'ftse'];
    const supportedCrypto = ['bitcoin', 'ethereum', 'solana', 'binancecoin', 'ripple', 'cardano', 'polkadot', 'dogecoin', 'polygon', 'avalanche-2'];
    const supportedForex = ['eurusd', 'gbpusd', 'usdjpy', 'usdchf', 'audusd', 'nzdusd', 'usdcad'];
    
    errorMsg += `Supported: Stocks (${supportedStocks.join(', ')}), Indices (${supportedIndices.join(', ')}), Crypto (${supportedCrypto.join(', ')}), Forex (${supportedForex.join(', ')})`;

    return NextResponse.json(
      { error: errorMsg },
      { status: 400 }
    );
  } catch (error) {
    console.error('Market data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch real market data: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

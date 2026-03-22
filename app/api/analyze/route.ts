import { NextRequest, NextResponse } from 'next/server';
import { AIAnalysisResult, AnalysisRequest, Recommendation } from '../../types';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

function buildAnalysisPrompt(request: AnalysisRequest): string {
  const { symbol, style, strategy, chartData } = request;

  // chartData est désormais un simple array de candlesticks OHLC
  if (!Array.isArray(chartData) || chartData.length === 0) {
    throw new Error('Invalid chart data');
  }

  // Construire un résumé des données de prix
  const latest = chartData[chartData.length - 1];
  const previous = chartData.length > 1 ? chartData[chartData.length - 2] : latest;
  const currentPrice = latest.close;
  
  const dataContext = `
Données du marché (1H):
- Prix actuel (close): ${currentPrice}
- Ouverture: ${latest.open}
- Plus haut: ${latest.high}
- Plus bas: ${latest.low}
- Volume: ${latest.volume}
- Prix précédent: ${previous.close}
- Nombre de bougies analysées: ${chartData.length}
`;

  return `Tu es un analyste trading professionnel avec 15 années d'expérience. Analyse l'actif ${symbol} avec les paramètres suivants:

🎯 Style de Trading: ${style}
📊 Stratégie: ${strategy}

📈 Données de Marché:
${dataContext}

Fournisse une analyse structurée en JSON VALIDE avec les champs OBLIGATOIRES:
{
  "timeframeAnalysis": [
    {
      "timeframe": "1H",
      "trend": "bullish|bearish|neutral",
      "strength": "strong|moderate|weak",
      "analysis": "Analyse brève"
    }
  ],
  "overallBias": "bullish|bearish|neutral",
  "recommendation": "BUY|SELL|HOLD|NO_TRADE",
  "confidenceScore": nombre entre 0-100,
  "rationale": "Explication de la recommandation",
  "keyLevels": {
    "resistance": nombre,
    "support": nombre
  },
  "entryPoints": [{"level": nombre, "reason": "explication"}],
  "stopLoss": nombre (pour le risque) ou null,
  "takeProfit": [nombre1, nombre2] (au minimum 1 ou 2 niveaux TP),
  "riskRewardRatio": nombre ou null
}

⚠️ IMPORTANT:
- TOUJOURS fournir des TP et SL même si la recommandation est NO_TRADE
- Les TP doivent être au-dessus du prix actuel (${currentPrice})
- Le SL doit être en-dessous du prix actuel (${currentPrice}) s'il y a une position
- Si NO_TRADE: fournir quand même des TP/SL pour les niveaux clés à surveiller
- Ne JAMAIS répondre avec du texte ou des explications longues, UNIQUEMENT du JSON valide

💡 Fournis TOUJOURS une réponse JSON valide et complète.`;
}

function parseDeepSeekResponse(content: string): Partial<AIAnalysisResult> {
  try {
    // Extraire le JSON de la réponse
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Valider et nettoyer la réponse
    const validRecommendations: Recommendation[] = [
      'BUY',
      'SELL',
      'HOLD',
      'NO_TRADE',
    ];
    const recommendation = validRecommendations.includes(parsed.recommendation)
      ? parsed.recommendation
      : 'NO_TRADE';

    return {
      timeframeAnalysis: parsed.timeframeAnalysis || [],
      overallBias: parsed.overallBias || 'neutral',
      recommendation,
      confidenceScore: Math.min(100, Math.max(0, parsed.confidenceScore || 50)),
      rationale: parsed.rationale || 'Analyse complétée.',
      entryPoints: parsed.entryPoints || [],
      stopLoss: parsed.stopLoss,
      takeProfit: parsed.takeProfit || [],
      riskRewardRatio: parsed.riskRewardRatio,
    };
  } catch (error) {
    console.error('Error parsing DeepSeek response:', error);
    return {
      recommendation: 'NO_TRADE',
      confidenceScore: 0,
      rationale: 'Erreur lors du parsing de la réponse IA.',
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OPENROUTER_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const body: AnalysisRequest = await request.json();

    // Valider les données d'entrée
    if (!body.symbol || !body.style || !body.strategy || !body.chartData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ⚠️ VALIDATION CRITIQUE: Vérifier que les données viennent d'une source réelle
    if (!body.chartData || body.chartData.length === 0) {
      return NextResponse.json(
        { error: 'No chart data provided - cannot analyze without real market data' },
        { status: 400 }
      );
    }

    // S'assurer que les données ont la structure OHLC correcte
    const validData = body.chartData.every(
      (candle: any) =>
        typeof candle.open === 'number' &&
        typeof candle.high === 'number' &&
        typeof candle.low === 'number' &&
        typeof candle.close === 'number' &&
        typeof candle.volume === 'number'
    );

    if (!validData) {
      return NextResponse.json(
        {
          error:
            'Invalid chart data structure - each candle must have open, high, low, close, volume as numbers',
        },
        { status: 400 }
      );
    }

    const prompt = buildAnalysisPrompt(body);

    // Appeler l'API OpenRouter
    const openrouterResponse = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          {
            role: 'system',
            content:
              'Tu es un analyste trading expert. Fournis des analyses précises et structurées.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!openrouterResponse.ok) {
      const error = await openrouterResponse.text();
      console.error('OpenRouter API error:', error);
      return NextResponse.json(
        { error: 'OpenRouter API error - analysis unavailable' },
        { status: openrouterResponse.status }
      );
    }

    const openrouterData = await openrouterResponse.json();
    const aiContent = openrouterData.choices?.[0]?.message?.content;

    if (!aiContent) {
      return NextResponse.json(
        { error: 'No content from AI - analysis failed' },
        { status: 500 }
      );
    }

    // Parser la réponse et construire le résultat final
    const aiParsed = parseDeepSeekResponse(aiContent);

    const result: AIAnalysisResult = {
      assetSymbol: body.symbol,
      style: body.style,
      strategy: body.strategy,
      timestamp: Date.now(),
      timeframeAnalysis: aiParsed.timeframeAnalysis || [],
      overallBias: aiParsed.overallBias || 'neutral',
      recommendation: aiParsed.recommendation || 'NO_TRADE',
      confidenceScore: aiParsed.confidenceScore || 50,
      rationale: aiParsed.rationale || '',
      entryPoints: aiParsed.entryPoints,
      stopLoss: aiParsed.stopLoss,
      takeProfit: aiParsed.takeProfit,
      riskRewardRatio: aiParsed.riskRewardRatio,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analyze API error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Internal server error - analysis cannot proceed without real data',
      },
      { status: 500 }
    );
  }
}

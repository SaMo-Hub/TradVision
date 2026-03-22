import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const ids = url.searchParams.get('ids') || '';

    if (!ids) {
      return NextResponse.json({ error: 'ids query param required' }, { status: 400 });
    }

    const cgRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(
        ids
      )}&price_change_percentage=24h`
    );

    if (!cgRes.ok) {
      const txt = await cgRes.text();
      return NextResponse.json({ error: 'CoinGecko error', detail: txt }, { status: cgRes.status });
    }

    const data = await cgRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

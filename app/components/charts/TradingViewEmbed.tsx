"use client";

import { useEffect, useRef } from "react";

interface TradingViewEmbedProps {
  symbol?: string;
  interval?: string;
  height?: number;
}

export default function TradingViewEmbed({ symbol = "BTC", interval = "60",  }: TradingViewEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Déterminer le symbole TradingView adapté
  const getTradingViewSymbol = (sym: string): string => {
    const s = String(sym).toUpperCase();
    
    // Indices boursiers (contiennent ^ ou sont des indices connus)
    if (s.includes("^") || ["GSPC", "IXIC", "DJI", "GDAXI", "FCHI", "FTSE", "N225", "HSI", "BSESN", "IBEX", "AXJO", "KLSE", "VIX", "RUT", "NDX"].includes(s)) {
      return s;
    }
    
    // Forex (contiennent les patterns de paires)
    if (s.includes("USD") || s.includes("EUR") || s.includes("GBP") || s.includes("JPY") || s.includes("CHF") || s.includes("AUD") || s.includes("NZD") || s.includes("CAD")) {
      return s;
    }
    
    // Matières premières
    if (["XAUUSD", "XAGUUSD", "USOIL", "UKOIL", "NATGAS", "COPPER", "ZINC", "WHEAT", "CORN"].includes(s)) {
      return s;
    }
    
    // Obligations et taux
    if (["US10Y", "US2Y", "DE10Y", "FR10Y"].includes(s)) {
      return s;
    }
    
    // Actions (symboles ticker US standards)
    if (/^[A-Z]{1,5}$/.test(s) && ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA", "META", "NFLX", "AMD", "INTC", "XLE", "XLI", "XLK"].includes(s)) {
      return s;
    }
    
    // Cryptos: ajouter COINBASE et USD
    if (["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOT", "DOGE", "MATIC", "AVAX", "LINK", "LTC", "UNI", "TRX", "ATOM", "BCH", "IOTA", "EOS", "XMR", "XLM"].includes(s)) {
      return `COINBASE:${s}USD`;
    }
    
    // Par défaut (assume c'est une crypto ou ticker standard)
    if (s.length <= 6) {
      return `COINBASE:${s}USD`;
    }
    
    return s;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous widget
    container.innerHTML = "";

    const loadWidget = () => {
      try {
        const tvSymbol = getTradingViewSymbol(symbol || "BTC");
        const config = {
          container_id: container.id,
          autosize: true,
          symbol: tvSymbol,
          interval: interval,
          timezone: "Europe/Paris",
          theme: "dark",
          style: "1",
          locale: "fr",
          toolbar_bg: "#101318",
          enable_publishing: false,
          allow_symbol_change: true,
          hideideas: true,
        } as any;

        // @ts-ignore
        if ((window as any).TradingView) {
          // @ts-ignore
          new (window as any).TradingView.widget(config);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("TradingView widget init error:", err);
      }
    };

    if ((window as any).TradingView) {
      loadWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => loadWidget();
      document.head.appendChild(script);

      return () => {
        // keep script (cached), but clear container on unmount
        if (container) container.innerHTML = "";
      };
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [symbol, interval]);

  const id = `tv-widget-${String(symbol).toLowerCase().replace(/\^/g, "")}`;
  return <div id={id} ref={containerRef} style={{ width: "100%", height: `100%` }} />;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeVision — Crypto Live",
  description: "Dashboard d'analyse trading crypto en temps réel avec IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        {/* Chart.js removed — using lightweight-charts via npm instead */}
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

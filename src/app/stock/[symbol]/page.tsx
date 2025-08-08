import { Metadata } from "next";
import StockPageContent from "../../../components/StockPage";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const capitalizedSymbol = params.symbol.toUpperCase();

  return {
    title: `${capitalizedSymbol} Stock Details | Stock Ticker App`,
    description: `Live chart, price updates, and historical data for ${capitalizedSymbol}.`,
    keywords: [
      `${capitalizedSymbol}`,
      "stock chart",
      "NSE",
      "BSE",
      "market data",
    ],
    openGraph: {
      title: `${capitalizedSymbol} - Live Stock Price`,
      description: `See real-time and intraday charts for ${capitalizedSymbol}.`,
      url: `https://stock-ticker-pi.vercel.app/stock/${capitalizedSymbol}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${capitalizedSymbol} - Live Price & Chart`,
    },
    alternates: {
      canonical: `https://stock-ticker-pi.vercel.app/stock/${capitalizedSymbol}`,
    },
  };
}

export default function StockPage({ params }: any) {
  return <StockPageContent symbol={params.symbol} />;
}

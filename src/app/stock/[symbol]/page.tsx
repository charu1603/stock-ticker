import StockPageContent from "./StockPage";
import { Metadata } from "next";

export type Props = {
  params: {
    symbol: string;
  };
};

export async function generateMetadata({ params }: { params: { symbol: string } }): Promise<Metadata> {
  const symbol = params.symbol.toUpperCase();

  return {
    title: `${symbol} Stock Details | Stock Ticker App`,
    description: `Live chart, price updates, and historical data for ${symbol}.`,
    keywords: [`${symbol}`, "stock chart", "NSE", "BSE", "market data"],
    openGraph: {
      title: `${symbol} - Live Stock Price`,
      description: `See real-time and intraday charts for ${symbol}.`,
      url: `https://yourdomain.com/stock/${symbol}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${symbol} - Live Price & Chart`,
    },
    alternates: {
      canonical: `https://yourdomain.com/stock/${symbol}`,
    },
  };
}

export default function StockPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol;
  return <StockPageContent symbol={symbol} />;
}

import { Metadata } from "next";
import StockPageContent from "../../../components/StockPage";
import axios from "axios";
interface Params {
  params: { symbol: string };
}
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

export default async function StockPage({ params }: Params) {
  const symbol = params.symbol || "";

  let companyName = symbol;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/assignment/search?keyword=${symbol}&length=1`
    );

    if (res.data && res.data.length > 0) {
      companyName = res.data[0].company;
      console.log(companyName)
    }
  } catch (error) {
   
  }

  return <StockPageContent symbol={symbol} name={companyName} />;
}

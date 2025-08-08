import HomePage from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Ticker App | Live NSE/BSE Prices",
  description: "Track live stock prices, view interactive charts and search for stock data using our modern interface.",
  keywords: ["stocks", "live market", "NSE", "BSE", "finance", "charts"],
  openGraph: {
    title: "Stock Ticker App",     
    description: "Track live prices and view interactive charts of Indian stocks.",
    url: "https://stock-ticker-pi.vercel.app/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stock Ticker Chart",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Stock Prices | Stock Ticker App",
    description: "Track stock prices and visualize charts in real-time.",
    site: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://stock-ticker-pi.vercel.app/",
  },
};

export default function Home() {
  return <HomePage />;
}

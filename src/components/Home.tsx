"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

interface Stock {
  symbol: string;
  per_change: number;
}

const HomePage = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await axios.get(
         `${process.env.NEXT_PUBLIC_API_HOST}/api/index/constitients/NIFTY/?ascending=false&by=per_change&page=1&per_page=25`
        );

        if (res.data && res.data.results) {
          setStocks(res.data.results);
        } else {
          setError("No stock data found.");
        }
      } catch (err) {
        setError("Failed to fetch stock data.");
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>


      <div className="w-full bg-gray-100 py-2 overflow-hidden border-b border-gray-300">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="ticker whitespace-nowrap will-change-transform animate-marquee">
            {stocks.concat(stocks).map((stock, index) => (
              <span
                key={index}
                className={`inline-block px-6 ${
                  stock.per_change >= 0 ? "text-green-600" : "text-red-600"
                } font-semibold`}
              >
                {stock.symbol}: {stock.per_change.toFixed(2)}%
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-20 pb-16 sm:pt-24 sm:pb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Track stocks with
            <span className="block text-blue-600 mt-2">precision</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-12">
            Get real-time stock data, comprehensive analytics, and market
            insights. Search any stock symbol to dive deep into performance
            metrics.
          </p>

          <div className="max-w-lg mx-auto mb-12">
            <SearchBar />
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-16">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Data
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Real-time Updates
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              Global Markets
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;

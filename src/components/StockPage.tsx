"use client";

import axios from "axios";
import StockChart from "@/components/StockChart";
import { useEffect, useState } from "react";
import { PriceData, Metrics,Props  } from "@/types/type";


const StockPageContent = ({ symbol }: Props) => {
  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoriteStocks") || "[]");
    setIsFavorite(favs.includes(symbol));
  }, [symbol]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favoriteStocks") || "[]");
    let updatedFavs;
    if (favs.includes(symbol)) {
      updatedFavs = favs.filter((s: string) => s !== symbol);
    } else {
      updatedFavs = [...favs, symbol];
    }
    localStorage.setItem("favoriteStocks", JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/assignment/stock/${symbol}/prices?days=1&type=INTRADAY&limit=100`
        );

        const rawData: PriceData[] = res.data;

        if (!rawData || rawData.length === 0) {
          setError("No data available.");
          return;
        }

        setData(rawData);

        const lastPrice = rawData[rawData.length - 1]?.close || 0;
        const firstPrice = rawData[0]?.open || 1;
        const changePercent = (
          ((lastPrice - firstPrice) / firstPrice) *
          100
        ).toFixed(2);

        setMetrics({
          currentPrice: lastPrice,
          changePercent: parseFloat(changePercent),
        });
      } catch (err) {
        setError("Error loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading)
    return (
      <div className="p-6 text-gray-500 flex justify-center items-center h-screen">
        Loading {symbol} data...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-red-500 flex justify-center items-center h-screen">
        {error}
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">{symbol} Stock Overview</h1>
          <p className="text-gray-600 text-sm">Intraday performance & analytics</p>
        </div>
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded cursor-pointer ${
            isFavorite ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="text-xl font-bold">₹{metrics?.currentPrice.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">Change %</p>
          <p
            className={`text-xl font-bold ${
              metrics!.changePercent >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {metrics?.changePercent}%
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow w-full">
        <h2 className="text-lg font-semibold mb-4">Intraday Chart</h2>
        <StockChart data={data} />
      </div>
    </div>
  );
};

export default StockPageContent;

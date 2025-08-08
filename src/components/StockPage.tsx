"use client";

import axios from "axios";
import StockChart from "@/components/StockChart";
import { useEffect, useState } from "react";

type Props = {
  symbol: string;
};

type PriceData = {
  open: number;
  high: number;
  close: number;
  low: number;
  date: string;
  volume: number;
  value: number;
  change: number;
  percent: number;
  prev_close: number;
};

type Metrics = {
  currentPrice: number;
  changePercent: number;
  high52w: number;
  low52w: number;
  peRatio: number;
  marketCap: string;
};

const StockPageContent = ({ symbol }: Props) => {
  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<Metrics | null>(null);

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
          high52w: lastPrice * 1.2, // Mocked
          low52w: lastPrice * 0.8, // Mocked
          peRatio: 24.5, // Mocked
          marketCap: "₹1.5T", // Mocked
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
    return <div className="p-6 text-gray-500">Loading {symbol} data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">{symbol} Stock Overview</h1>
        <p className="text-gray-600 text-sm">
          Intraday performance & analytics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="text-xl font-bold">
            ₹{metrics?.currentPrice.toFixed(2)}
          </p>
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
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">52W High</p>
          <p className="text-xl font-bold">₹{metrics?.high52w.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">52W Low</p>
          <p className="text-xl font-bold">₹{metrics?.low52w.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">P/E Ratio</p>
          <p className="text-xl font-bold">{metrics?.peRatio}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-gray-500">Market Cap</p>
          <p className="text-xl font-bold">{metrics?.marketCap}</p>
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

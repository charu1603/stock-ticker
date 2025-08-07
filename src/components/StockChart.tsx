"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

export interface StockData {
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
}

interface Props {
  data: StockData[];
}

export default function StockChart({ data }: Props) {
  if (!data || data.length === 0)
    return <p className="text-center text-gray-500">No data available</p>;

  const sorted = data
    .filter((item) => item?.date)
    .sort((a, b) => {
      const aDate = new Date(a.date.replace(" ", "T"));
      const bDate = new Date(b.date.replace(" ", "T"));
      return aDate.getTime() - bDate.getTime();
    });

  const chartData = sorted.map((point) => {
    const dateStr = point.date.replace(" ", "T");
    const dateObj = new Date(dateStr);

    const time = !isNaN(dateObj.getTime())
      ? format(dateObj, "HH:mm")
      : "Invalid";

    return {
      time,
      price: point.close,
    };
  });

  if (sorted.length > 0) {
    const firstDataPoint = sorted[0];
    const firstDate = new Date(firstDataPoint.date.replace(" ", "T"));
    const firstTime = !isNaN(firstDate.getTime())
      ? format(firstDate, "HH:mm")
      : "Invalid";

    if (chartData.length > 0 && chartData[0].time !== firstTime) {
      chartData.unshift({
        time: firstTime,
        price: firstDataPoint.open,
      });
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-lg">
          <p className="text-sm font-medium text-gray-500">{`Time: ${label}`}</p>
          <p className="text-lg font-bold text-gray-800">{`Price: ₹${payload[0].value.toFixed(
            2
          )}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg p-4 shadow-xl border border-gray-100">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="time"
            stroke="#555"
            tick={{ fill: "#555", fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={["auto", "auto"]}
            stroke="#555"
            tick={{ fill: "#555", fontSize: 12 }}
            tickFormatter={(value) => `₹${value.toFixed(0)}`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#999", strokeDasharray: "3 3" }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            fill="url(#colorPrice)"
            fillOpacity={0.8}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

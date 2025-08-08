"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { StockResult } from "@/types/type";


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const handler = setTimeout(() => {
      const fetchStocks = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/assignment/search?keyword=${query}&length=10`
          );
          setResults(res.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        }
      };
      fetchStocks();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleSelect = (symbol: string) => {
    router.push(`/stock/${symbol}`);
    setResults([]);
    setQuery("");
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative max-w-md mx-auto mt-6">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          placeholder="Search stocks..."
        />

        {query.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 10.586l4.95-4.95a1 1 0 011.414 1.414L13.414 12l4.95 4.95a1 1 0 01-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 01-1.414-1.414L10.586 12 5.636 7.05a1 1 0 011.414-1.414L12 10.586z" />
            </svg>
          </button>
        )}
      </div>
      {results.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-200 rounded-lg z-10 mt-2 shadow-lg max-h-60 overflow-y-auto">
          {results.map((stock) => (
            <li
              key={stock.symbol}
              className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleSelect(stock.symbol)}
            >
              <span className="font-semibold">{stock.name}</span>{" "}
              <span className="text-gray-500">({stock.symbol})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

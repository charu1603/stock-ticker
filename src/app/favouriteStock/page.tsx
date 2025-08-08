"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoriteStocks") || "[]");
    setFavorites(favs);
  }, []);

  const handleClick = (symbol: string) => {
    router.push(`/stock/${symbol}`);
  };

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No favorite stocks yet. Go to a stock page and click "Add to Favorites".
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Favorite Stocks</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((symbol) => (
          <li
            key={symbol}
            onClick={() => handleClick(symbol)}
            className="cursor-pointer flex justify-between bg-white shadow rounded p-4 hover:bg-blue-50 transition"
          >
            <span className="font-semibold text-blue-600">{symbol}</span>
            <span>See details</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;

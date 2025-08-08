export type StockResult = {
  name: string;
  symbol: string;
};
export type Props = {
  symbol: string;
};

export type PriceData = {
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

export type Metrics = {
  currentPrice: number;
  changePercent: number;
};
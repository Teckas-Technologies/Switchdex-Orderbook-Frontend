import BigNumber from "bignumber.js";

export type MarketId = string;

export interface MarketFilterCustomStepRule {
  limit: string;
  step: string;
}

export interface MarketFilterCustomStep {
  type: string;
  rules: MarketFilterCustomStepRule[];
}

export interface MarketFilterSignificantDigit {
  type: string;
  digits: number;
}

export type MarketFilter = MarketFilterSignificantDigit | MarketFilterCustomStep;

export interface Market {
  id: MarketId;
  assetIdArray: string[];
  name: string;
  base_unit: string;
  quote_unit: string;
  min_price: BigNumber;
  max_price: BigNumber;
  min_amount: BigNumber;
  amount_precision: number;
  price_precision: number;
  state?: string;
  filters?: MarketFilter[];
  tokenTickerName?: string;
  base_ticker: string;
  quote_ticker: string;
}

export interface Ticker {
  timestamp: number;
  high: string;
  low: string;
  last: string;
  previous_close: string;
  price_change_percent: string;
  volume?: string;
  average: string;
}

export interface TickerEvent {
  amount: string;
  name: string;
  base_unit: string;
  quote_unit: string;
  low: string;
  high: string;
  open: number;
  last: string;
  avg_price: string;
  price_change_percent: string;
  volume: string;
  at: number;
}

export interface MarketPriceInterface {
  price: string;
  created_at: string;
  updated_at: string;
}

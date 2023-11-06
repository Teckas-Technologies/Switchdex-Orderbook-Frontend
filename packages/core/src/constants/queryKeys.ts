import { Maybe } from "@orderbook/core/helpers";

const PREFIX = "@orderbook";
export const QUERY_KEYS = {
  blockchainTransfers: (id: Maybe<string>) => [
    PREFIX,
    "blockchainTransfers",
    id,
  ],
  assets: () => [PREFIX, "assets"],
  markets: (assets: string) => [PREFIX, "markets", assets],
  tickers: () => [PREFIX, "tickers"],
  recentTrades: (market: string) => [PREFIX, "recentTrades", market],
  orderBook: (market: string) => [PREFIX, "orderbook", market],
  miniGraph: (market: string) => [PREFIX, `mini-graph-${market}`],
  tradeHistory: (dateFrom: Date, dateTo: Date, tradeAddress: string) => [
    PREFIX,
    "tradeHistory",
    dateFrom,
    dateTo,
    tradeAddress,
  ],
  orderHistory: (dateFrom: Date, dateTo: Date, tradeAddress: string) => [
    PREFIX,
    "orderHistory",
    dateFrom,
    dateTo,
    tradeAddress,
  ],
  openOrders: (tradeAddress: string) => [PREFIX, "openOrders", tradeAddress],
  tradingBalances: (mainAddress: string) => [
    PREFIX,
    "tradingBalances",
    mainAddress,
  ],
  onChainBalances: (accountId: string, ids: string[]) => [
    PREFIX,
    "onChainBalances",
    accountId.toString(),
    ...ids,
  ],
  transactions: (mainAddress: string) => [PREFIX, "transactions", mainAddress],
};
/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UserActionInput = {
  payload: string,
};

export type Channel = {
  __typename: "Channel",
  name: string,
  data: string,
};

export type Orderbook = {
  __typename: "Orderbook",
  items?:  Array<SetPriceLevel | null > | null,
  nextToken?: string | null,
};

export type SetPriceLevel = {
  __typename: "SetPriceLevel",
  p: string,
  q: string,
  s?: OrderSide | null,
  stid: string,
};

export enum OrderSide {
  Bid = "Bid",
  Ask = "Ask",
}


export type KlinesConnection = {
  __typename: "KlinesConnection",
  items?:  Array<CandleStick | null > | null,
};

export type CandleStick = {
  __typename: "CandleStick",
  o: string,
  c: string,
  h: string,
  l: string,
  vb: string,
  vq: string,
  t: string,
};

export type AssetsConnection = {
  __typename: "AssetsConnection",
  items?:  Array<Asset | null > | null,
  nextToken?: string | null,
};

export type Asset = {
  __typename: "Asset",
  symbol: string,
  name: string,
  withdrawal_fee: string,
  asset_id: string,
};

export type RecentTradesConnection = {
  __typename: "RecentTradesConnection",
  items?:  Array<RawTrade | null > | null,
  nextToken?: string | null,
};

export type RawTrade = {
  __typename: "RawTrade",
  m?: string | null,
  t: string,
  p: string,
  q: string,
  stid: number,
  t_id?: string | null,
  m_id?: string | null,
  isReverted?: boolean | null,
};

export type TickersConnection = {
  __typename: "TickersConnection",
  items?: TickerStats | null,
  nextToken?: string | null,
};

export type TickerStats = {
  __typename: "TickerStats",
  o: string,
  c: string,
  h: string,
  l: string,
  vb: string,
  vq: string,
};

export type MarketsConnection = {
  __typename: "MarketsConnection",
  items?:  Array<Market | null > | null,
};

export type Market = {
  __typename: "Market",
  market: string,
  max_order_price: string,
  min_order_price: string,
  min_order_qty: string,
  max_order_qty: string,
  price_tick_size: string,
  qty_step_size: string,
  base_asset_precision: string,
  quote_asset_precision: string,
};

export type ProxyConnection = {
  __typename: "ProxyConnection",
  items?:  Array<ProxyConnectionItem | null > | null,
  nextToken?: string | null,
};

export type ProxyConnectionItem = {
  __typename: "ProxyConnectionItem",
  hash_key?: string | null,
  range_key?: string | null,
  stid?: string | null,
};

export type User = {
  __typename: "User",
  proxies?: Array< string | null > | null,
};

export type Balance = {
  __typename: "Balance",
  a: string,
  f: string,
  r: string,
  p: string,
};

export type BalanceConnection = {
  __typename: "BalanceConnection",
  items?:  Array<Balance | null > | null,
  nextToken?: string | null,
};

export type Order = {
  __typename: "Order",
  u: string,
  cid: string,
  id: string,
  t: string,
  m: string,
  s: string,
  ot: string,
  st: string,
  p: string,
  q: string,
  afp: string,
  fq: string,
  fee: string,
  stid: string,
  isReverted?: boolean | null,
};

export type OrdersConnection = {
  __typename: "OrdersConnection",
  items?:  Array<Order | null > | null,
  nextToken?: string | null,
};

export type TransactionsConnection = {
  __typename: "TransactionsConnection",
  items?:  Array<Transaction | null > | null,
  nextToken?: string | null,
};

export type Transaction = {
  __typename: "Transaction",
  tt: string,
  a: string,
  q: string,
  fee: string,
  st: string,
  t: string,
  stid: string,
  snapshot_id?: string | null,
  isReverted?: boolean | null,
};

export type TradesConnection = {
  __typename: "TradesConnection",
  items?:  Array<Trade | null > | null,
  nextToken?: string | null,
};

export type Trade = {
  __typename: "Trade",
  m: string,
  p: string,
  q: string,
  s: string,
  t: string,
  stid: string,
  t_id?: string | null,
  m_id?: string | null,
  isReverted?: boolean | null,
};

export type MainAddressConnection = {
  __typename: "MainAddressConnection",
  hash_key?: string | null,
  range_key?: string | null,
  accounts?: Array< string | null > | null,
};

export type Register_userMutationVariables = {
  input: UserActionInput,
};

export type Register_userMutation = {
  register_user?: string | null,
};

export type Place_orderMutationVariables = {
  input: UserActionInput,
};

export type Place_orderMutation = {
  place_order?: string | null,
};

export type Cancel_orderMutationVariables = {
  input: UserActionInput,
};

export type Cancel_orderMutation = {
  cancel_order?: string | null,
};

export type WithdrawMutationVariables = {
  input: UserActionInput,
};

export type WithdrawMutation = {
  withdraw?: string | null,
};

export type PublishMutationVariables = {
  name: string,
  data: string,
};

export type PublishMutation = {
  publish?:  {
    __typename: "Channel",
    name: string,
    data: string,
  } | null,
};

export type GetTimeQuery = {
  // Get Enclave time
  getTime: string,
};

export type GetOrderbookQueryVariables = {
  market: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetOrderbookQuery = {
  // Get orderbook
  getOrderbook?:  {
    __typename: "Orderbook",
    items?:  Array< {
      __typename: "SetPriceLevel",
      p: string,
      q: string,
      s?: OrderSide | null,
      stid: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetKlinesbyMarketIntervalQueryVariables = {
  market: string,
  interval: string,
  from: string,
  to: string,
};

export type GetKlinesbyMarketIntervalQuery = {
  // Get Klines
  getKlinesbyMarketInterval?:  {
    __typename: "KlinesConnection",
    items?:  Array< {
      __typename: "CandleStick",
      o: string,
      c: string,
      h: string,
      l: string,
      vb: string,
      vq: string,
      t: string,
    } | null > | null,
  } | null,
};

export type GetAllAssetsQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type GetAllAssetsQuery = {
  // Gets all assets available in Orderbook
  getAllAssets?:  {
    __typename: "AssetsConnection",
    items?:  Array< {
      __typename: "Asset",
      symbol: string,
      name: string,
      withdrawal_fee: string,
      asset_id: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetRecentTradesQueryVariables = {
  m: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetRecentTradesQuery = {
  // Gets recent trades
  getRecentTrades?:  {
    __typename: "RecentTradesConnection",
    items?:  Array< {
      __typename: "RawTrade",
      m?: string | null,
      t: string,
      p: string,
      q: string,
      stid: number,
      t_id?: string | null,
      m_id?: string | null,
      isReverted?: boolean | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMarketTickersQueryVariables = {
  market: string,
  from: string,
  to: string,
};

export type GetMarketTickersQuery = {
  // Get all market tickers
  getMarketTickers?:  {
    __typename: "TickersConnection",
    items?:  {
      __typename: "TickerStats",
      o: string,
      c: string,
      h: string,
      l: string,
      vb: string,
      vq: string,
    } | null,
    nextToken?: string | null,
  } | null,
};

export type GetAllMarketsQuery = {
  // Get all active market configs
  getAllMarkets?:  {
    __typename: "MarketsConnection",
    items?:  Array< {
      __typename: "Market",
      market: string,
      max_order_price: string,
      min_order_price: string,
      min_order_qty: string,
      max_order_qty: string,
      price_tick_size: string,
      qty_step_size: string,
      base_asset_precision: string,
      quote_asset_precision: string,
    } | null > | null,
  } | null,
};

export type FindUserByProxyAccountQueryVariables = {
  proxy_account: string,
};

export type FindUserByProxyAccountQuery = {
  // Finds User by proxy account
  findUserByProxyAccount?:  {
    __typename: "ProxyConnection",
    items?:  Array< {
      __typename: "ProxyConnectionItem",
      hash_key?: string | null,
      range_key?: string | null,
      stid?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type FindUserByMainAccountQueryVariables = {
  main_account: string,
};

export type FindUserByMainAccountQuery = {
  // Finds User by main account
  findUserByMainAccount?:  {
    __typename: "User",
    proxies?: Array< string | null > | null,
  } | null,
};

export type FindBalanceByMainAccountQueryVariables = {
  main_account: string,
  asset: string,
};

export type FindBalanceByMainAccountQuery = {
  // Find Asset Balance by Main Account
  findBalanceByMainAccount?:  {
    __typename: "Balance",
    a: string,
    f: string,
    r: string,
    p: string,
  } | null,
};

export type GetAllBalancesByMainAccountQueryVariables = {
  main_account: string,
};

export type GetAllBalancesByMainAccountQuery = {
  // Get all Asset Balances by Main Account
  getAllBalancesByMainAccount?:  {
    __typename: "BalanceConnection",
    items?:  Array< {
      __typename: "Balance",
      a: string,
      f: string,
      r: string,
      p: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type FindOrderByMainAccountQueryVariables = {
  main_account: string,
  order_id: string,
  market: string,
};

export type FindOrderByMainAccountQuery = {
  // Find Order by Main Account
  findOrderByMainAccount?:  {
    __typename: "Order",
    u: string,
    cid: string,
    id: string,
    t: string,
    m: string,
    s: string,
    ot: string,
    st: string,
    p: string,
    q: string,
    afp: string,
    fq: string,
    fee: string,
    stid: string,
    isReverted?: boolean | null,
  } | null,
};

export type ListOrderHistorybyMainAccountQueryVariables = {
  main_account: string,
  from: string,
  to: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrderHistorybyMainAccountQuery = {
  // Get Order history based on time
  listOrderHistorybyMainAccount?:  {
    __typename: "OrdersConnection",
    items?:  Array< {
      __typename: "Order",
      u: string,
      cid: string,
      id: string,
      t: string,
      m: string,
      s: string,
      ot: string,
      st: string,
      p: string,
      q: string,
      afp: string,
      fq: string,
      fee: string,
      stid: string,
      isReverted?: boolean | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListOpenOrdersByMainAccountQueryVariables = {
  main_account: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOpenOrdersByMainAccountQuery = {
  // List open orders
  listOpenOrdersByMainAccount?:  {
    __typename: "OrdersConnection",
    items?:  Array< {
      __typename: "Order",
      u: string,
      cid: string,
      id: string,
      t: string,
      m: string,
      s: string,
      ot: string,
      st: string,
      p: string,
      q: string,
      afp: string,
      fq: string,
      fee: string,
      stid: string,
      isReverted?: boolean | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListTransactionsByMainAccountQueryVariables = {
  main_account: string,
  from: string,
  to: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsByMainAccountQuery = {
  // List transactions
  listTransactionsByMainAccount?:  {
    __typename: "TransactionsConnection",
    items?:  Array< {
      __typename: "Transaction",
      tt: string,
      a: string,
      q: string,
      fee: string,
      st: string,
      t: string,
      stid: string,
      snapshot_id?: string | null,
      isReverted?: boolean | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListTradesByMainAccountQueryVariables = {
  main_account: string,
  from: string,
  to: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTradesByMainAccountQuery = {
  // List trades
  listTradesByMainAccount?:  {
    __typename: "TradesConnection",
    items?:  Array< {
      __typename: "Trade",
      m: string,
      p: string,
      q: string,
      s: string,
      t: string,
      stid: string,
      t_id?: string | null,
      m_id?: string | null,
      isReverted?: boolean | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListMainAccountsByEmailQueryVariables = {
  email: string,
};

export type ListMainAccountsByEmailQuery = {
  listMainAccountsByEmail?:  {
    __typename: "MainAddressConnection",
    hash_key?: string | null,
    range_key?: string | null,
    accounts?: Array< string | null > | null,
  } | null,
};

export type Websocket_streamsSubscriptionVariables = {
  name: string,
};

export type Websocket_streamsSubscription = {
  // General Trade streams
  websocket_streams?:  {
    __typename: "Channel",
    name: string,
    data: string,
  } | null,
};
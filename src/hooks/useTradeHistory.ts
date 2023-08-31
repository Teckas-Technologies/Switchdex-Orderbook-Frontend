import { useEffect, useMemo, useState } from "react";

import { useMarketsProvider } from "../providers/public/marketsProvider/useMarketsProvider";
import { useSessionProvider } from "../providers/user/sessionProvider/useSessionProvider";

import { Ifilters } from "@polkadex/orderbook-ui/organisms";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useTrades } from "@polkadex/orderbook/providers/user/trades";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider";

export function useTradeHistory(filters: Ifilters) {
  const { selectGetAsset } = useAssetsProvider();
  const profileState = useProfile();
  const { selectedAccount } = profileState;
  const tradesState = useTrades();
  const { onFetchTrades } = tradesState;

  const list = tradesState.data;
  const listSorted = useMemo(() => {
    return list.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [list]);
  const fetching = tradesState.loading;
  const { currentMarket } = useMarketsProvider();
  const userLoggedIn = profileState.selectedAccount.tradeAddress !== "";
  const { dateFrom, dateTo } = useSessionProvider();

  const [updatedTradeList, setUpdatedTradeList] = useState(listSorted);

  useEffect(() => {
    if (tradesState.data.length || tradesState.tradeHistoryNextToken) return;
    if (userLoggedIn && currentMarket && selectedAccount.tradeAddress)
      onFetchTrades({
        dateFrom,
        dateTo,
        tradeAddress: selectedAccount.tradeAddress,
        tradeHistoryFetchToken: null,
      });
  }, [
    userLoggedIn,
    currentMarket,
    onFetchTrades,
    dateFrom,
    dateTo,
    selectedAccount.tradeAddress,
    tradesState.data.length,
    tradesState.tradeHistoryNextToken,
  ]);

  // TODO: Refactor filter process. Should do it on server rather than client
  useEffect(() => {
    const { dateFrom, dateTo } = filters;

    let tradeHistoryList = list;
    if (filters?.onlyBuy) {
      tradeHistoryList = list.filter((data) => data.side?.toUpperCase() === "BID");
    } else if (filters?.onlySell) {
      tradeHistoryList = list.filter((data) => data.side.toUpperCase() === "ASK");
    }

    if (filters?.hiddenPairs) {
      tradeHistoryList = tradeHistoryList.filter((trade) => {
        const baseUnit = selectGetAsset(trade.baseAsset).symbol;
        const quoteUnit = selectGetAsset(trade.quoteAsset).symbol;
        const market = currentMarket?.name;
        const marketForTrade = `${baseUnit}/${quoteUnit}`;
        return market === marketForTrade && trade;
      });
    }

    // Filter by range
    if (dateFrom && dateTo) {
      tradeHistoryList = tradeHistoryList.filter((order) => {
        return new Date(order.timestamp) >= dateFrom && new Date(order.timestamp) <= dateTo;
      });
    }

    setUpdatedTradeList(tradeHistoryList);
  }, [filters, list, currentMarket?.name, selectGetAsset]);

  return {
    trades: updatedTradeList,
    priceFixed: currentMarket?.quote_precision,
    amountFixed: currentMarket?.base_precision,
    userLoggedIn,
    isLoading: fetching,
    tradeHistoryNextToken: tradesState.tradeHistoryNextToken,
    onFetchTrades,
    error: tradesState.error,
  };
}

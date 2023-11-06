import { useEffect, useMemo, useState } from "react";
import { Ifilters } from "@orderbook/core/providers/types";
import { useMarketsProvider } from "@orderbook/core/providers/public/marketsProvider";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useTrades } from "@orderbook/core/providers/user/trades";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";

import { decimalPlaces } from "../helpers";
import { MIN_DIGITS_AFTER_DECIMAL } from "../constants";

export function useTradeHistory(filters: Ifilters) {
  const { selectGetAsset } = useAssetsProvider();
  const profileState = useProfile();
  const tradesState = useTrades();
  const { onFetchNextPage } = tradesState;

  const list = tradesState.data;
  const listSorted = useMemo(() => {
    return list.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [list]);
  const fetching = tradesState.loading;
  const { currentMarket } = useMarketsProvider();
  const userLoggedIn = profileState.selectedAccount.tradeAddress !== "";

  const [updatedTradeList, setUpdatedTradeList] = useState(listSorted);

  // TODO: Refactor filter process. Should do it on server rather than client
  useEffect(() => {
    let tradeHistoryList = list.filter((item) => !item.isReverted);

    if (filters?.showReverted) {
      tradeHistoryList = list.filter((item) => item.isReverted);
    }

    if (filters?.onlyBuy) {
      tradeHistoryList = tradeHistoryList.filter(
        (data) => data.side?.toUpperCase() === "BID"
      );
    } else if (filters?.onlySell) {
      tradeHistoryList = tradeHistoryList.filter(
        (data) => data.side.toUpperCase() === "ASK"
      );
    }

    if (filters?.hiddenPairs) {
      tradeHistoryList = tradeHistoryList.filter((trade) => {
        const baseUnit = selectGetAsset(trade.baseAsset)?.symbol || "";
        const quoteUnit = selectGetAsset(trade.quoteAsset)?.symbol || "";
        const market = currentMarket?.name;
        const marketForTrade = `${baseUnit}/${quoteUnit}`;
        return market === marketForTrade && trade;
      });
    }

    setUpdatedTradeList(tradeHistoryList);
  }, [filters, list, currentMarket?.name, selectGetAsset]);

  const priceFixed = currentMarket
    ? decimalPlaces(currentMarket.price_tick_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  const amountFixed = currentMarket
    ? decimalPlaces(currentMarket.qty_step_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  return {
    trades: updatedTradeList,
    priceFixed,
    amountFixed,
    userLoggedIn,
    isLoading: fetching,
    hasNextPage: tradesState.hasNextPage,
    error: tradesState.error,
    onFetchNextPage,
  };
}
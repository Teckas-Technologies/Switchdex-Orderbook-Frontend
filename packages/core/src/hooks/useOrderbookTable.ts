import { MutableRefObject, useCallback, useEffect } from "react";
import {
  mapValues,
  accumulateVolume,
  calcMaxVolume,
} from "@orderbook/core/helpers";
import { OrderBookState } from "@orderbook/core/providers/public/orderBook";
import { useOrders } from "@orderbook/core/providers/user/orders";
import { useOrderbookData, useMarketsData } from "@orderbook/core/hooks";

export type Props = {
  isSell?: boolean;
  orders: OrderBookState["depth"]["bids"];
  contentRef?: MutableRefObject<HTMLDivElement> | null;
  market: string;
};

export function useOrderbookTable({
  orders,
  isSell,
  contentRef,
  market,
}: Props) {
  const orderBookState = useOrderbookData(market);
  const { currentPrice, onSetCurrentPrice, onSetCurrentAmount } = useOrders();

  const bids = orderBookState.depth.bids;
  const asks = orderBookState.depth.asks;
  const { currentMarket } = useMarketsData(market);

  /**
   * @description -Get Volume of the orders
   */
  const cumulativeVolume = isSell
    ? accumulateVolume(orders.slice(0).reverse()).slice(0).reverse()
    : accumulateVolume(orders);

  /**
   * @description Change market price
   *
   * @param {number} index - Market ask/bid index
   * @param {string} side - Market side (asks/bids)
   * @returns {void} Dispatch setCurrentPrice action
   */
  const changeMarketPrice = useCallback(
    (index: number, side: "asks" | "bids"): void => {
      const arr = side === "asks" ? asks : bids;
      const priceToSet = arr[index] && Number(arr[index][0]);
      if (currentPrice !== priceToSet) onSetCurrentPrice(priceToSet);
    },
    [asks, bids, currentPrice, onSetCurrentPrice]
  );

  /**
   * @description Change market amount
   *
   * @param {number} index - Market ask/bid index
   * @param {string} side - Market side (asks/bids)
   * @returns {void} Dispatch setCurrentAmount action
   */
  const changeMarketAmount = useCallback(
    (index: number, side: "asks" | "bids") => {
      const arr = side === "asks" ? asks : bids;
      const amountToSet = arr[index] && Number(arr[index][1]);
      onSetCurrentAmount(amountToSet.toString());
    },
    [onSetCurrentAmount, asks, bids]
  );

  // Change market amount on click on total/sum field
  const changeMarketAmountSumClick = useCallback(
    (index: number) => {
      onSetCurrentAmount(cumulativeVolume[index].toString());
    },
    [onSetCurrentAmount, cumulativeVolume]
  );

  /**
   * @description Get max volume based on bids and asks
   *
   * @returns {number} max volume value
   */
  const maxVolume = calcMaxVolume(bids, asks);

  const valumeData = mapValues(maxVolume, cumulativeVolume);
  useEffect(() => {
    // Make sure the scroll is always down
    if (isSell && !!contentRef?.current)
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }, [isSell, contentRef, orders]);

  return {
    quoteUnit: currentMarket?.quoteAsset.ticker,
    baseUnit: currentMarket?.baseAsset.ticker,
    valumeData,
    changeMarketPrice,
    changeMarketAmount,
    changeMarketAmountSumClick,
    priceFixed: currentMarket?.quotePrecision || 0,
    amountFixed: currentMarket?.basePrecision || 0,
    total: cumulativeVolume,
  };
}

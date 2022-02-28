import { useDispatch } from "react-redux";
import { useEffect, useState, useCallback, useMemo } from "react";

import { getSymbolFromId } from "../helpers";

import { cleanPositiveFloatInput, precisionRegExp } from "@polkadex/web-helpers";
import {
  selectCurrentMarket,
  selectCurrentPrice,
  selectCurrentMarketTickers,
  setCurrentPrice,
  selectUserBalance,
  selectBestAskPrice,
  selectBestBidPrice,
  orderExecuteFetch,
  selectOrderExecuteLoading,
  selectHasUser,
  selectOrderExecuteSucess,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

export function usePlaceOrder(isSell: boolean, isLimit: boolean) {
  const dispatch = useDispatch();

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentTicker = useReduxSelector(selectCurrentMarketTickers);
  const currentPrice = useReduxSelector(selectCurrentPrice);
  const balances = useReduxSelector(selectUserBalance);
  const bestAskPrice = useReduxSelector(selectBestAskPrice);
  const bestBidPrice = useReduxSelector(selectBestBidPrice);
  const isOrderLoading = useReduxSelector(selectOrderExecuteLoading);
  const isOrderExecuted = useReduxSelector(selectOrderExecuteSucess);
  const hasUser = useReduxSelector(selectHasUser);

  const [tab, setTab] = useState({
    priceLimit: undefined,
  });

  const [form, setForm] = useState({
    orderType: isLimit ? "Limit" : "Market",
    price: "",
    priceMarket: currentTicker?.last || 0,
    amountSell: "",
    amountBuy: "",
  });
  const [rangeValue, setRangeValue] = useState([1]);

  const [estimatedTotal, setEstimatedTotal] = useState({ buy: 0, sell: 0 });
  const [baseAssetId, quoteAssetId] = currentMarket ? currentMarket?.symbolArray : [-1, -1];
  const nextPriceLimitTruncated = Decimal.format(
    tab.priceLimit,
    currentMarket?.price_precision || 0
  );

  /**
   * @description Get asset balance for the current market
   *
   * @param {string} assetId - The token id
   * @returns {string} balance amount
   */
  const getBalance = (assetid: string) => {
    if (balances.length > 0) {
      const data = balances.find((value) => value.ticker === assetid);
      return data ? data.free : "0";
    }
    return "0";
  };

  const availableBaseAmount = getBalance(baseAssetId?.toString());
  const availableQuoteAmount = getBalance(quoteAssetId?.toString());
  const quoteTicker = getSymbolFromId("quote", currentMarket?.symbolArray);
  const baseTicker = getSymbolFromId("base", currentMarket?.symbolArray);

  /**
   * @description Get estimated total amount
   *
   * @param {number} total - Total amount to calculate
   * @returns {string} balance amount
   */
  const getEstimatedTotal = useCallback(
    (total: number): string =>
      Decimal.format(
        total,
        currentMarket?.amount_precision || 0 + currentMarket?.price_precision || 0,
        ","
      ),
    [currentMarket?.amount_precision, currentMarket?.price_precision]
  );

  /**
   * @description Clean Input
   *
   * @returns {void} Dispatch setCurrentPrice action
   */
  const handleCleanPrice = useCallback((): void => {
    setTab({
      ...tab,
      priceLimit: undefined,
    });
    dispatch(setCurrentPrice(0));
  }, [dispatch, setTab, tab]);

  /**
   * @description Change Price
   *
   * @param {number} price - The price to set
   * @returns {void} Dispatch setCurrentPrice action
   */
  const handlePriceChange = useCallback(
    (price: string): void => {
      const convertedValue = cleanPositiveFloatInput(price?.toString());
      if (convertedValue?.match(precisionRegExp(currentMarket?.amount_precision || 0))) {
        setForm({
          ...form,
          price: convertedValue,
        });
      }
      handleCleanPrice && handleCleanPrice();
    },

    [currentMarket?.amount_precision, form, handleCleanPrice]
  );

  /**
   * @description Change Amount
   *
   * @param {number} amount - The price to set
   * @returns {void} Dispatch setCurrentPrice action
   */
  const handleAmountChange = useCallback(
    (value: string): void => {
      const convertedValue = cleanPositiveFloatInput(value.toString());
      if (convertedValue.match(precisionRegExp(currentMarket?.price_precision || 0))) {
        if (isSell) {
          setForm({
            ...form,
            amountSell: convertedValue,
          });
        } else {
          setForm({
            ...form,
            amountBuy: convertedValue,
          });
        }
      }
      setEstimatedTotal((estimatedTotal) => {
        return {
          ...estimatedTotal,
          [isSell ? "sell" : "buy"]:
            Number(convertedValue) * Number(isSell ? bestBidPrice : bestAskPrice),
        };
      });
    },
    [currentMarket?.price_precision, form, isSell, bestBidPrice, bestAskPrice]
  );

  /**
   * @description Execute Order
   *
   * @param {FormHandelr<T>} e - The onChange event
   * @returns {void} Dispatch setCuorderExecuteFetch action
   */
  // TODO: Type form
  const handleExecuteOrders = (e): void => {
    e.preventDefault();
    dispatch(
      orderExecuteFetch({
        order_type: isLimit ? "Limit" : "Market",
        symbol: currentMarket?.symbolArray,
        side: isSell ? "Sell" : "Buy",
        price: isLimit ? form.price : "",
        market: `${currentMarket?.base_unit}${currentMarket?.quote_unit}`.toLowerCase(),
        amount: isSell ? form.amountSell : form.amountBuy,
      })
    );
  };

  /**
   * @description Verify is the button should be disabled
   *
   * @returns {boolean}
   */
  // TODO: Check validation
  const isDisabled = useMemo((): boolean => {
    const amountInput = isSell ? Number(form.amountSell) : Number(form.amountBuy);

    const amountAvailable = isSell
      ? Number(availableBaseAmount) <= 0
      : Number(availableQuoteAmount) <= 0;

    const amountUnavailable = isSell
      ? Number(availableBaseAmount) >=
        Number(form.amountSell) * Number(!isLimit ? 1 : form.price)
      : Number(availableQuoteAmount) >=
        Number(form.amountBuy) * Number(!isLimit ? 1 : form.price);

    if (!isLimit) {
      return (
        isOrderLoading || !amountInput || amountAvailable || !amountUnavailable || !hasUser
      );
    } else {
      return (
        isOrderLoading ||
        !amountInput ||
        !Number(form.price) ||
        amountAvailable ||
        !amountUnavailable ||
        !hasUser
      );
    }
  }, [
    isOrderLoading,
    form.amountBuy,
    form.amountSell,
    form.price,
    isSell,
    availableBaseAmount,
    availableQuoteAmount,
    isLimit,
    hasUser,
  ]);

  /**
   * @description Memorize the total amount to buy/sell based on the amount and price
   *
   * @returns {string} total amount result
   */
  const total = useMemo(() => {
    return form.amountSell || form.amountBuy
      ? getEstimatedTotal(
          Number(isLimit ? (isSell ? form.amountSell : form.amountBuy) : 1) *
            Number(isLimit ? form.price : Number(estimatedTotal[isSell ? "sell" : "buy"])) || 0
        )
      : "";
  }, [
    isSell,
    isLimit,
    estimatedTotal,
    form.amountBuy,
    form.amountSell,
    form.price,
    getEstimatedTotal,
  ]);

  const updateRange = useCallback((data: {values: Array<number>}) => {
    if(isSell){
      form.amountSell = `${Number(availableBaseAmount) * data.values[0] * 0.01}`;
    }else {
      if(!isLimit){
        form.amountBuy = `${Number(availableQuoteAmount) * data.values[0] * 0.01}`;
      }else{
        form.amountBuy = `${Number(availableBaseAmount) * data.values[0] * 0.01}`;
      }
    }
    setRangeValue(data.values)

  }, [rangeValue, total, isSell, isLimit, form, form.amountBuy, form.amountSell] )

  useEffect(() => {
    // Check if the currentPrice is different from the price in the form
    if (currentPrice !== tab.priceLimit) setTab({ ...tab, priceLimit: currentPrice });
  }, [currentPrice, tab]);

  useEffect(() => {
    // Set estimated total price for the current market
    setEstimatedTotal({
      sell: Number(form.amountSell) * Number(bestBidPrice),
      buy: Number(form.amountBuy) / Number(bestAskPrice),
    });
  }, [bestAskPrice, bestBidPrice, form]);

  useEffect(() => {
    // Change Price if has price, the price is form is different of selected price, and the form type is Limit
    if (
      form.orderType === "Limit" &&
      tab.priceLimit &&
      nextPriceLimitTruncated !== form.price
    ) {
      handlePriceChange(nextPriceLimitTruncated);
    }
  }, [
    tab.priceLimit,
    form.orderType,
    form.price,
    currentMarket?.price_precision,
    nextPriceLimitTruncated,
    handlePriceChange,
  ]);

  return {
    availableAmount: isSell ? availableBaseAmount : availableQuoteAmount,
    changeAmount: handleAmountChange,
    changePrice: handlePriceChange,
    updateRange,
    rangeValue,
    price: form.price,
    amount: isSell ? form.amountSell : form.amountBuy,
    total,
    executeOrder: handleExecuteOrders,
    buttonDisabled: isDisabled,
    isOrderLoading,
    isOrderExecuted,
    quoteTicker,
    baseTicker,
    orderSide: isSell ? "Sell" : "Buy",
    hasUser,
  };
}

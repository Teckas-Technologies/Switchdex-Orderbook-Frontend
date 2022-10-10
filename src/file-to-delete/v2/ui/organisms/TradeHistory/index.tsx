import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  selectCurrentMarket,
  userTradesFetch,
  selectTradesLoading,
} from "@polkadex/orderbook-modules";
import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import { localeDate } from "@polkadex/web-helpers";
import { DEFAULT_MARKET } from "@polkadex/web-constants";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";
import {
  TradeHistoryCard,
  TradeHistoryCardReponsive,
} from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/TradeHistoryCard";

export const TradeHistory = () => {
  const dispatch = useDispatch();

  const list = [];

  const fetching = useReduxSelector(selectTradesLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket) || DEFAULT_MARKET;
  const { width } = useWindowSize();

  useEffect(() => {
    if (currentMarket) dispatch(userTradesFetch());
  }, [currentMarket, dispatch]);

  return (
    <S.Wrapper>
      {width > 1110 && (
        <S.Header>
          <span>Date</span>
          <span>Symbol</span>
          <span>Side</span>
          <span>Price</span>
          <span>Quantity</span>
        </S.Header>
      )}
      {!fetching && (
        <S.Content>
          {list?.length &&
            list.map((trade, idx) => {
              const {
                order_id,
                timestamp,
                price,
                amount,
                order_side,
                fee,
                base_asset,
                quote_asset,
              } = trade;
              const date = localeDate(new Date(Number(timestamp)), "fullDate");
              const symbol = `${getSymbolFromAssetId(base_asset)} / ${getSymbolFromAssetId(
                quote_asset
              )}`;
              const CardComponent =
                width > 1130 ? TradeHistoryCard : TradeHistoryCardReponsive;
              return (
                <CardComponent
                  key={idx}
                  date={date}
                  symbol={symbol}
                  fee={fee.cost}
                  profit="0.00000"
                  side={order_side}
                  price={price}
                  quantity={amount}
                />
              );
            })}
        </S.Content>
      )}
    </S.Wrapper>
  );
};
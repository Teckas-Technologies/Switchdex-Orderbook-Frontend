import * as S from "./styles";

import { EmptyData, Logged } from "@orderbook/v2/ui/molecules";
import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useOrderHistory } from "@polkadex/orderbook/v2/hooks";
import { localeDate } from "@polkadex/web-helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";

export const TradeHistory = () => {
  const { priceFixed, amountFixed, orders, userLoggedIn } = useOrderHistory();
  return (
    <>
      {userLoggedIn ? (
        <>
          {orders.length ? (
            orders.map((order, i) => {
              const date = localeDate(new Date(Number(order.timestamp)), "fullDate");
              const isSell = order.order_side === "Sell";
              const baseUnit = getSymbolFromAssetId(order.base_asset);
              const quoteUnit = getSymbolFromAssetId(order.quote_asset);

              return (
                <S.Card key={i}>
                  <S.CardWrapper>
                    <S.CardBox>
                      <S.CardInfoToken>
                        <Icon name={isSell ? "OrderSell" : "OrderBuy"} size="large" />
                        <S.Tag isSell={isSell}>{order.order_side} </S.Tag>
                      </S.CardInfoToken>
                      <div>
                        <span>
                          {baseUnit}/{quoteUnit}
                        </span>
                        <p>{date}</p>
                      </div>
                    </S.CardBox>
                    <S.CardInfo>
                      <span>{Decimal.format(order.price, priceFixed, ",")}</span>
                      <p>Price</p>
                    </S.CardInfo>
                    <S.CardInfo>
                      <span>{Decimal.format(order.amount, amountFixed, ",")}</span>
                      <p>Quantity</p>
                    </S.CardInfo>
                  </S.CardWrapper>
                </S.Card>
              );
            })
          ) : (
            <EmptyData />
          )}
        </>
      ) : (
        <Logged />
      )}
    </>
  );
};
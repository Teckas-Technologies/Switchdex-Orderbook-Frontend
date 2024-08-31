"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { Tabs } from "@polkadex/ux";
import { Market } from "@orderbook/core/utils/orderbookService/types";
import { tryUnlockTradeAccount } from "@orderbook/core/helpers";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useFunds, useTickers } from "@orderbook/core/hooks";
import { BalanceFormatter } from "@orderbook/format";

import { LimitOrder } from "./Limit";
import { MarketOrder } from "./Market";
import { Unlock } from "./unlock";

type Props = { market?: Market; isBuy?: boolean; isResponsive?: boolean };

export const PlaceOrder = ({ market, isBuy, isResponsive }: Props) => {
  const toHuman = BalanceFormatter.toHuman;
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const { selectedTradingAccount } = useConnectWalletProvider();
  const { getFreeProxyBalance } = useFunds();
  const { currentTicker } = useTickers(market?.id);

  const [availableQuoteAmount, availableBaseAmount] = useMemo(() => {
    const quoteAmount = toHuman(
      Number(getFreeProxyBalance(market?.quoteAsset?.id || "-1")),
      8
    );
    const baseAmount = toHuman(
      Number(getFreeProxyBalance(market?.baseAsset?.id || "-1")),
      8
    );
    return [+quoteAmount, +baseAmount];
  }, [
    getFreeProxyBalance,
    market?.baseAsset?.id,
    market?.quoteAsset?.id,
    toHuman,
  ]);

  useEffect(() => {
    tryUnlockTradeAccount(selectedTradingAccount?.account);
    setIsPasswordProtected(Boolean(selectedTradingAccount?.account?.isLocked));
  }, [selectedTradingAccount]);

  const [tabs, setTabs] = useState({
    limit: true,
    market: false
  })

  return (
    <Tabs defaultValue="limit" className="flex-1 flex h-full">
      <div className="flex items-center justify-between border-b border-primary">
        <Tabs.List className="px-2 py-2.5">
          {/* <Tabs.Trigger value="limit">Limit</Tabs.Trigger>
          <Tabs.Trigger value="market">Market</Tabs.Trigger> */}
          <div className="tabs" onClick={() => setTabs({
            limit: true,
            market: false
          })}>
            <h2 className={`${tabs.limit ? "text-newBase" : "text-secondary"} text-md cursor-pointer font-bold hover:text-newHover active:newPressed`}>Limit</h2>
          </div>
          <div className="tabs" onClick={() => setTabs({
            limit: false,
            market: true
          })}>
            <h2 className={`${tabs.market ? "text-newBase" : "text-secondary"} text-md cursor-pointer font-bold hover:text-newHover active:newPressed`}>Market</h2>
          </div>
          <Tabs.Trigger value="stopLimit" disabled>
            Stop Limit
          </Tabs.Trigger>
        </Tabs.List>
      </div>
      <div className="flex flex-1 h-full overflow-auto scrollbar-hide">
        {isPasswordProtected ? (
          <Unlock
            onAction={() => setIsPasswordProtected(false)}
            tempBrowserAccount={selectedTradingAccount?.account}
          />
        ) : (
          <Fragment>
            <div className="tabcontents flex-1 flex flex-col h-full overflow-hidden">
              {tabs.limit && <div className="tabcontent flex-1 flex flex-col h-full overflow-hidden">
                <LimitOrder
                  market={market}
                  availableBaseAmount={availableBaseAmount}
                  availableQuoteAmount={availableQuoteAmount}
                  isBuy={isBuy}
                  isResponsive={isResponsive}
                />
              </div>}
              {tabs.market && <div className="tabcontent flex-1 flex flex-col h-full overflow-hidden">
                <MarketOrder
                  market={market}
                  ticker={currentTicker}
                  availableBaseAmount={availableBaseAmount}
                  availableQuoteAmount={availableQuoteAmount}
                  isBuy={isBuy}
                  isResponsive={isResponsive}
                />
              </div>}
            </div>
            {/* <Tabs.Content
              value="limit"
              id="placeOrderContent"
              className="flex flex-1 flex-col gap-1 bg-level-0 p-2"
            >
              <LimitOrder
                market={market}
                availableBaseAmount={availableBaseAmount}
                availableQuoteAmount={availableQuoteAmount}
                isBuy={isBuy}
                isResponsive={isResponsive}
              />
            </Tabs.Content>
            <Tabs.Content
              value="market"
              id="placeOrderContent"
              className="flex flex-1 flex-col gap-1 bg-level-0 p-2"
            >
              <MarketOrder
                market={market}
                ticker={currentTicker}
                availableBaseAmount={availableBaseAmount}
                availableQuoteAmount={availableQuoteAmount}
                isBuy={isBuy}
                isResponsive={isResponsive}
              />
            </Tabs.Content> */}
          </Fragment>
        )}
      </div>
    </Tabs>
  );
};

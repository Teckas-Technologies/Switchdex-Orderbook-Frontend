import { Skeleton, Token, Typography, tokenAppearance } from "@polkadex/ux";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Decimal } from "@orderbook/core/utils";
import { hasOnlyZeros, isNegative } from "@orderbook/core/helpers";
import { useMarkets, useTickers } from "@orderbook/core/hooks";
import { Market } from "@orderbook/core/utils/orderbookService";
import { RiArrowDownSLine } from "@remixicon/react";
import classNames from "classnames";
import { useWindowSize } from "react-use";

import { ResponsiveMarket } from "../Trades/Market/responsiveMarket";

import { Card } from "./card";

export const ResponsiveAssetInfo = ({
  currentMarket,
}: {
  currentMarket?: Market;
}) => {
  const [open, setOpen] = useState(false);

  const { currentTicker, tickerLoading } = useTickers(currentMarket?.id);
  const { loading } = useMarkets();

  const { width } = useWindowSize();
  const currentPrice = currentTicker?.close ?? "0.00";

  const changeFormatted = useMemo(
    () =>
      Decimal.format(Number(currentTicker.priceChangePercent24Hr), 2, ",") +
      "%",
    [currentTicker.priceChangePercent24Hr]
  );

  const volumeFormattedQuote = useMemo(
    () =>
      Decimal.format(
        Number(currentTicker?.quoteVolume),
        currentMarket?.quotePrecision ?? 0,
        ","
      ),
    [currentTicker?.quoteVolume, currentMarket?.quotePrecision]
  );

  const volumeFormattedBase = useMemo(
    () =>
      Decimal.format(
        Number(currentTicker?.baseVolume),
        currentMarket?.basePrecision ?? 0,
        ","
      ),
    [currentTicker?.baseVolume, currentMarket?.basePrecision]
  );

  const priceFormatted = useMemo(
    () =>
      hasOnlyZeros(currentPrice.toString())
        ? currentTicker?.currentPrice
        : currentPrice,
    [currentTicker?.currentPrice, currentPrice]
  );

  const negative = useMemo(
    () => isNegative(changeFormatted.toString()),
    [changeFormatted]
  );

  useEffect(() => {
    if (width >= 954 && open) setOpen(false);
  }, [width, open]);

  const baseTicker = currentMarket?.baseAsset?.ticker ?? "MYID";
  const quoteTicker = currentMarket?.quoteAsset?.ticker ?? "USDT";

  return (
    <Fragment>
      <ResponsiveMarket
        market={currentMarket?.id || ""}
        open={open}
        onOpenChange={setOpen}
      />
      <div className="flex gap-2 border-b border-primary p-1">
        <div className="flex flex-1 flex-col gap-3">
          <div
            role="button"
            onClick={() => setOpen(true)}
            className="flex gap-2 p-1 rounded-md duration-200 transition-colors hover:bg-level-1 w-fit"
          >
            <div className="flex items-center justify-center gap-1">
              <div className="holder flex items-center gap-2">
                <img src="https://i.imgur.com/rDCPB2c.png" className="h-8 w-8" alt="" />
                <div className="texts">
                  <span className="text-secondary text-xs">Switchdex</span>
                  <h3>MYID/USDT</h3>
                </div>
              </div>
              {/* <Skeleton
                // loading={!baseTicker} 
                loading={false}
                className="rounded-full h-8 w-8">

                <Token
                  appearance={baseTicker as keyof typeof tokenAppearance}
                  name={baseTicker}
                  size="sm"
                  className="rounded-full border border-primary"
                />
              </Skeleton> */}
              {/* <div
                className={classNames(
                  "flex flex-col",
                  !currentMarket && "gap-1"
                )}
              >
                <Skeleton
                  // loading={!currentMarket}
                  loading={false}
                  className="flex-none h-5 w-16"
                >
                  <Typography.Text size="lg" bold>
                    {baseTicker}
                  </Typography.Text>
                </Skeleton>
                <Skeleton
                  // loading={!currentMarket}
                  loading={false}
                  className=" flex-none h-4 w-10"
                >
                  <Typography.Text size="xs" appearance="primary">
                    /{quoteTicker}
                  </Typography.Text>
                </Skeleton>
              </div> */}
            </div>

            <RiArrowDownSLine className="w-5 h-5 mt-1 text-primary" />
          </div>
          <div
            className={classNames(
              "flex flex-col p-1",
              (tickerLoading || loading) && "gap-1"
            )}
          >
            <Skeleton
              // loading={tickerLoading || loading}
              loading={false}
              className="max-w-20 min-h-4"
            >
              <Typography.Text
                size="xl"
                bold
                appearance={negative ? "danger" : "success"}
              >
                {priceFormatted}
              </Typography.Text>
            </Skeleton>
            <Skeleton
              // loading={tickerLoading || loading}
              loading={false}
              className="max-w-8 min-h-4"
            >
              <Typography.Text
                size="xs"
                appearance={negative ? "danger" : "success"}
              >
                {changeFormatted}
              </Typography.Text>
            </Skeleton>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col p-1">
            <Card.Single
              label="24h High"
              // loading={tickerLoading || loading}
              loading={false}
            >
              {currentTicker?.high}
            </Card.Single>
            <Card.Single
              label="24h Low"
              // loading={tickerLoading || loading}
              loading={false}
            >
              {currentTicker?.low}
            </Card.Single>
          </div>
          <div className="flex flex-col p-1">
            <Card.Single
              label={`24h Volume ${currentMarket?.baseAsset.ticker || "MYID"}`}
              // loading={tickerLoading || loading}
              loading={false}
            >
              {volumeFormattedBase}
            </Card.Single>
            <Card.Single
              label={`24h Volume ${currentMarket?.quoteAsset.ticker || "USDT"}`}
              // loading={tickerLoading || loading}
              loading={false}
            >
              {volumeFormattedQuote}
            </Card.Single>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

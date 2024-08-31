import Link from "next/link";
import { Button, Typography } from "@polkadex/ux";
import Image from "next/image";
import { getMarketUrl } from "@orderbook/core/helpers";
import { RiArrowRightLine } from "@remixicon/react";

import SpeedImage from "../../../public/img/speed_new_2.webp";
import PadLock from "../../../public/img/lock.webp";
import MarketImage from "../../../public/img/boy.webp";
import NonCustodial from "../../../public/img/suite.webp";

export const Features = () => {
  const lastUsedMarketUrl = getMarketUrl();
  return (
    <section className="flex flex-col border-b border-primary max-w-screen-xl mx-auto w-fulll max-xl:px-2">
      <div className="flex flex-wrap items-center justify-around">
        <Typography.Heading type="h4" size="4xl" className="py-6">
          Your Control
        </Typography.Heading>
        <Typography.Heading type="h4" size="4xl" className="py-6">
          Your Assets
        </Typography.Heading>
        <Typography.Heading type="h4" size="4xl" className="py-6">
          Your Platform
        </Typography.Heading>
      </div>
      <div className="flex flex-col">
        <div className="max-md:flex-col flex items-center justify-between max-md:pt-10 md:px-10 border-y border-primary">
          <div className="flex flex-col gap-2 md:max-w-xs md:text-left text-center md:min-w-[250px]">
            <Typography.Heading size="2xl">
              Instantaneous Transactions
            </Typography.Heading>
            <Typography.Paragraph appearance="primary">
              Trade with unmatched speed on our decentralized exchange, benefiting from near-instant transaction times that rival the best centralized platforms.
            </Typography.Paragraph>
          </div>
          <Image
            src={SpeedImage}
            placeholder="blur"
            alt="benefits"
            priority
            draggable={false}
            style={{
              width: "100%",
              height: "auto",
            }}
            className="max-h-[400px] max-w-[550]"
          />
        </div>
        <div className="max-md:flex-col flex">
          <div className="flex flex-col gap-2 text-center items-center justify-between max-md:border-b md:border-r border-primary pt-12 md:px-10 flex-1">
            <div className="flex flex-col gap-2">
              <Typography.Heading size="2xl">
                Blockchain-Backed Security
              </Typography.Heading>
              <Typography.Paragraph appearance="primary">
                Your assets are protected by a robust network, secured through a decentralized consensus across multiple nodes, ensuring your funds are safe at all times.
              </Typography.Paragraph>
            </div>
            <Image
              src={PadLock}
              placeholder="blur"
              alt="padlock"
              style={{
                width: "100%",
                height: "auto",
              }}
              className="max-w-[380px] rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 text-center items-center justify-between max-md:border-b md:border-r border-primary pt-12 md:px-10 flex-1">
            <div className="flex flex-col gap-2">
              <Typography.Heading size="2xl">
                Versatile Trading Options
              </Typography.Heading>
              <Typography.Paragraph appearance="primary">
                Take control of your trades with our flexible order types—set precise limits or execute instantly with market orders, all within a user-friendly interface.
              </Typography.Paragraph>
            </div>
            <Image
              src={MarketImage}
              placeholder="blur"
              alt="padlock"
              style={{
                width: "100%",
                height: "auto",
              }}
              className="max-w-[380px] rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 text-center items-center justify-between pt-12 md:px-10 flex-1">
            <div className="flex flex-col gap-2">
              <Typography.Heading size="2xl">Complete Asset Control</Typography.Heading>
              <Typography.Paragraph appearance="primary">
                Maintain full custody of your assets with our non-custodial platform, giving you the freedom and security to manage your funds without intermediaries.
              </Typography.Paragraph>
            </div>
            <Image
              src={NonCustodial}
              placeholder="blur"
              alt="padlock"
              style={{
                width: "100%",
                height: "auto",
              }}
              className="max-w-[380px] rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="max-md:flex-col flex items-center justify-between gap-6 max-xl:p-2 py-8 border-t border-primary">
        <Typography.Text
          appearance="primary"
          className="whitespace-nowrap"
          size="base"
        >
          Read more about Switchdex Orderbook
          <RiArrowRightLine className="w-4 h-4 ml-3 inline-block max-md:rotate-90" />
        </Typography.Text>
        {/* <Link href={lastUsedMarketUrl}>
          <Button.Solid>Start trading</Button.Solid>
        </Link> */}
        <Button.Solid asChild className="w-fit bg-newBase hover:bg-newHover active:bg-newPressed" size="md">
          <Link href="/trading/MYIDUSDT">Start trading</Link>
        </Button.Solid>
      </div>
    </section>
  );
};

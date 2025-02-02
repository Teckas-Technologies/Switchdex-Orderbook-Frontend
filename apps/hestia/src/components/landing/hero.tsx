import { Button, Typography } from "@polkadex/ux";
import Image from "next/image";
import { useWindowSize } from "usehooks-ts";
import Link from "next/link";
import { getMarketUrl } from "@orderbook/core/helpers";

import OrderbookImage from "../../../public/img/orderbook.webp";

import { Icons } from "@/components/ui";
export const Hero = () => {
  const lastUsedMarketUrl = getMarketUrl();
  const { width } = useWindowSize();
  return (
    <section className="flex flex-col items-center gap-3 max-md:pt-5 md:pt-20 border-b border-primary max-w-screen-2xl mx-auto w-fulll max-2xl:px-2">
      <div className="relative flex flex-col items-center text-center gap-6 max-w-4xl pb-4">
        <div className="flex flex-col items-center gap-7">
          <div className="flex gap-5 flex-wrap">
            <div className="flex items-center gap-2 text-primary">
              <Icons.Checked className="w-3 h-3" />
              <Typography.Text size={width > 800 ? "lg" : "md"}>
                Fast
              </Typography.Text>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Icons.Checked className="w-3 h-3" />
              <Typography.Text size={width > 800 ? "lg" : "md"}>
                Secure
              </Typography.Text>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Icons.Checked className="w-3 h-3" />
              <Typography.Text size={width > 800 ? "lg" : "md"}>
                Easy
              </Typography.Text>
            </div>
          </div>
          <Typography.Heading size={width > 700 ? "3xl" : "3xl"}>
            Trade with Confidence
          </Typography.Heading>
        </div>

        <Button.Solid asChild className="w-fit bg-newBase hover:bg-newHover active:bg-newPressed" size="md">
          {/* <Link href={lastUsedMarketUrl}>Start trading</Link> */}
          <Link href="/trading/MYIDUSDT">Start trading</Link>
        </Button.Solid>
      </div>

      <img src="img/trading_home.png" className="sm:px-32 -mt-10" alt="" />
      {/* <Image
        alt="Orderboo trading platform preview"
        src={OrderbookImage}
        placeholder="blur"
        style={{
          width: "100%",
          height: "auto",
        }}
        className="sm:px-32 -mt-10"
      /> */}
    </section>
  );
};

import "@/styles/globals.scss";
import "@polkadex/ux/dist/index.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import classNames from "classnames";
import { Roboto } from "next/font/google";

import { DynamicProviders } from "@/components/ui/DynamicProviders";
const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Switchdex Orderbook || A fully decentralized exchange platform",
  description: "A fully decentralized exchange platform",
  keywords: [
    "trading",
    "crypto",
    "orderbook",
    "switchdex",
    "decentralized",
    "exchange",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scrollbar-hide">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="img/icon.png" />
        <link rel="icon" href="img/dark_switchdex_logo.jpg" type="image/jpeg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={classNames(
          "flex flex-col min-h-screen overflow-x-hidden",
          font.className
        )}
      >
        <DynamicProviders>{children}</DynamicProviders>
      </body>
    </html>
  );
}

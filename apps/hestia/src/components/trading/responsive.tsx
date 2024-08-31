"use client";

import { Tabs } from "@polkadex/ux";

// import { Graph } from "./Graph";
import { Orderbook } from "./Orderbook";
import { Markets } from "./Trades/Market";
import { RecentTrades } from "./Trades/RecentTrades";
import { useState } from "react";

export function Responsive({ id }: { id: string }) {
  const [tabs, setTabs] = useState({
    chart: false,
    orderbook: false,
    markets: true,
    recenttrades: false
  })
  return (
    <Tabs
      defaultValue="graph"
      className="flex-1 h-full flex min-h-[400px] max-h-[500px] border-b border-primary overflow-hidden"
    >
      <Tabs.List className="px-2 py-2.5 whitespace-nowrap border-b border-primary">
        {/* <Tabs.Trigger value="graph">Chart</Tabs.Trigger>
        <Tabs.Trigger value="orderbook">Orderbook</Tabs.Trigger>
        <Tabs.Trigger value="markets">Markets</Tabs.Trigger>
        <Tabs.Trigger value="recentTrades">Recent trades</Tabs.Trigger> */}
        <div className="tabs" onClick={() => setTabs({
          chart: true,
          orderbook: false,
          markets: false,
          recenttrades: false
        })}>
          <h2 className={`${tabs.chart ? "text-newBase" : "text-secondary"} text-md cursor-pointer font-bold hover:text-newHover active:newPressed`}>Chart</h2>
        </div>
        <div className="tabs" onClick={() => setTabs({
          chart: false,
          orderbook: true,
          markets: false,
          recenttrades: false
        })}>
          <h2 className={`${tabs.orderbook ? "text-newBase" : "text-secondary"} text-md cursor-pointer font-bold hover:text-newHover active:newPressed`}>Orderbook</h2>
        </div>
        <div className="tabs" onClick={() => setTabs({
          chart: false,
          orderbook: false,
          markets: true,
          recenttrades: false
        })}>
          <h2 className={`${tabs.markets ? "text-newBase" : "text-secondary"} text-md cursor-pointer font-bold hover:text-newHover active:newPressed`}>Markets</h2>
        </div>
        <div className="tabs" onClick={() => setTabs({
          chart: false,
          orderbook: false,
          markets: false,
          recenttrades: true
        })}>
          <h2 className={`${tabs.recenttrades ? "text-newBase" : "text-secondary"} text-md cursor-pointer font-bold hover:text-newHover active:newPressed`}>Recent Trades</h2>
        </div>
      </Tabs.List>
      <div className="tabcontents flex-1 flex flex-col h-full overflow-hidden">
        {tabs.chart && <div className="tabcontent flex-1 flex flex-col h-full overflow-hidden">
          <div className="demo w-full h-full flex items-center justify-center py-5">
            <h2>Coming Soon...</h2>
          </div>
        </div>}
        {tabs.orderbook && <div className="tabcontent flex-1 flex flex-col h-full overflow-hidden">
          <Orderbook id={id} />
        </div>}
        {tabs.markets && <div className="tabcontent flex-1 flex flex-col h-full overflow-hidden">
          <Markets market={id} />
        </div>}
        {tabs.recenttrades && <div className="tabcontent flex-1 flex flex-col h-full overflow-hidden">
          <RecentTrades id={id} />
        </div>}
      </div>
      {/* <Tabs.Content value="graph" className="flex-1 flex-col flex h-full">
        <Graph id={id} />
        <div className="demo w-full h-full flex items-center justify-center py-5">
          <h2>Coming Soon...</h2>
        </div>
      </Tabs.Content> */}
      {/* <Tabs.Content
        value="orderbook"
        className="flex-1 flex flex-col h-full overflow-hidden"
      >
        <Orderbook id={id} />
      </Tabs.Content>
      <Tabs.Content value="markets" className="flex-1 flex flex-col h-full">
        <Markets market={id} />
      </Tabs.Content>
      <Tabs.Content
        value="recentTrades"
        className="flex-1 flex-col flex h-full overflow-auto"
      >
        <RecentTrades id={id} />
      </Tabs.Content> */}
    </Tabs>
  );
}

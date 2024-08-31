"use client";

import { Tabs } from "@polkadex/ux";

import { Markets } from "./Market";
import { RecentTrades } from "./RecentTrades";
import { useState } from "react";

export const Trades = ({ id }: { id: string }) => {
  const [tabs, setTabs] = useState({
    markets: true,
    recentTrades: false
  })
  return (
    <Tabs defaultValue="markets" className="flex-initial max-xl:flex-1 h-full">
      <div className="flex-1 flex h-full flex-col">
        <div className="flex border-b border-primary">
          <Tabs.List className="px-2 py-2.5">
            {/* <Tabs.Trigger value="markets">Markets</Tabs.Trigger>
            <Tabs.Trigger value="recentTrades">Recent Trades</Tabs.Trigger> */}
            <div className="tabs" onClick={() => setTabs({
              markets: true,
              recentTrades: false,
            })}>
              <h2 className={`${tabs.markets ? "text-newBase" : "text-secondary"} text-md cursor-pointer font-bold hover:text-newHover active:newPressed`}>Markets</h2>
            </div>
            <div className="tabs" onClick={() => setTabs({
              markets: false,
              recentTrades: true
            })}>
              <h2 className={`${tabs.recentTrades ? "text-newBase" : "text-secondary"} text-md cursor-pointer font-bold hover:text-newHover active:newPressed`}>Recent Trades</h2>
            </div>
          </Tabs.List>
        </div>
        <div className="tabcontents flex-1 flex flex-col h-full overflow-hidden">
          {tabs.markets && <div className="tabcontent flex-1 flex flex-col h-full overflow-hidden">
            <Markets market={id} />
          </div>}
          {tabs.recentTrades && <div className="tabcontent flex-1 flex flex-col h-full overflow-hidden">
            <RecentTrades id={id} />
          </div>}
        </div>
        {/* <Tabs.Content value="markets" className="bg-level-0">
          <Markets market={id} />
        </Tabs.Content>
        <Tabs.Content value="recentTrades" className="bg-level-0">
          <RecentTrades id={id} />
        </Tabs.Content> */}
      </div>
    </Tabs>
  );
};

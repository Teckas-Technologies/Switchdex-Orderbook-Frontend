import { useState } from "react";

import DropdownItem from "../../molecules/DropdownItem";
import MarketOrderAction from "../../molecules/MarketOrderAction";

import * as S from "./styles";

import { Dropdown, TabContent, TabHeader, Tabs } from "@polkadex/orderbook-ui/molecules";

const MarketOrder = () => {
  const [state, setState] = useState("Market Order");
  const handleChange = (select: string) => setState(select);

  return (
    <S.Section>
      <Tabs>
        <S.Header>
          <S.HeaderWrapper>
            <TabHeader>
              <S.HeaderContent>Buy DOT </S.HeaderContent>
            </TabHeader>
            <TabHeader>
              <S.HeaderContent>Sell DOT </S.HeaderContent>
            </TabHeader>
          </S.HeaderWrapper>

          <Dropdown header={state}>
            <>
              <DropdownItem title="Market Order" handleAction={handleChange} />
              <DropdownItem title="Limit Order" handleAction={handleChange} />
              <DropdownItem title="Stop Order" handleAction={handleChange} />
            </>
          </Dropdown>
        </S.Header>
        <TabContent>
          <MarketOrderAction type="Buy" />
        </TabContent>
        <TabContent>
          <MarketOrderAction type="Sell" />
        </TabContent>
      </Tabs>
    </S.Section>
  );
};

export default MarketOrder;

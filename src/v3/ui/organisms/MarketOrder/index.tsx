import { useState } from "react";

import DropdownItem from "../../molecules/DropdownItem";
import MarketOrderAction from "../../molecules/MarketOrderAction";
import { DropdownContent, DropdownHeader } from "../../molecules";

import * as S from "./styles";

import {
  AvailableMessage,
  Dropdown,
  Icon,
  Skeleton,
  TabContent,
  TabHeader,
  Tabs,
} from "@polkadex/orderbook-ui/molecules";

const MarketOrder = () => {
  const [isLimit, setIsLimit] = useState(true);
  const handleChangeType = (value: boolean) => setIsLimit(value);

  return (
    <S.Section>
      <Tabs>
        <S.Header>
          <S.HeaderWrapper>
            <TabHeader>
              <S.ActionItem isActive>
                <Icon name="BuyOrder" size="medium" />
                Buy
              </S.ActionItem>
            </TabHeader>
            <TabHeader>
              <S.ActionItem>
                <Icon name="SellOrder" size="medium" />
                Sell
              </S.ActionItem>
            </TabHeader>
          </S.HeaderWrapper>
          <Dropdown
            header={
              <DropdownHeader>{isLimit ? "Limit Order" : "Market Order"}</DropdownHeader>
            }
            direction="bottom"
            isClickable>
            <DropdownContent>
              <DropdownItem
                title={isLimit ? "Limit Order" : "Market Order"}
                handleAction={() => handleChangeType(true)}
              />
              <AvailableMessage message="Soon">
                <DropdownItem
                  title={!isLimit ? "Limit Order" : "Market Order"}
                  handleAction={() => handleChangeType(false)}
                />
              </AvailableMessage>
            </DropdownContent>
          </Dropdown>
        </S.Header>
        <TabContent>
          <MarketOrderAction isLimit={isLimit} />
        </TabContent>
        <TabContent>
          <MarketOrderAction isSell isLimit={isLimit} />
        </TabContent>
      </Tabs>
    </S.Section>
  );
};
export const MarketSkeleton = () => <Skeleton height="100%" width="100%" minWidth="350px" />;

export default MarketOrder;
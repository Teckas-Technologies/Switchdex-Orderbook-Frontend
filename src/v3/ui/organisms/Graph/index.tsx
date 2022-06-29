import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";
import { subDays } from "date-fns";
import { DateRangePicker, defaultStaticRanges } from "react-date-range";

import OrderBook from "../OrderBook";
import ListItemButton from "../../molecules/ListItemButton";
import { DropdownContent, DropdownHeader } from "../../molecules";
import {
  chartType,
  mainTechnicalIndicatorTypes,
  subTechnicalIndicatorTypes,
} from "../../molecules/OriginalChart/options";
import Checkbox from "../../molecules/Checkbox";

import * as S from "./styles";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

const OriginalChart = dynamic(() => import("../../molecules/OriginalChart"));
const filters = ["1m", "5m", "30min", "1H", "6H", "1D", "1W"];

const Graph = () => {
  const now = useRef(new Date());
  const chart = useRef(null);

  const [state, setState] = useState(chartType[0]);
  const [filter, setFilter] = useState("30min");

  const [mainTechnicalIndicator, setMainTechnicalIndicator] = useState(
    mainTechnicalIndicatorTypes
  );
  const [subTechnicalIndicator, setSubTechnicalIndicator] = useState(
    subTechnicalIndicatorTypes
  );

  const [to, setTo] = useState(now.current);
  const [from, setFrom] = useState(subDays(now.current, 7));

  const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {
    setFrom(startDate);
    setTo(endDate);
  }, []);

  const ranges = useMemo(() => {
    return [
      {
        startDate: from,
        endDate: to,
        key: "selection",
      },
    ];
  }, [from, to]);
  return (
    <S.Wrapper>
      <S.WrapperGraph>
        <S.Header>
          <S.FlexWrapper>
            <S.List>
              <Dropdown
                direction="bottom"
                priority="low"
                header={
                  <Icon
                    name="Settings"
                    stroke="text"
                    size="extraMedium"
                    background="primaryBackgroundOpacity"
                  />
                }>
                <S.Indicator>
                  <S.MainIndicator>
                    <strong>Main Indicator</strong>
                    {mainTechnicalIndicator.map(({ key, name, isActive }) => (
                      <Checkbox
                        key={key}
                        title={name}
                        checked={isActive}
                        action={() => {
                          isActive
                            ? chart.current.removeTechnicalIndicator("candle_pane", key)
                            : chart.current.createTechnicalIndicator(key, false, {
                                id: "candle_pane",
                              });
                          setMainTechnicalIndicator((prevState) => {
                            const newState = prevState.map((item) => {
                              if (item.key === key) {
                                return {
                                  ...item,
                                  isActive: !item.isActive,
                                };
                              }
                              return item;
                            });
                            return newState;
                          });
                        }}
                      />
                    ))}
                  </S.MainIndicator>
                  <S.MainIndicator>
                    <strong>Sub Indicator</strong>
                    {subTechnicalIndicator.map(({ key, name, isActive }) => (
                      <Checkbox
                        key={key}
                        title={name}
                        checked={isActive}
                        action={() => {
                          isActive
                            ? chart.current.removeTechnicalIndicator(key, key)
                            : chart.current.createTechnicalIndicator(key, false, {
                                id: key,
                              });
                          setSubTechnicalIndicator((prevState) => {
                            const newState = prevState.map((item) => {
                              if (item.key === key) {
                                return {
                                  ...item,
                                  isActive: !item.isActive,
                                };
                              }
                              return item;
                            });
                            return newState;
                          });
                        }}
                      />
                    ))}
                  </S.MainIndicator>
                </S.Indicator>
              </Dropdown>
              <ul>
                {filters.map((item) => (
                  <S.Li key={item} isActive={item === filter} onClick={() => setFilter(item)}>
                    {item}
                  </S.Li>
                ))}
              </ul>
              <Dropdown
                direction="bottom"
                priority="low"
                header={
                  <Icon
                    name="Calendar"
                    size="extraMedium"
                    background="primaryBackgroundOpacity"
                    stroke="text"
                  />
                }>
                <DateRangePicker
                  ranges={ranges}
                  onChange={handleSelect}
                  rangeColors={["#E6007A"]}
                  staticRanges={defaultStaticRanges}
                  inputRanges={[]}
                />
              </Dropdown>
            </S.List>
          </S.FlexWrapper>

          <S.FlexWrapper>
            <S.List>
              <ListItemButton title="Original" size="Small" isActive />
              <ListItemButton title="Trading View" size="Small" />
              {/* <ListItemButton title="Deep Market" size="Small" /> */}
              <Dropdown
                header={
                  <DropdownHeader>
                    <FilterIcon icon={state.icon}>{state.name}</FilterIcon>
                  </DropdownHeader>
                }
                direction="bottom"
                isClickable>
                <DropdownContent>
                  {chartType.map((item, i) => (
                    <FilterIcon
                      key={i}
                      icon={item.icon}
                      onClick={() => {
                        chart.current.setStyleOptions({
                          candle: {
                            type: item.key,
                          },
                        });
                        setState(item);
                      }}>
                      {item.name}
                    </FilterIcon>
                  ))}
                </DropdownContent>
              </Dropdown>
              <Icon name="Expand" size="extraMedium" background="primaryBackgroundOpacity" />
            </S.List>
          </S.FlexWrapper>
        </S.Header>
        <S.ChartWrapper>
          <OriginalChart chart={chart} resolution={filter} />
        </S.ChartWrapper>
      </S.WrapperGraph>
      <OrderBook />
    </S.Wrapper>
  );
};

export default Graph;

const FilterIcon = ({ icon, children, ...props }) => {
  const IconComponent = Icons[icon];
  return (
    <S.FilterIcon {...props}>
      <IconComponent />
      <span>{children}</span>
    </S.FilterIcon>
  );
};
import * as S from "./styles";
import Props from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Link = ({ active, icon, text }: Props) => (
  <S.Wrapper active={active} icon={icon}>
    {icon && <Icon name={icon} isActive={active} />}
    <span>{text}</span>
  </S.Wrapper>
);
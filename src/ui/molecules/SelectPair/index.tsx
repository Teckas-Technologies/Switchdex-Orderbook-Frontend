import React from "react";

import * as S from "./styles";

import { Icon, IconToken, Skeleton } from "src/ui";

export const SelectPairHeader = ({ title = "", icon = "Default" }) => {
  return (
    <S.Wrapper>
      <IconToken icon={icon} size="small" />
      {title ? (
        <>
          <span>{title}</span>
          <Icon icon="ArrowBottom" size="xsmall" />
        </>
      ) : (
        <Skeleton width="6rem" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
      )}
    </S.Wrapper>
  );
};

import * as S from "./styles";

export const TradeHistoryCard = ({
  baseUnit,
  quoteUnit,
  data = [] as { value: string }[],
}) => (
  <S.Tr>
    <S.Td>
      <S.Tag>Pair</S.Tag>
      <S.ContainerFlex>
        <span>
          {baseUnit}/{quoteUnit}
        </span>
      </S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Date</S.Tag>
      <S.ContainerFlex>{data[0].value}</S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Price</S.Tag>
      <span>{data[1].value}</span>
    </S.Td>
    <S.Td>
      <S.Tag>Quantity</S.Tag>
      <span>{data[2].value}</span>
    </S.Td>
  </S.Tr>
);
import * as S from "./styles";

export type Props = {
  data: any;
};
const OrderBookOrder = ({ data }: Props) => (
  <S.Tr>
    <S.Td>{data.price}</S.Td>
    <S.Td>
      <S.ContainerFlex>
        <S.Span sell={data.side === "sell"}>
          {data.amount} {data.coin}
        </S.Span>
        <S.Image src="/img/icons/Exchange.svg" />
        <span>
          {data.total} {data.pair}
        </span>
      </S.ContainerFlex>
    </S.Td>
  </S.Tr>
);

export default OrderBookOrder;

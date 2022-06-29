import styled, { css } from "styled-components";

// Order Box

export const WrapperOrder = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    border-radius: 0 3rem 3rem 3rem;
    padding: 2rem;
  `}
`;

export const ContainerWallet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
`;
export const WrapperBalance = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  span:first-child {
    font-size: 1.2rem;
    color: #8ba1be;
  }
`;
export const Span = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;
export const ContainerForm = styled.div``;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`;
export const RangeWrapper = styled.div`
  margin-bottom: 1rem;
`;
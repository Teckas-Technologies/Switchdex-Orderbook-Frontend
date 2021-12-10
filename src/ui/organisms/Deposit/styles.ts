import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  padding: 1.5rem;
  @media screen and (min-width: 460px) {
    padding: 2.5rem;
  }
`;

export const QrCodeContainer = styled.div`
  text-align: center;
  margin-right: 1.5rem;
  width: fit-content;

  p {
    margin-top: 1rem;
    font-weight: 500;
  }
`;

export const QrCode = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: 1rem;
    border-radius: 0.5rem;
    div {
      width: 140px;
      height: 140px;
      svg {
        width: 100%;
      }
    }
  `}
`;
export const Container = styled.div`
  flex: 1;
`;

export const Content = styled.div`
  @media screen and (min-width: 460px) {
    padding-left: 1.6rem;
  }
  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 550;
    margin-bottom: 1rem;
  }
`;

export const Input = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    span {
      opacity: 0.7;
    }
    p {
      font-size: 1.4rem;
      font-weight: 500;
    }
  `}
`;
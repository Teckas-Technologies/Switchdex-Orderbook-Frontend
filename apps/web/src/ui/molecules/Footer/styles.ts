import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${theme.colors.tertiaryBackgroundOpacity};
    padding: 0.4rem 1rem;
    background: ${theme.colors.primaryBackground};
    z-index: 1;
    p {
      font-size: 1.2rem;
    }
  `}
`;

export const Container = styled.div<{ color?: string }>`
  ${({ theme, color }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    span {
      font-size: 1.2rem;
      color: ${color && theme.colors[color]};
    }
    svg {
      width: 1rem;
      fill: ${color && theme.colors[color]};
      stroke: ${color && theme.colors[color]};
    }
  `}
`;
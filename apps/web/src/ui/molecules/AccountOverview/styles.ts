import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    background: ${theme.colors.primaryBackground};
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 1.5rem;
    min-height: 34rem;
    @media screen and (min-width: 400px) {
      min-width: 35rem;
    }
  `}
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  div {
    max-width: 4rem;
    width: 100%;
  }
  span {
    font-size: 1.4rem;
  }
`;
export const Switch = styled.div`
  ${({ theme }) => css`
    margin: 1.5rem;
    border: 2px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 1rem;
  `}
`;
export const SwitchCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 1.5rem;
    &:first-child {
      cursor: pointer;
    }
    &:last-child {
      border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      opacity: 0.5;
    }
  `}
`;

export const DropdownHeader = styled.div`
  ${({ theme }) => css`
    small {
      font-size: 1.3rem;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const DropdownEmpty = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: 2rem;
    border-radius: 0.8rem;
    width: 100%;
    @media screen and (min-width: 400px) {
      min-width: 31.5rem;
    }
    a {
      display: block;
      margin-top: 1.5rem;
      text-align: center;
      padding: 1.5rem;
      background-color: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: 0.7rem;
      transition: background-color 0.3s ease-out;
      &:hover {
        background-color: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
export const SwitchCardContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    span {
      font-size: 1.3rem;
      div {
        display: inline-block;
        max-width: 1rem;
        border-radius: 10rem;
        margin-left: 0.5rem;
        background: ${theme.colors.green};
        padding: 0.2rem;
        svg {
          fill: ${theme.colors.white};
        }
      }
    }
  `}
`;
export const SwitchCardInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.5rem;
    small {
      font-size: 1.3rem;
      color: ${theme.colors.tertiaryText};
    }
    button {
      max-width: 1rem;
      svg {
        stroke: ${theme.colors.tertiaryText};
        fill: ${theme.colors.tertiaryText};
      }
    }
    p {
      word-break: break-all;
    }
  `}
`;

export const SwitchCardArrow = styled.div`
  max-width: 0.8rem;
`;

export const Links = styled.div``;
export const Card = styled.div<{ isHoverable?: boolean }>`
  ${({ isHoverable = true }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    &:last-child {
      margin-bottom: 1rem;
    }
    ${isHoverable &&
    css`
      cursor: pointer;
      transition: opacity 0.3s ease-in-out;
      :hover {
        opacity: 0.6;
      }
    `}
  `}
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CardTitle = styled.div`
  ${({ theme }) => css`
    margin-left: 1rem;
    span {
      font-size: 1.3rem;
      color: ${theme.colors.tertiaryText};
    }
    p {
      opacity: 0.6;
    }
  `}
`;
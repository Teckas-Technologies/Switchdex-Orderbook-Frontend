import styled, { css } from "styled-components";
import { LogoText } from "@polkadex/orderbook-ui/molecules/Logo/styles";
import { Wrapper as Button } from "@polkadex/orderbook-ui/molecules/Button/styles";

export const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 1rem;
  width: 100%;
`;

export const ContainerPair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerInfo = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 5rem;
    border-radius: 0 0 2rem 2rem;
    box-shadow: ${theme.shadows.smooth};
    padding: 1rem 1.5rem;
    @media screen and (max-width: 1268px) {
      grid-column-gap: 4rem;
    }

    @media screen and (max-width: 494px) {
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 0.5rem;
      grid-column-gap: 1rem;
    }
  `}
`;
export const WrapperInfo = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem;
  justify-content: space-between;
  @media screen and (max-width: 780px) {
    flex-direction: column;
    margin-top: 1rem;
  }
`;

export const Box = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 1rem;
    ${Button} {
      transition: background 0.5s ease-in-out;
      background: ${theme.colors.primary};
      &:hover {
        background: ${theme.colors.primary}D8;
      }
    }
    @media screen and (max-width: 1100px) {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      z-index: 32;
      background: ${theme.colors.primaryBackground};
      box-shadow: ${theme.shadows.tertiary};
    }
  `}
`;
export const Logo = styled.div`
  ${() => css`
    visibility: hidden;
    @media screen and (max-width: 590px) {
      visibility: visible;
      ${LogoText} {
        display: block;
        opacity: 1;
      }
    }
  `}
`;

export const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-self: flex-end;
`;

export const VolumeHigh = styled.div`
  align-items: center;
  ${({ theme }) => css`
    p {
      color: ${theme.colors.green};
    }
  `}
`;

export const VolumeLow = styled.div<{ isNegative?: boolean }>`
  align-items: baseline;
  ${({ theme }) => css`
    p {
      color: ${theme.colors.primary};
    }
  `}
`;
export const WrapperVolume = styled.div`
  display: flex;
`;

export const ContainerVolume = styled.div`
  ${({ theme }) => css`
    span {
      display: block;
      margin-right: 1rem;
      font-size: 1.1rem;
      color: #8ba1be;
      opacity: 0.7;
      font-weight: 500;
      white-space: nowrap;
    }
    div {
      display: grid;
      grid-template-columns: 1fr auto;
      justify-content: flex-end;
    }
    p {
      font-weight: 500;
      font-size: ${theme.font.sizes.medium};
    }
  `}
`;

// Dropdown
export const WrapperDropdownContent = styled.a`
  padding: 0.5rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  &:hover {
    opacity: 0.7;
  }
`;

export const DropdownTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
`;

export const DropdownDescription = styled.p`
  font-size: 1.2rem;
  opacity: 0.6;
`;
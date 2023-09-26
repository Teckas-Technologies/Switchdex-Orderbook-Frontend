import Link from "next/link";
import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.darkBackground};
    display: flex;
    max-width: 130rem;
    min-height: 100vh;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    flex-direction: column;
    margin: 0 auto;
    border-left: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Button = styled(Link)`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    padding: 1.3rem;
    border-radius: 0.5rem;
    transition: background-color 0.4s ease-in;
    &:hover {
      background: ${theme.colors.primaryHover};
    }
  `}
`;

export const Hero = styled.section`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    background-image: url("/img/heroBg.png");
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;
    padding: 1rem 3rem;
    @media screen and (max-width: 900px) {
      background-size: 50%;
    }
    @media screen and (min-width: 600px) {
      padding: 8rem;
    }
    a {
      width: fit-content;
    }
  `}
`;

export const HeroAside = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 60rem;

    h1 {
      font-size: 5rem;
      font-weight: 500;
    }
    p {
      line-height: 0.8;
      font-size: 4rem;
      margin-bottom: 2rem;
      strong {
        color: ${theme.colors.primary};
      }
      @media screen and (min-width: 600px) {
        font-size: 7rem;
      }
    }
  `}
`;

export const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  span {
    font-size: 1.6rem;
    opacity: 0.5;
    svg {
      width: 1rem;
      display: inline;
      margin-right: 0.5rem;
    }
  }
`;

export const Start = styled.section``;

export const StartHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 600px) {
      padding: 0 5rem;
    }
    span {
      font-size: 5rem;
      @media screen and (min-width: 600px) {
        font-size: 8rem;
        &:nth-child(2) {
          margin-top: 4rem;
        }
        &:nth-child(3) {
          margin-top: 8rem;
        }
      }

      &:nth-child(2) {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

export const StartFooter = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 3rem;
    padding: 3rem 1rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 600px) {
      flex-direction: row;
      align-items: center;
      padding: 3rem 5rem 8rem 5rem;
    }
    &::before {
      position: absolute;
      content: "";
      width: 50%;
      border-bottom: 4px solid ${theme.colors.primary};
      left: 0;
      bottom: 0;
    }
    a {
      flex: 1;
      width: 100%;
      text-align: center;
    }
    span {
      opacity: 0.5;
      svg {
        width: 1rem;
        display: inline;
        margin-left: 1rem;
        vertical-align: middle;
      }
    }
  `}
`;

export const StartContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const StartCard = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 32rem;
    border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    padding: 3rem 1rem;
    @media screen and (min-width: 600px) {
      padding: 8rem 5rem;
    }
    h3 {
      font-size: 2rem;
      font-weight: 500;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    span {
      position: relative;
      width: 4rem;
      height: 4rem;
      border-radius: 100%;
      border: 1px solid ${theme.colors.primary};
      display: flex;
      align-items: center;
      justify-content: center;
      &::before {
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 100%;
        content: "";
        background: ${theme.colors.primary};
      }
    }
    p {
      opacity: 0.7;
      line-height: 1.4;
    }
  `}
`;

export const Features = styled.section``;

export const FeatureShadow = styled.div`
  ${({ theme }) => css`
    position: absolute;
    box-shadow: inset 0px -90px 56px -8px ${theme.colors.darkBackground};
    width: 100%;
    height: 100%;
  `}
`;
export const FeaturesHeaderCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 4rem 1rem;
    @media screen and (min-width: 600px) {
      padding: 4rem 8rem;
    }

    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 5rem;
      p {
        font-size: 3em;
        @media screen and (min-width: 600px) {
          font-size: 4em;
        }
      }
      span {
        line-height: 0.5;
        font-size: 5em;

        @media screen and (min-width: 600px) {
          font-size: 8em;
        }
      }
      &:nth-child(1) span {
        color: ${theme.colors.primary};
      }
      &:nth-child(2) span {
        color: transparent;
        -webkit-text-stroke: 1px ${theme.colors.primary};
      }
      &:nth-child(3) p {
        color: ${theme.colors.primary};
      }
    }
  `}
`;
export const FeaturesHeader = styled.div`
  ${({ theme }) => css`
    position: relative;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const FeaturesContent = styled.section`
  h3 {
    font-size: 2.5rem;
    font-weight: 500;
  }
  p {
    opacity: 0.7;
    line-height: 1.4;
  }
`;

export const FeaturesHighlight = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    &::before {
      position: absolute;
      content: "";
      width: 50%;
      border-bottom: 4px solid ${theme.colors.primary};
      right: 0;
      bottom: 0;
    }
    img {
      max-height: 40rem;
      width: 100%;
      max-width: 60rem;
      object-fit: contain;
    }
    div {
      padding-left: 6rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 3rem;
    }
    @media screen and (min-width: 600px) {
      div {
        padding: 6rem;
        max-width: 40rem;
      }
    }
  `}
`;

export const FeaturesCard = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
    text-align: center;
    min-width: 30rem;
    padding: 3rem 1rem 0 1rem;
    @media screen and (min-width: 600px) {
      padding: 6rem 6rem 0 6rem;
      &:not(:last-child) {
        border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
    }
    @media screen and (max-width: 600px) {
      &:not(:last-child) {
        border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    img {
      width: 100%;
      max-width: 30rem;
      height: 100%;
    }
  `}
`;

export const FeaturesWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const FeaturesFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding: 3rem 1rem;
    flex-direction: column;
    @media screen and (min-width: 600px) {
      padding: 3rem 5rem;
      flex-direction: row;
      align-items: center;
    }
    a {
      &:first-child {
        font-size: 1.6rem;
        color: ${theme.colors.blue};
        transition: opacity ease-in 0.3s;
        &:hover {
          opacity: 0.6;
        }
        svg {
          width: 1rem;
          height: 1rem;
          display: inline;
          margin-left: 0.5rem;
          fill: ${theme.colors.blue};
        }
      }
      &:last-child {
        text-align: center;
      }
    }
  `}
`;

export const Support = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const SupportCard = styled.div`
  ${({ theme }) => css`
    flex: 1;
    min-width: 35rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: space-between;
    padding: 3rem 1rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 600px) {
      padding: 5rem;
      &:first-child {
        border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
    }

    &:first-child a {
      color: ${theme.colors.blue};
      transition: opacity ease 0.5s;
      &:hover {
        opacity: 0.5;
      }
      svg {
        width: 1rem;
        height: 1rem;
        display: inline;
        margin-left: 0.5rem;
        fill: ${theme.colors.blue};
      }
    }
  `}
`;

export const SupportCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 2rem;
    font-weight: 550;
  }
  p {
    opacity: 0.5;
    line-height: 1.4;
  }
`;

export const SupportCardFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    a {
      background: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: 0.5rem;
      padding: 1rem;
      transition: background-color ease 0.4s;
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
      svg {
        display: inline;
        vertical-align: middle;
        &:first-child {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.8rem;
        }
        &:last-child {
          width: 1rem;
          height: 1rem;
          margin-left: 0.5rem;
        }
      }
    }
  `}
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem;
  @media screen and (min-width: 600px) {
    padding: 0 5rem;
  }
  a {
    transition: opacity ease 0.5s;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
`;

export const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 4rem 0;
  span {
    width: 4rem;
    height: 4rem;
  }
  div {
    flex: 1;
    min-width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    strong {
      font-size: 1.5rem;
      font-weight: 550;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
    }
  }
`;

export const FooterBottom = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 3rem 0;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const FooterCopyright = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  div {
    display: flex;
    gap: 1rem;
  }
`;

export const FooterSocial = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  a {
    svg {
      width: 1.6rem;
    }
  }
`;

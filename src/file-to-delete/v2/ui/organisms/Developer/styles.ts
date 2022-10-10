import styled, { css } from "styled-components";

export const Main = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    min-width: 35rem;
    width: 100%;
    border-radius: 1.5rem;
    box-shadow: ${theme.shadows.secondary};
    height: 60vh;
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    z-index: 2;
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem 1rem 2rem;
  h2 {
    font-size: 1.5rem;
    font-weight: 550;
  }
`;
export const Wrapper = styled.div``;

export const Information = styled.ul`
  ${({ theme }) => css`
    list-style: none;
    padding: 0 2rem 1.5rem 2rem;
    li {
      position: relative;
      display: inline-block;
      padding-left: 1.3rem;
      :before {
        position: absolute;
        content: "";
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
      :not(:last-child) {
        margin-right: 0.5rem;
      }
      :nth-child(1) {
        :before {
          background: ${theme.colors.green};
        }
      }
      :nth-child(2) {
        :before {
          background: ${theme.colors.orange};
        }
      }
      :nth-child(3) {
        :before {
          background: ${theme.colors.primary};
        }
      }
    }
  `}
`;

export const Content = styled.div`
  border-radius: 2rem;
  height: 100%;
`;

export const Card = styled.div<{ statusColor?: string }>`
  ${({ theme, statusColor }) => css`
    padding: 2rem;
    border-left: 0.5rem solid ${theme.colors[statusColor]};
    background: ${theme.colors.secondaryBackgroundOpacity};
    box-shadow: ${theme.shadows.quaternary};

    :not(:last-child) {
      margin-bottom: 0.8rem;
    }
  `}
`;
export const CardHeader = styled.div`
  p {
    font-size: 1.1rem;
  }
`;
export const CardHeaderWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    span {
      font-weight: 500;
      display: block;
      margin-right: 0.5rem;
    }
    button {
      font-size: 1.1rem;
      border-radius: 0.3rem;
      padding: 0.2rem 0.4rem;
      background: ${theme.colors.secondaryBackground};
      transition: background 0.2s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      :disabled {
        opacity: 0.5;
      }
    }
  `}
`;
export const CardContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed ${theme.colors.secondaryBackground};
    margin-top: 0.8rem;
    select {
      max-width: 20rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    label,
    input {
      font-weight: 500;
      font-size: 1.2rem;
    }
    option {
      color: ${theme.colors.black};
    }
    input,
    select {
      color: ${theme.colors.text};
    }
    input {
      text-align: end;
      font-weight: 500;
      :disabled {
        cursor: not-allowed;
      }
    }
    :not(:last-child) {
      margin-bottom: 0.5rem;
    }
  `}
`;

export const DeveloperHeader = styled.div`
  cursor: pointer;
  span {
    vertical-align: middle;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;
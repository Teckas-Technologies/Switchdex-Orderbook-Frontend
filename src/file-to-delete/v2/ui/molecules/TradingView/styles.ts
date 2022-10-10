import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: transparent;
    flex: 1;

    /* .group-wWM3zP_M- {
      background-color: red !important;
    }

    #cryptobase_chart {
      background: transparent;
      height: calc(100% - 39px);
    }

    .cr-title-component {
      padding: calc(0.5 * 2);
    }

    .pg-trading-chart--error {
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid white;
      color: red;
      display: flex;
      font-size: 16px;
      justify-content: center;
    }

    @media screen and (max-width: 768px) {
      .pg-trading-chart {
        width: 100%;
      }
    } */
  `}
`;
import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #242633;
  border-radius: 0 3rem 3rem 3rem;
  width: 100%;
  box-shadow: 0px 0px 99px rgba(0, 0, 0, 0.65);
  min-width: 35rem;
  ${media.greaterThan("large")`
    max-width: 35rem;
  `}
`;

export const WrapperTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem 2rem;
`;

export const DropdownContent = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `}
`;
export const ContainerActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0.5rem;
  margin-right: 1rem;
`;
export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

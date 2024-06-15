import styled from "styled-components";
import {
  ITableCommonRowProps,
  ITableHeaderProps,
  ITableProps,
} from "../interfaces/ITable";

export const StyledTable = styled.div<
  Omit<ITableProps, "children" | "columns">
>`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

export const TableData = styled.div``;

export const CommonRow = styled.div<ITableCommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

export const StyledHeader = styled.div`
  display: grid;
  align-items: center;
  transition: none;
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

export const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  text-align: left;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

export const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

export const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

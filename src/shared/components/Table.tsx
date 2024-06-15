import * as S from "../styles/STable";
import {
  ITableHeaderProps,
  ITableContext,
  ITableProps,
  ITableCommonRowProps,
  ITableBodyProps,
} from "../interfaces/ITable";
import { createContext, useContext, useMemo } from "react";

const TableContext = createContext<ITableContext | null>(null);

const useGetTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useGetTableContext must be used within a TableProvider");
  }
  return context;
};

function Table({ columns, children }: ITableProps) {
  const obj = useMemo(() => ({ columns }), [columns]);
  return (
    <TableContext.Provider value={obj}>
      <S.StyledTable role="table" as="table">
        {children}
      </S.StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: Omit<ITableHeaderProps, "columns">) {
  const { columns } = useGetTableContext();
  return (
    <S.StyledHeader role="row" columns={columns} as="header">
      {children}
    </S.StyledHeader>
  );
}
function Row({ children }: Omit<ITableCommonRowProps, "columns">) {
  const { columns } = useGetTableContext();
  return (
    <S.StyledRow role="row" columns={columns}>
      {children}
    </S.StyledRow>
  );
}
function Body<T>({ data, render }: ITableBodyProps<T>) {
  if (!data.length) return <p>No data to show at this moment</p>;

  return <S.StyledBody className="chatgpt">{data.map(render)}</S.StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = S.Footer;

export default Table;

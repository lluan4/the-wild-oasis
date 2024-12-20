import * as S from './Table.styles';
import {
  ITableHeaderProps,
  ITableContext,
  ITableProps,
  ITableCommonRowProps,
  ITableBodyProps,
} from './Table.interfaces';
import { createContext, useContext, useMemo } from 'react';

const TableContext = createContext<ITableContext | null>(null);

const useGetTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useGetTableContext must be used within a TableProvider');
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

function Header({ children }: Omit<ITableHeaderProps, 'columns'>) {
  const { columns } = useGetTableContext();
  return (
    <S.StyledHeader role="row" as="thead">
      <S.CommonRow $columns={columns} as="tr">
        {children}
      </S.CommonRow>
    </S.StyledHeader>
  );
}
function Row({ children }: Omit<ITableCommonRowProps, '$columns'>) {
  const { columns } = useGetTableContext();
  return (
    <tr>
      <S.StyledRow role="row" as="td" $columns={columns}>
        {children}
      </S.StyledRow>
    </tr>
  );
}
function Body<T>({ data, render }: ITableBodyProps<T>) {
  if (!data.length) return <p>No data to show at this moment</p>;

  return <S.StyledBody as="tbody">{data.map(render)}</S.StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = S.Footer;

export default Table;

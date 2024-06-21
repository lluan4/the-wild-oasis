import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface ITableProps extends HTMLAttributes<HTMLTableElement> {
  columns: string;
  children: ReactNode;
}

export interface ITableHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  columns: string;
}

export interface ITableBodyProps<T> extends HTMLAttributes<HTMLDivElement> {
  data: T[] | [];
  render: (item: T) => ReactElement;
}

export interface ITableCommonRowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  $columns: string;
}

export interface ITableContext {
  columns: string;
}

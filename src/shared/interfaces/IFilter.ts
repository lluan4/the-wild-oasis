import { HTMLAttributes } from "react";

export interface IFilterProps extends HTMLAttributes<HTMLInputElement> {
  filterField: string;
  options: { value: string; label: string }[];
}
export interface IFilterButtonProps extends HTMLAttributes<HTMLButtonElement> {
  $active: boolean;
}

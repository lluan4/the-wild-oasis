import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface IFormRowProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  children: ReactElement<IChildWithId>;
}

interface IChildWithId extends ReactElement<ReactNode> {
  id?: string;
}

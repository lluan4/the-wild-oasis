import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface FormRowProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  children: ReactElement<ChildWithId>;
}

interface ChildWithId extends ReactElement<ReactNode> {
  id?: string;
}

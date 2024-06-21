import { FormHTMLAttributes, ReactNode } from "react";

export interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  variation?: string;
}

export interface IStyledFormProps extends FormHTMLAttributes<HTMLFormElement> {
  $variation?: "modal" | "regular" | string;
}

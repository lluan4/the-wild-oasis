import { FormHTMLAttributes, ReactNode } from "react";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  variation?: string;
}

export interface StyledFormProps extends FormHTMLAttributes<HTMLFormElement> {
  $variation?: "modal" | string;
}

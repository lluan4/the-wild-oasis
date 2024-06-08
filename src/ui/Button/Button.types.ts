import { ButtonHTMLAttributes, ReactNode } from "react";
import { sizes, variations } from "./Button.styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  $variation?: keyof typeof variations;
  $sizes?: keyof typeof sizes;
}

export interface StyledButtonProps {
  $variation?: keyof typeof variations;
  $sizes?: keyof typeof sizes;
}

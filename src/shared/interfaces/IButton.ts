import { ButtonHTMLAttributes, ReactNode } from "react";
import { sizes, variations } from "../styles/SButton";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  $variation?: keyof typeof variations;
  $sizes?: keyof typeof sizes;
}

export interface IStyledButtonProps {
  $variation?: keyof typeof variations;
  $sizes?: keyof typeof sizes;
}

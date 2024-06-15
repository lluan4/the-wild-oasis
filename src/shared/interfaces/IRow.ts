import { HTMLAttributes } from "react";

export interface IRowProps extends HTMLAttributes<HTMLDivElement> {
  type?: "vertical" | "horizontal";
}

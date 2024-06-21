import { Dispatch, HTMLAttributes, ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";

export interface IMenusContext {
  open: Dispatch<React.SetStateAction<string>>;
  close: () => void;
  openId: string;
  position: { x: number; y: number };
  setPosition: Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

export interface IMenusProps {
  children: ReactNode;
}

export interface IMenusButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon: ReactElement<IconType>;
}

export interface IMenusToggleProps {
  id: number;
}

export interface IMenusListProps extends HTMLAttributes<HTMLUListElement> {
  id: string;
  children: ReactNode;
}

export interface IMenusStyledListProps
  extends HTMLAttributes<HTMLUListElement> {
  $position: { x: number; y: number };
}

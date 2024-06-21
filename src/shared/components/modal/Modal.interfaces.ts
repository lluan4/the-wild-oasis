import { ReactElement, ReactNode } from "react";

export interface IModalContextProps {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

export interface IModalProps {
  children: ReactNode;
}

export interface IOpenProps {
  children: ReactElement;
  opens: string;
}

export interface WindowProps {
  children: ReactElement;
  name: string;
}

/* export interface IModal {
  children: ReactNode;
  onCloseModal: () => void;
}
 */

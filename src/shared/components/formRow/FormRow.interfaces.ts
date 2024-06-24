import { HTMLAttributes, ReactElement, ReactNode } from 'react';

export interface IFormRowProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  children: ReactElement<IChildWithId>;
  orientation?: 'vertical' | 'horizontal';
}

interface IChildWithId extends ReactElement<ReactNode> {
  id?: string;
}

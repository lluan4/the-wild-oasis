import { HTMLAttributes, ReactNode } from 'react';
import { sizes, variations } from './Button.styles';
import { LinkProps } from 'react-router-dom';

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  as?:
    | ReactNode
    | React.ForwardRefExoticComponent<
        LinkProps & React.RefAttributes<HTMLAnchorElement>
      >;
  $variation?: keyof typeof variations;
  $sizes?: keyof typeof sizes;
}

export interface IStyledButtonProps {
  $variation?: keyof typeof variations;
  $sizes?: keyof typeof sizes;
}

import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

export type IInputProps = InputHTMLAttributes<HTMLInputElement>;
export type ILabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export type ICheckboxProps = {
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  id?: string;
  children?: string | ReactNode;
  inputProps?: IInputProps;
  labelProps?: ILabelProps;
};

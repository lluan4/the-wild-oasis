import { InputHTMLAttributes, LabelHTMLAttributes } from "react";

export type inputProps = InputHTMLAttributes<HTMLInputElement>;
export type labelProps = LabelHTMLAttributes<HTMLLabelElement>;

export type CheckboxProps = {
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  id?: string;
  children?: string;
  inputProps?: inputProps;
  labelProps?: labelProps;
};

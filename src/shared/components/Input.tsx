import { forwardRef } from "react";
import { IInputProps } from "../interfaces/IInput";
import * as S from "../styles/SInput";

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return <S.default ref={ref} {...props} />;
});

export default Input;

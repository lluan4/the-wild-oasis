import { forwardRef } from "react";
import { InputProps } from "./Input.interfaces";
import * as S from "./Input.styles";

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <S.default ref={ref} {...props} />;
});

export default Input;

import { forwardRef } from 'react';
import { IInputProps } from './Input.interfaces';
import * as S from './Input.styles';

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return <S.default ref={ref} {...props} />;
});

export default Input;

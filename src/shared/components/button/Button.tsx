import { IButtonProps } from './Button.interfaces';
import * as S from './Button.styles';

function Button({ children, ...props }: IButtonProps) {
  return <S.Button {...props}>{children}</S.Button>;
}

export default Button;

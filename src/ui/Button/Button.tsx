import * as S from "./Button.styles";
import { ButtonProps } from "./Button.types";

function Button({ children, ...props }: ButtonProps) {
  return <S.Button {...props}>{children}</S.Button>;
}

export default Button;

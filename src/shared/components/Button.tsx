import * as S from "../styles/SButton";
import { IButtonProps } from "../interfaces/IButton";

function Button({ children, ...props }: IButtonProps) {
  return <S.Button {...props}>{children}</S.Button>;
}

export default Button;

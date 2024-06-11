import { IRowProps } from "./Row.interfaces";
import * as S from "./Row.styles";

function Row({ type = "vertical", ...props }: IRowProps) {
  return (
    <S.Row type={type} {...props}>
      {props.children}
    </S.Row>
  );
}

export default Row;

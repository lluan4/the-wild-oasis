import { IRowProps } from "../interfaces/IRow";
import * as S from "../styles/SRow";

function Row({ type = "vertical", ...props }: IRowProps) {
  return (
    <S.Row type={type} {...props}>
      {props.children}
    </S.Row>
  );
}

export default Row;

import { IHeadingProps } from "../interfaces/IHeading";
import * as S from "../styles/SHeading";

function Heading({ children, ...props }: IHeadingProps) {
  return <S.Heading {...props}>{children}</S.Heading>;
}

export default Heading;

import { HeadingProps } from "./Heading.interfaces";
import * as S from "./Heading.styles";

function Heading({ children, ...props }: HeadingProps) {
  return <S.Heading>{children}</S.Heading>;
}

export default Heading;

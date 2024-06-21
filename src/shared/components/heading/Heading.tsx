import { IHeadingProps } from './Heading.interfaces';
import * as S from './Heading.styles';

function Heading({ children, ...props }: IHeadingProps) {
  return <S.Heading {...props}>{children}</S.Heading>;
}

export default Heading;

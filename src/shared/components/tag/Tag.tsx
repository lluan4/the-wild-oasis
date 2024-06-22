import { ReactNode } from 'react';
import * as S from './Tag.styles';

function Tag({ children, type }: { children: ReactNode; type: string }) {
  return <S.default type={type}>{children}</S.default>;
}

export default Tag;

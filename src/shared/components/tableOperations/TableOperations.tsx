import { ITableOperationsProps } from './TableOperations.interfaces';
import * as S from './TableOperations.styles';

function TableOperations({ children }: ITableOperationsProps) {
  return <S.TableOperations>{children}</S.TableOperations>;
}

export default TableOperations;

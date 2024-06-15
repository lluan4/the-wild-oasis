import { ITableOperationsProps } from "../interfaces/ITableOperations";
import * as S from "../styles/STableOperations";

function TableOperations({ children }: ITableOperationsProps) {
  return <S.TableOperations>{children}</S.TableOperations>;
}

export default TableOperations;

import * as S from './DataItem.styles';
import { IDataItemProps } from './DataItem.interfaces';

function DataItem({ icon, label, children }: IDataItemProps) {
  return (
    <S.DataItem>
      <S.Label>
        {icon}
        <span>{label}</span>
      </S.Label>
      {children}
    </S.DataItem>
  );
}

export default DataItem;

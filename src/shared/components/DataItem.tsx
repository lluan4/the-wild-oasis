import * as S from "../styles/SDataItem";
import { IDataItemProps } from "../interfaces/IDataItem";

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

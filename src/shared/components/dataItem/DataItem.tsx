import * as S from "./DataItem.styles";
import { DataItemProps } from "./DataItem.types";

function DataItem({ icon, label, children }: DataItemProps) {
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

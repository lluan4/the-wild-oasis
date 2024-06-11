import { FormRowProps } from "./FormRow.interface";
import * as S from "./FormRow.styles";

function FormRow({ error, label, children }: FormRowProps) {
  return (
    <S.FormRow>
      {label && <S.Label htmlFor={children.props.id}>{label}</S.Label>}
      {children}
      {error && <S.Error>{error}</S.Error>}
    </S.FormRow>
  );
}

export default FormRow;

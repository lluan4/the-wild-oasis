import { IFormRowProps } from './FormRow.interfaces';
import * as S from './FormRow.styles';

function FormRow({
  error,
  label,
  children,
  orientation = 'horizontal',
}: IFormRowProps) {
  return (
    <S.FormRow orientation={orientation}>
      {label && <S.Label htmlFor={children.props.id}>{label}</S.Label>}
      {children}
      {error && <S.Error>{error}</S.Error>}
    </S.FormRow>
  );
}

export default FormRow;

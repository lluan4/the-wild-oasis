import * as S from './Select.styles';
import * as I from './Select.interfaces';

function Select({ options, value, $type, onChange }: I.SelectProps) {
  return (
    <S.StyledSelect $type={$type} value={value} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </S.StyledSelect>
  );
}

export default Select;

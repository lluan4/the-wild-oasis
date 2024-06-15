import * as S from "../styles/SCheckbox";
import { ICheckboxProps } from "../interfaces/ICheckbox";

function Checkbox({
  checked,
  onChange,
  disabled = false,
  id,
  children,
  labelProps,
  inputProps,
}: ICheckboxProps) {
  return (
    <S.Checkbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...inputProps}
      />
      <label {...labelProps} htmlFor={!disabled ? id : ""}>
        {children}
      </label>
    </S.Checkbox>
  );
}

export default Checkbox;

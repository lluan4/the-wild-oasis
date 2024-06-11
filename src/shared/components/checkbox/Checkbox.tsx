import * as S from "./Checkbox.styles";
import { CheckboxProps } from "./Checkbox.interfaces";

function Checkbox({
  checked,
  onChange,
  disabled = false,
  id,
  children,
  labelProps,
  inputProps,
}: CheckboxProps) {
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

import { FormProps } from "./Form.interface";
import * as S from "./Form.styles";

function Form({ children, variation, ...props }: FormProps) {
  return (
    <S.Form $variation={variation} {...props}>
      {children}
    </S.Form>
  );
}

export default Form;

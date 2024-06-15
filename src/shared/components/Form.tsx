import { IFormProps } from "../interfaces/IForm";
import * as S from "../styles/SForm";

function Form({ children, variation = "regular", ...props }: IFormProps) {
  return (
    <S.Form $variation={variation} {...props}>
      {children}
    </S.Form>
  );
}

export default Form;

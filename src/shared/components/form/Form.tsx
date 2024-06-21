import { IFormProps } from './Form.interfaces';
import * as S from './Form.styles';

function Form({ children, variation = 'regular', ...props }: IFormProps) {
  return (
    <S.Form $variation={variation} {...props}>
      {children}
    </S.Form>
  );
}

export default Form;

import { forwardRef } from 'react';
import { TextareaProps } from './TextArea.interfaces';
import * as S from './Textarea.styles';
const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return <S.Textarea ref={ref} {...props}></S.Textarea>;
  }
);

export default TextArea;

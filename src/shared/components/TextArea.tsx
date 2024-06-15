import { forwardRef } from "react";
import { TextareaProps } from "../interfaces/ITextarea";
import * as S from "../styles/STextarea";
const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return <S.Textarea ref={ref} {...props}></S.Textarea>;
  }
);

export default TextArea;

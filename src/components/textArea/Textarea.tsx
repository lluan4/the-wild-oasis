import * as S from "./Textarea.styles";
import { TextareaProps } from "./Textarea.interfaces";
import { forwardRef } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return <S.Textarea ref={ref} {...props}></S.Textarea>;
  }
);

export default Textarea;

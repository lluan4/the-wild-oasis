import * as S from "./FileInput.styles";
import { FileInputProps } from "./FileInput.interfaces";
import { forwardRef } from "react";

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props: FileInputProps, ref) => {
    return <S.FileInput ref={ref} type="file" {...props}></S.FileInput>;
  }
);

export default FileInput;

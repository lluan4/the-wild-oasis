import * as S from "../styles/SFileInput";
import { IFileInputProps } from "../interfaces/IFileInput";
import { forwardRef } from "react";

const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
  (props: IFileInputProps, ref) => {
    return <S.FileInput ref={ref} type="file" {...props}></S.FileInput>;
  }
);

export default FileInput;

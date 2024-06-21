import * as S from './FileInput.styles';
import { IFileInputProps } from './FileInput.interfaces';
import { forwardRef } from 'react';

const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
  (props: IFileInputProps, ref) => {
    return <S.FileInput ref={ref} type="file" {...props}></S.FileInput>;
  }
);

export default FileInput;

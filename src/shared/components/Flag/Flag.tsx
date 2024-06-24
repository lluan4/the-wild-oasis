import * as S from './Flag.styles';

function Flag({ src, alt }: { src: string; alt: string }) {
  return <S.Flag src={src} alt={alt} />;
}

export default Flag;

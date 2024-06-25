import * as S from '../../styles/Stat.styles';

function Stat({
  icon,
  title,
  value,
  color,
}: {
  icon: JSX.Element;
  title: string;
  value: any;
  color: string;
}) {
  return (
    <S.StyledStat>
      <S.Icon color={color}>{icon}</S.Icon>
      <S.Title>{title}</S.Title>
      <S.Value>{value}</S.Value>
    </S.StyledStat>
  );
}

export default Stat;

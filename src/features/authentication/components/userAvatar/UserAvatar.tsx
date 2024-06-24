import useAuth from '../../hooks/useAuth';
import * as S from '../../styles/UserAvatar.styles';

function UserAvatar() {
  const { useUser } = useAuth();
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  const { fullName, avatar } = user.user_metadata;

  return (
    <S.StyledUserAvatar>
      <S.Avatar
        src={avatar || 'img/default-user.jpg'}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </S.StyledUserAvatar>
  );
}

export default UserAvatar;

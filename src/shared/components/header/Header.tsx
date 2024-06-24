import UserAvatar from '../../../features/authentication/components/userAvatar/UserAvatar';
import HeaderMenu from '../headerMenu/headerMenu';
import * as S from './Header.styles';

function Header() {
  return (
    <S.Header>
      <UserAvatar />
      <HeaderMenu />
    </S.Header>
  );
}

export default Header;

import Logo from '../logo/Logo';
import MainNav from '../mainNav/MainNav';
import * as S from './SideBar.styles';

function SideBar() {
  return (
    <S.SideBar>
      <Logo />
      <MainNav />
    </S.SideBar>
  );
}

export default SideBar;

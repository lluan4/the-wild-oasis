import Logo from '../logo/Logo';
import MainNav from '../mainNav/MainNav';
import Uploader from '../uploader/Uploader';
import * as S from './SideBar.styles';

function SideBar() {
  return (
    <S.SideBar>
      <Logo />
      <MainNav />
      <Uploader />
    </S.SideBar>
  );
}

export default SideBar;

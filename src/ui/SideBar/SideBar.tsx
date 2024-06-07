import Logo from "../Logo/Logo";
import MainNav from "../MainNav/MainNav";
import * as S from "./SideBar.styles";

function SideBar() {
  return (
    <S.SideBar>
      <Logo />
      <MainNav />
    </S.SideBar>
  );
}

export default SideBar;

import Logo from "./Logo";
import MainNav from "./MainNav";
import * as S from "../styles/SSideBar";

function SideBar() {
  return (
    <S.SideBar>
      <Logo />
      <MainNav />
    </S.SideBar>
  );
}

export default SideBar;

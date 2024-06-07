import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import * as S from "./AppLayout.styles";

function AppLayout() {
  return (
    <S.AppLayout>
      <Header />
      <SideBar />
      <S.Main>
        <Outlet />
      </S.Main>
    </S.AppLayout>
  );
}

export default AppLayout;

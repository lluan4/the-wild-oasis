import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import * as S from "../styles/SAppLayout";

function AppLayout() {
  return (
    <S.AppLayout>
      <Header />
      <SideBar />
      <S.Main>
        <S.Container>
          <Outlet />
        </S.Container>
      </S.Main>
    </S.AppLayout>
  );
}

export default AppLayout;

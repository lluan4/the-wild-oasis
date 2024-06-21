import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import SideBar from '../sideBar/SideBar';
import * as S from './AppLayout.styles';

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

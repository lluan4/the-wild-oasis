import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';
import * as S from './MainNav.styles';

function MainNav() {
  return (
    <nav>
      <S.NavList>
        <li>
          <S.Link to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </S.Link>
          <S.Link to="/bookings?status=all">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </S.Link>
          <S.Link to="/cabins?discount=all">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </S.Link>
          <S.Link to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </S.Link>
          <S.Link to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </S.Link>
        </li>
      </S.NavList>
    </nav>
  );
}

export default MainNav;

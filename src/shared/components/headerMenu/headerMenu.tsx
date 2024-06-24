import { HiOutlineUser } from 'react-icons/hi';
import Logout from '../../../features/authentication/components/logout/Logout';
import ButtonIcon from '../button/ButtonIcon';
import * as S from './headerMenu.styles';
import { useNavigate } from 'react-router-dom';

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <S.StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </S.StyledHeaderMenu>
  );
}

export default HeaderMenu;

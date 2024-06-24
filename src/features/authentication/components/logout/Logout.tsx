import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { ButtonIcon, SpinnerMini } from '../../../../shared/components';
import useAuth from '../../hooks/useAuth';

function Logout() {
  const { useLogout } = useAuth();
  const { logout, isLoadingLogOut } = useLogout();
  return (
    <ButtonIcon disabled={isLoadingLogOut} onClick={() => logout()}>
      {!isLoadingLogOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;

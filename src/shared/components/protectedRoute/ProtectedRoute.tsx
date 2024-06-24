import styled from 'styled-components';
import useAuth from '../../../features/authentication/hooks/useAuth';
import { Spinner } from '../spinner/Spinner.styles';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  //1. Load the authenticated user
  const { useUser } = useAuth();
  const { isLoadingUser, isAuthenticated } = useUser();

  //3. Se nao existe um usuário autenticado, redirecionar para a página de login
  useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoadingUser, navigate]);

  //2. Mostrar um spinner
  if (isLoadingUser)
    <FullPage>
      <Spinner />
    </FullPage>;

  //4. Se existe um usuário autenticado, renderizar o app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;

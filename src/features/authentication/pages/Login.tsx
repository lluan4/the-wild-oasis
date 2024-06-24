import { Heading, Logo } from '../../../shared/components';
import LoginForm from '../components/loginForm/LoginForm';
import * as S from '../styles/Login.styles';

function Login() {
  return (
    <S.LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </S.LoginLayout>
  );
}

export default Login;

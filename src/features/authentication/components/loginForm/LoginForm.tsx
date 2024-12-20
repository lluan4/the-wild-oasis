import { useState } from 'react';
import {
  Button,
  Form,
  FormRow,
  Input,
  SpinnerMini,
} from '../../../../shared/components';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('luan@example.com');
  const [password, setPassword] = useState('1020304055');
  const { useLogin } = useAuth();
  const { login, isLoadingLogin } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    navigate('/dashboard');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoadingLogin}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoadingLogin}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button $sizes="large" disabled={isLoadingLogin}>
          {!isLoadingLogin ? 'Login' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;

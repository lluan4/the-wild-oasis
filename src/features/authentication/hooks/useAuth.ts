import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Logout,
  Signup,
  UpdateUser,
  getUser,
  Login as loginApi,
} from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function useSignUp() {
    const { mutate: signup, isPending: isSignUpLoading } = useMutation({
      mutationFn: Signup,
      onSuccess: () => {
        toast.success('Account created successfully');
      },
    });
    return { signup, isSignUpLoading };
  }

  function useLogin() {
    const { mutate: login, isPending: isLoadingLogin } = useMutation({
      mutationFn: (credentials: { email: string; password: string }) =>
        loginApi(credentials),
      onSuccess: (user) => {
        queryClient.setQueryData(['user'], user.user);
        navigate('/dashboard', { replace: true });
      },
      onError: () => {
        toast.error('Provided email or password are incorrect');
      },
    });

    return { login, isLoadingLogin };
  }

  function useUser() {
    const { isLoading: isLoadingUser, data } = useQuery({
      queryKey: ['user'],
      queryFn: getUser,
    });
    return {
      isLoadingUser,
      data,
      isAuthenticated: data?.role === 'authenticated',
    };
  }

  function useLogout() {
    const { mutate: logout, isPending: isLoadingLogOut } = useMutation({
      mutationFn: Logout,
      onSuccess: () => {
        queryClient.removeQueries();
        navigate('/login', { replace: true });
      },
      onError: () => {
        toast.error('An error occurred while logging out');
      },
    });
    return { logout, isLoadingLogOut };
  }

  function useUpdateUser() {
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
      mutationFn: UpdateUser,
      onSuccess: ({ user }) => {
        toast.success('User successfully updated');
        queryClient.setQueryData(['user'], user);
        queryClient.invalidateQueries({
          queryKey: ['user'],
        });
      },
      onError: (error) => {
        toast(error.message);
      },
    });
    return { updateUser, isUpdating };
  }
  return { useLogin, useUser, useLogout, useSignUp, useUpdateUser };
}

export default useAuth;

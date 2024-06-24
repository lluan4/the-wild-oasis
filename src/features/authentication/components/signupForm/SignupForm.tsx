// Email regex: /\S+@\S+\.\S+/

import { useForm } from 'react-hook-form';
import { Button, Form, FormRow, Input } from '../../../../shared/components';
import useAuth from '../../hooks/useAuth';

type User = {
  fullName: string;
  email: string;
  password: string;
};

function SignupForm() {
  const { useSignUp } = useAuth();
  const { signup, isSignUpLoading } = useSignUp();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data: any) {
    const obj: User = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    const { fullName, email, password } = obj;

    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message?.toString()}>
        <Input
          type="text"
          id="fullName"
          disabled={isSignUpLoading}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message?.toString()}>
        <Input
          type="email"
          id="email"
          disabled={isSignUpLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message?.toString()}
      >
        <Input
          type="password"
          id="password"
          disabled={isSignUpLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message?.toString()}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSignUpLoading}
          {...register('passwordConfirm', {
            required: 'This fired is required',
            validate: (value) =>
              value === getValues().password || 'Passwords do not match',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            $variation="secondary"
            type="reset"
            disabled={isSignUpLoading}
          >
            Cancel
          </Button>
          <Button disabled={isSignUpLoading}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

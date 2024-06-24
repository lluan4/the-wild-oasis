import { Heading } from '../../../shared/components';
import SignupForm from '../components/signupForm/SignupForm';

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;

import { Heading, Row } from '../../../shared/components';
import UpdatePasswordForm from '../components/updatePasswordForm/UpdatePasswordForm';
import UpdateUserDataForm from '../components/updateUserDataForm/UpdateUserDataForm';

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;

import { useState } from 'react';
import {
  Button,
  FileInput,
  Form,
  FormRow,
  Input,
} from '../../../../shared/components';
import useAuth from '../../hooks/useAuth';

function UpdateUserDataForm() {
  const { useUser, useUpdateUser } = useAuth();

  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point

  const {
    data: {
      //@ts-expect-error  treinamento
      email,
      //@ts-expect-error  treinamento
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          //@ts-expect-error  treinamento
          onChange={(e) => setAvatar(e.target?.files[0])}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            type="reset"
            $variation="secondary"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

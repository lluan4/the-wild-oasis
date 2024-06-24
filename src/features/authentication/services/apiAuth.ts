import supabase, { SUPA_BASE_URL } from '../../../shared/services/supabase';

export async function Signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function Login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function Logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function UpdateUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: any;
}) {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData!);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: avatarError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (avatarError) throw new Error(avatarError.message);

  const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
    data: {
      avatar: `${SUPA_BASE_URL}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}

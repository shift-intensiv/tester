import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { User } from '@/api/instance';
import { useUsersControllerUpdateProfile } from '@/api/instance';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { useStore } from '@/utils/store';

import type { ProfileFormScheme } from '../constants';
import { profileFormScheme } from '../constants';

export const useView = () => {
  const { user } = useStore();

  const usersControllerUpdate = useUsersControllerUpdateProfile();

  const profileForm = useForm<ProfileFormScheme>({
    mode: 'onBlur',
    defaultValues: user,
    resolver: zodResolver(profileFormScheme)
  });

  const onSubmit = profileForm.handleSubmit(async ({ middlename, ...values }) => {
    await usersControllerUpdate.mutateAsync({
      data: { phone: user.phone, profile: values }
    });
  });

  const onLogout = () => {
    if (Math.random() < 0.3) throw new Error('Something went wrong, something of undefined');

    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    useStore.setState({ isLoggedIn: false, user: {} as User });
  };

  return {
    form: profileForm,
    state: { isLoading: profileForm.formState.isSubmitting, phone: user.phone },
    functions: { onSubmit, onLogout }
  };
};

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthViewStore } from '@/modules/auth/store';
import { usePostAuthOptMutation } from '@/utils/api';

import type { PhoneFormScheme } from '../constants/phoneFormScheme';
import { phoneFormScheme } from '../constants/phoneFormScheme';

export const usePhoneForm = () => {
  const authViewStore = useAuthViewStore();

  const phoneForm = useForm<PhoneFormScheme>({
    mode: 'onBlur',
    defaultValues: {
      phone: authViewStore.phone
    },
    resolver: zodResolver(phoneFormScheme)
  });

  const phone = phoneForm.watch('phone');

  React.useEffect(() => {
    if (authViewStore.submittedPhones[phone] > Date.now()) {
      authViewStore.setPhone(phone);
      authViewStore.setStatus('otp');
    }
  }, [phone]);

  const postAuthOptMutation = usePostAuthOptMutation();

  const onSubmit = phoneForm.handleSubmit(async (values) => {
    const postAuthOptMutationResponse = await postAuthOptMutation.mutateAsync({ params: values });

    authViewStore.setPhone(values.phone);
    authViewStore.setSubmittedPhones(
      values.phone,
      Date.now() + postAuthOptMutationResponse.data.retryDelay
    );
    authViewStore.setStatus('otp');
  });

  return {
    form: phoneForm,
    state: { isLoading: phoneForm.formState.isSubmitting },
    functions: { onSubmit }
  };
};

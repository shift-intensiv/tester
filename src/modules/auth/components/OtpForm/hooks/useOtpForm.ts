import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthViewStore } from '@/modules/auth/store';
import { usePostUsersSinginMutation } from '@/utils/api';

import type { OtpFormScheme } from '../constants/otpFormScheme';
import { otpFormScheme } from '../constants/otpFormScheme';

export const useOtpForm = () => {
  const authViewStore = useAuthViewStore();

  const optForm = useForm<OtpFormScheme>({
    mode: 'onBlur',
    resolver: zodResolver(otpFormScheme)
  });

  const postUsersSinginMutation = usePostUsersSinginMutation();

  const onPhoneChange = (phone: string) => {
    authViewStore.setPhone(phone);
    authViewStore.setStatus('phone');
  };

  const onSubmit = optForm.handleSubmit(async (values) => {
    const postUsersSinginMutationResponse = await postUsersSinginMutation.mutateAsync({
      params: { code: +values.otp, phone: authViewStore.phone! }
    });

    if (!postUsersSinginMutationResponse.data.success) {
      console.log('@');
      optForm.setError('otp', { message: postUsersSinginMutationResponse.data.reason });
    }
  });

  return {
    form: optForm,
    state: { isLoading: optForm.formState.isSubmitting, phone: authViewStore.phone },
    functions: { onSubmit, onPhoneChange }
  };
};

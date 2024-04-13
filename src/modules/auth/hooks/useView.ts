import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePostAuthOptMutation, usePostUsersSinginMutation } from '@/utils/api';

import type { OtpFormScheme, PhoneFormScheme } from '../constants';
import { otpFormScheme, phoneFormScheme } from '../constants';

export const useView = () => {
  const [stage, setStage] = React.useState<'phone' | 'otp'>('phone');
  const [submittedPhones, setSubmittedPhones] = React.useState<{
    [key: string]: number;
  }>({});

  const authForm = useForm<OtpFormScheme | PhoneFormScheme>({
    mode: 'onBlur',
    defaultValues: {
      phone: ''
    },
    resolver: zodResolver(stage === 'phone' ? phoneFormScheme : otpFormScheme)
  });

  const phone = authForm.watch('phone');

  React.useEffect(() => {
    if (phone.length < 10 && !submittedPhones[phone]) return setStage('phone');
  }, [phone]);

  React.useEffect(() => {
    if (submittedPhones[phone] > Date.now()) {
      setStage('otp');
    }
  }, [phone]);

  const postAuthOptMutation = usePostAuthOptMutation();
  const postUsersSinginMutation = usePostUsersSinginMutation();

  const onSubmit = authForm.handleSubmit(async (values) => {
    if (stage === 'phone' && 'phone' in values) {
      const postAuthOptMutationResponse = await postAuthOptMutation.mutateAsync({ params: values });

      setSubmittedPhones({
        ...setSubmittedPhones,
        [phone]: Date.now() + postAuthOptMutationResponse.data.retryDelay
      });

      setStage('otp');
      return;
    }

    if (stage === 'otp' && 'otp' in values) {
      const postUsersSinginMutationResponse = await postUsersSinginMutation.mutateAsync({
        params: { code: +values.otp, phone: authForm.getValues('phone') }
      });

      if (!postUsersSinginMutationResponse.data.success) {
        authForm.setError('otp', { message: postUsersSinginMutationResponse.data.reason });
      }
    }
  });

  return {
    form: authForm,
    state: { isLoading: authForm.formState.isSubmitting, stage },
    functions: { onSubmit }
  };
};
